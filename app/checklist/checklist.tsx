import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, TextInput,
  FlatList, SafeAreaView, Platform, StatusBar, Alert,
  ScrollView, Animated, Easing, LayoutAnimation
} from "react-native";
import { ChevronRight, Search, Check, PackageCheck } from 'lucide-react-native';


import { DATABASE_INICIAL, InventarioItem } from "../../constants/data";
import ChecklistSkeleton from "../../components/ChecklistSkeleton";
import { styles } from "./styles";

export default function ChecklistRefinado() {
 
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<InventarioItem[]>(DATABASE_INICIAL);
  const [abaAtiva, setAbaAtiva] = useState("armamento"); 
  const [filtroTexto, setFiltroTexto] = useState("");
  const [itemSaindo, setItemSaindo] = useState<number | null>(null);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

 
  const totalGeral = items.length;
  const concluidosGeral = items.filter(i => i.status === "ok").length;
  const progresso = totalGeral > 0 ? Math.round((concluidosGeral / totalGeral) * 100) : 0;

  const categorias = ["armamento", "comunicacao", "equipamento", "municao", "sade", "acess sade", "taser", "veiculo"];

  const getContagem = (cat: string) => {
    const subset = items.filter(i => i.cat === cat);
    return {
      total: subset.length,
      pendentes: subset.filter(i => i.status === "pendente").length
    };
  };

  const getLabel = (cat: string) => {
    const labels: Record<string, string> = {
      armamento: "Armas", comunicacao: "Rádios", equipamento: "Equipamentos",
      municao: "Munições", sade: "SADE", "acess sade": "Acessórios SADE",
      taser: "Taser", veiculo: "Viaturas"
    };
    return labels[cat] || cat.toUpperCase();
  };

  
  const itensFiltrados = useMemo(() => {
    return items.filter(i =>
      i.cat === abaAtiva &&
      i.status === "pendente" &&
      (i.desc.toLowerCase().includes(filtroTexto.toLowerCase()) || 
       i.serie.toLowerCase().includes(filtroTexto.toLowerCase()) ||
       (i.pmpr && i.pmpr.toLowerCase().includes(filtroTexto.toLowerCase())))
    );
  }, [items, abaAtiva, filtroTexto]);

 
  const handleCheck = (id: number) => {
    setItemSaindo(id);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: "ok" } : i));
      fadeAnim.setValue(1);
      setItemSaindo(null);
    });
  };

 
  if (isLoading) {
    return <ChecklistSkeleton />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      
      
      <View style={styles.headerBackground}>
        <SafeAreaView>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Carga 17º BPM</Text>
              <Text style={styles.headerSubtitle}>Conferência de Material</Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressValue}>{progresso}%</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progresso}%` }]} />
            </View>
            <Text style={styles.statsText}>{concluidosGeral} de {totalGeral} itens conferidos</Text>
          </View>
        </SafeAreaView>
      </View>

      
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          {categorias.map(cat => {
            const { total, pendentes } = getContagem(cat);
            if (total === 0) return null;
            const ativo = abaAtiva === cat;
            return (
              <TouchableOpacity 
                key={cat} 
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setAbaAtiva(cat);
                }} 
                style={[styles.tab, ativo && styles.tabActive]}
              >
                <Text style={[styles.tabText, ativo && styles.tabTextActive]}>
                  {getLabel(cat)} {pendentes > 0 ? `(${pendentes})` : '✓'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#94a3b8" style={styles.searchIcon} />
          <TextInput
            placeholder="Buscar por descrição ou série..."
            style={styles.searchInput}
            value={filtroTexto}
            onChangeText={setFiltroTexto}
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      
      <FlatList
        data={itensFiltrados}
        keyExtractor={item => `${item.cat}-${item.id}`}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isFinalizando = itemSaindo === item.id;
          return (
            <Animated.View style={[
              styles.card, 
              isFinalizando && { 
                opacity: fadeAnim, 
                transform: [{ scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] 
              }
            ]}>
              <View style={styles.cardMainRow}>
                <View style={styles.cardContent}>
                  <View style={styles.badgeRow}>
                    <View style={styles.qtdBadge}><Text style={styles.qtdText}>{item.qtd} UN</Text></View>
                    {item.pmpr && item.pmpr !== "----" && (
                      <Text style={styles.pmprText}>{item.cat === 'veiculo' ? 'VTR' : 'PMPR'} {item.pmpr}</Text>
                    )}
                    {item.serie && item.serie !== "----" && (
                      <Text style={styles.serieText}>SN: {item.serie}</Text>
                    )}
                  </View>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>

                <TouchableOpacity 
                  disabled={isFinalizando}
                  style={[styles.actionButton, isFinalizando && styles.actionButtonSuccess]} 
                  onPress={() => handleCheck(item.id)}
                >
                  {isFinalizando ? <Check size={26} color="#fff" /> : <ChevronRight size={26} color="#3B82F6" />}
                </TouchableOpacity>
              </View>

              
              <View style={styles.cardFooter}>
                <TextInput 
                  placeholder="Cautela/Observação" 
                  style={styles.miniInput} 
                  defaultValue={item.cautela} 
                  placeholderTextColor="#cbd5e1"
                />
                <TextInput 
                  placeholder="Pág" 
                  style={[styles.miniInput, { flex: 0, width: 60, textAlign: 'center' }]} 
                  defaultValue={item.pagLivro} 
                  placeholderTextColor="#cbd5e1"
                  keyboardType="numeric"
                />
              </View>
            </Animated.View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <PackageCheck size={60} color="#10b981" />
            <Text style={styles.emptyText}>Conferência concluída para {getLabel(abaAtiva)}!</Text>
          </View>
        }
      />

     
      <View style={styles.footerAction}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={[styles.sendButton, progresso < 100 && styles.sendButtonDisabled]}
          onPress={() => progresso === 100 && Alert.alert("Sucesso", "Checklist do 17º BPM enviado com sucesso.")}
        >
          <Text style={[styles.sendButtonText, progresso < 100 && styles.sendButtonTextDisabled]}>
            {progresso === 100 ? "FINALIZAR E ENVIAR" : `PENDENTE: ${totalGeral - concluidosGeral} ITENS`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}