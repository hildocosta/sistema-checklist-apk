import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Linking, 
  TextInput, 
  Alert, 
  RefreshControl 
} from 'react-native';
import { FileText, Search, Printer, ChevronRight, Calendar, Sun, Moon } from 'lucide-react-native';
import { styles } from './styles';
import api from "../../service/api";
import HistorySkeleton from "../../components/HistorySkeleton";

interface Relatorio {
  id: string;
  data: string;
  hora: string;
  responsavel: string;
  hash: string;
  pdfUrl: string;
}

export default function RelatoriosScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lista, setLista] = useState<Relatorio[]>([]);
  const [selecionado, setSelecionado] = useState<Relatorio | null>(null);
  const [filtroData, setFiltroData] = useState("");

  const fetchRelatorios = async () => {
    try {
      const response = await api.get("/mobile/conferencia");
      const dados = response.data;

      if (Array.isArray(dados)) {
        setLista(dados);
        if (dados.length > 0) {
          setSelecionado(dados[0]);
        } else {
          setSelecionado(null);
        }
      }
    } catch (error: any) {
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRelatorios();
  }, []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchRelatorios();
  }, []);

  const listaFiltrada = useMemo(() => {
    return lista.filter(item => {
      const coincideData = filtroData === "" || (item.data && item.data.includes(filtroData));
      return coincideData;
    });
  }, [lista, filtroData]);

  const abrirPdf = () => {
    if (selecionado?.pdfUrl) {
      Linking.openURL(selecionado.pdfUrl).catch(() => {
        Alert.alert("Erro", "Não foi possível abrir o PDF.");
      });
    } else {
      Alert.alert("Aviso", "PDF indisponível.");
    }
  };

  const renderItem = ({ item }: { item: Relatorio }) => {
    const isSelected = selecionado?.id === item.id;
    
    let isDiurno = true;
    try {
      const horaH = parseInt(item.hora.split(':')[0]);
      isDiurno = horaH >= 6 && horaH < 18;
    } catch (e) {
      isDiurno = true;
    }

    return (
      <TouchableOpacity 
        style={[styles.card, isSelected && styles.cardActive]}
        onPress={() => setSelecionado(item)}
        activeOpacity={0.7}
      >
        <View style={styles.infoContainer}>
          <View style={[styles.iconBox, isSelected && styles.iconBoxActive]}>
            {isDiurno ? (
              <Sun size={20} color={isSelected ? "#FFF" : "#F59E0B"} />
            ) : (
              <Moon size={20} color={isSelected ? "#FFF" : "#6366F1"} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
               <Text style={styles.dateLabel}>{item.data} • {item.hora}</Text>
               <Text style={{fontSize: 9, marginLeft: 6, color: isDiurno ? '#F59E0B' : '#6366F1', fontWeight: 'bold'}}>
                  {isDiurno ? 'DIURNO' : 'NOTURNO'}
               </Text>
            </View>
            <Text style={styles.nameLabel} numberOfLines={1}>{item.responsavel}</Text>
            <Text style={styles.hashLabel} numberOfLines={1}>HASH: {item.hash?.split('-').pop()}</Text>
          </View>
        </View>
        <ChevronRight size={18} color={isSelected ? "#3B82F6" : "#CBD5E1"} />
      </TouchableOpacity>
    );
  };

  if (isLoading) return <HistorySkeleton />;

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Histórico Geral</Text>
        <Text style={styles.headerSubtitle}>{lista.length} conferências registradas</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Calendar size={20} color="#94A3B8" />
          <TextInput 
            style={styles.dateInput}
            placeholder="Filtrar data (ex: 11/04)"
            placeholderTextColor="#94A3B8"
            value={filtroData}
            onChangeText={setFiltroData}
          />
          <Search size={20} color="#3B82F6" />
        </View>
      </View>

      <FlatList
        data={listaFiltrada}
        renderItem={renderItem}
        keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
             <Text style={{ color: '#94A3B8' }}>Nenhum relatório nesta data.</Text>
          </View>
        }
      />

      <View style={styles.footerAction}>
        <TouchableOpacity 
          style={[styles.btnImprimir, !selecionado && styles.disabledBtn]}
          onPress={abrirPdf}
          disabled={!selecionado}
        >
          <Printer size={18} color="#FFF" />
          <Text style={styles.btnImprimirText}>ABRIR RELATÓRIO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}