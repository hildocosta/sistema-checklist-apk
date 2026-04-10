import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator, 
  Linking,
  TextInput 
} from 'react-native';
import { FileText, Search, Printer, ChevronRight, Calendar } from 'lucide-react-native';
import { styles } from './styles';


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
  const [lista, setLista] = useState<Relatorio[]>([]);
  const [selecionado, setSelecionado] = useState<Relatorio | null>(null);
  const [filtro, setFiltro] = useState("");

  
  const fetchRelatorios = async () => {
    setIsLoading(true);
    

    setTimeout(() => {
      const dadosSimulados: Relatorio[] = [
        {
          id: '1',
          data: '10/05/2024',
          hora: '08:30',
          responsavel: 'SGT FURRIEL - 1ª CIA',
          hash: 'BPM17-998877665544332211',
          pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' // PDF de teste
        },
        {
          id: '2',
          data: '09/05/2024',
          hora: '19:15',
          responsavel: 'SGT MARCOS - 2ª CIA',
          hash: 'BPM17-112233445566778899',
          pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }
      ];

      setLista(dadosSimulados);
      setSelecionado(dadosSimulados[0]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchRelatorios();
  }, []);

  const abrirPdf = () => {
    if (selecionado?.pdfUrl) {
      Linking.openURL(selecionado.pdfUrl);
    }
  };

  const renderItem = ({ item }: { item: Relatorio }) => {
    const isSelected = selecionado?.id === item.id;

    return (
      <TouchableOpacity 
        style={[styles.card, isSelected && styles.cardActive]}
        onPress={() => setSelecionado(item)}
        activeOpacity={0.7}
      >
        <View style={styles.infoContainer}>
          <View style={[styles.iconBox, isSelected && styles.iconBoxActive]}>
            <FileText size={20} color={isSelected ? "#FFF" : "#3B82F6"} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.dateLabel}>{item.data} • {item.hora}</Text>
            <Text style={styles.nameLabel} numberOfLines={1}>{item.responsavel.split('-')[0]}</Text>
            <Text style={styles.hashLabel} numberOfLines={1}>ID: {item.hash.substring(0, 16)}</Text>
          </View>
        </View>
        <ChevronRight size={18} color={isSelected ? "#3B82F6" : "#CBD5E1"} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Histórico</Text>
        <Text style={styles.headerSubtitle}>Arquivo de Conferências</Text>
      </View>

     
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Calendar size={20} color="#94A3B8" />
          <TextInput 
            style={styles.dateInput}
            placeholder="Filtrar por data (DD/MM/AAAA)"
            placeholderTextColor="#94A3B8"
            value={filtro}
            onChangeText={setFiltro}
          />
          <Search size={20} color="#3B82F6" />
        </View>
      </View>

      
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <FlatList
          data={lista}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 50, color: '#94A3B8' }}>
              Nenhum relatório encontrado.
            </Text>
          }
        />
      )}

      <View style={styles.footerAction}>
        <TouchableOpacity 
          style={[styles.btnImprimir, !selecionado && styles.disabledBtn]}
          onPress={abrirPdf}
          disabled={!selecionado}
        >
          <Printer size={18} color="#FFF" />
          <Text style={styles.btnImprimirText}>VER DOCUMENTO PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}