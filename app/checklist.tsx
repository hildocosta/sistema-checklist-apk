import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  FlatList, SafeAreaView, Platform, StatusBar, Alert,
  ScrollView, Animated, Easing, LayoutAnimation, UIManager
} from "react-native";
import { ChevronRight, Search, CheckCircle2, Check } from 'lucide-react-native';

// Habilitar LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import { DATABASE_INICIAL, InventarioItem } from "../constants/data";

export default function ChecklistRefinado() {
  const [items, setItems] = useState<InventarioItem[]>(DATABASE_INICIAL);
  const [abaAtiva, setAbaAtiva] = useState("armamento"); 
  const [filtroTexto, setFiltroTexto] = useState("");
  const [itemSaindo, setItemSaindo] = useState<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
      armamento: "ARMAMENTOS", comunicacao: "RÁDIOS", equipamento: "EQUIPAMENTOS",
      municao: "MUNIÇÕES", sade: "SADE (CEL/IMPR)", "acess sade": "ACESSÓRIOS",
      taser: "TASER 10", veiculo: "VIATURAS"
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

  // FUNÇÃO DE CHECK REFINADA
  const handleCheck = (id: number) => {
    setItemSaindo(id);
    
    // Animação de saída suave (Opacity + Scale)
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600, // Tempo aumentado para suavidade
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start(() => {
      // Aplica transição de layout nos itens restantes
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: "ok" } : i));
      fadeAnim.setValue(1);
      setItemSaindo(null);
    });
  };

  const updateItem = (id: number, field: keyof InventarioItem, value: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>CARGA 17º BPM</Text>
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
          <Text style={styles.statsText}>{concluidosGeral} DE {totalGeral} ITENS CONCLUÍDOS</Text>
        </View>
      </SafeAreaView>

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

        <View style={styles.searchContainer}>
          <Search size={18} color="#94a3b8" style={styles.searchIcon} />
          <TextInput
            placeholder="Buscar Descrição, Série ou PMPR..."
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
        renderItem={({ item }) => {
          const isFinalizando = itemSaindo === item.id;
          return (
            <Animated.View style={[
              styles.card, 
              isFinalizando && { 
                opacity: fadeAnim, 
                transform: [{ scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }] 
              }
            ]}>
              <View style={styles.cardMainRow}>
                <View style={styles.cardContent}>
                  <View style={styles.badgeRow}>
                    <View style={styles.qtdBadge}><Text style={styles.qtdText}>{item.qtd} UN</Text></View>
                    {item.pmpr && item.pmpr !== "----" && (
                      <Text style={styles.pmprText}>{item.cat === 'veiculo' ? 'VTR' : 'PMPR'}: {item.pmpr}</Text>
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
                  {isFinalizando ? <Check size={24} color="#fff" /> : <ChevronRight size={24} color="#3b82f6" />}
                </TouchableOpacity>
              </View>

              <View style={styles.cardFooter}>
                <TextInput 
                  placeholder="Cautela/Obs" 
                  style={styles.miniInput} 
                  value={item.cautela} 
                  onChangeText={v => updateItem(item.id, 'cautela', v)}
                />
                <TextInput 
                  placeholder="Livro/Pág" 
                  style={[styles.miniInput, { flex: 0, width: 90 }]} 
                  value={item.pagLivro} 
                  onChangeText={v => updateItem(item.id, 'pagLivro', v)}
                />
              </View>
            </Animated.View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <CheckCircle2 size={48} color="#10b981" />
            <Text style={styles.emptyText}>Tudo pronto nesta categoria!</Text>
          </View>
        }
      />

      <View style={styles.footerAction}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={[styles.sendButton, progresso < 100 && styles.sendButtonDisabled]}
          onPress={() => progresso === 100 && Alert.alert("Sucesso", "Relatório enviado.")}
        >
          <Text style={[styles.sendButtonText, progresso < 100 && styles.sendButtonTextDisabled]}>
            {progresso === 100 ? "FINALIZAR RELATÓRIO" : `PENDENTE (${totalGeral - concluidosGeral})`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },

  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff' 
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#0F172A' },
  headerSubtitle: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  progressCircle: { 
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#EFF6FF', 
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DBEAFE' 
  },
  progressValue: { fontSize: 14, fontWeight: '900', color: '#3B82F6' },
  statsRow: { paddingHorizontal: 20, backgroundColor: '#fff', paddingBottom: 15 },
  progressBarBg: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, marginBottom: 8 },
  progressBarFill: { height: 8, backgroundColor: '#3B82F6', borderRadius: 4 },
  statsText: { fontSize: 10, fontWeight: '800', color: '#94A3B8', letterSpacing: 0.5 },

  filterSection: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  tabsContainer: { paddingHorizontal: 15, paddingVertical: 12, gap: 10 },
  tab: { 
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, 
    backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' 
  },
  tabActive: { backgroundColor: '#1E293B', borderColor: '#1E293B' },
  tabText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  tabTextActive: { color: '#fff' },
  searchContainer: { 
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginBottom: 15, 
    backgroundColor: '#F1F5F9', borderRadius: 14, paddingHorizontal: 12 
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 46, fontSize: 14, color: '#1E293B' },

  // AJUSTE DE VÁCUO: paddingBottom agora é suficiente apenas para o botão, sem buraco exagerado
  list: { 
    padding: 15, 
    paddingBottom: 120 
  },
  card: { 
    backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12,
    elevation: 3, shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8
  },
  cardMainRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardContent: { flex: 1, paddingRight: 10 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 6 },
  qtdBadge: { backgroundColor: '#1E293B', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  qtdText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  pmprText: { color: '#64748B', fontSize: 11, fontWeight: '700' },
  serieText: { color: '#3B82F6', fontSize: 11, fontWeight: '700' },
  itemDesc: { fontSize: 15, fontWeight: '700', color: '#1E293B', lineHeight: 20 },
  actionButton: { 
    width: 48, height: 48, borderRadius: 14, backgroundColor: '#F1F5F9', 
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' 
  },
  actionButtonSuccess: { backgroundColor: '#10B981', borderColor: '#10B981' },
  cardFooter: { 
    flexDirection: 'row', gap: 8, marginTop: 15, borderTopWidth: 1, 
    borderTopColor: '#F1F5F9', paddingTop: 12 
  },
  miniInput: { 
    flex: 1, height: 38, backgroundColor: '#F8FAFC', borderRadius: 8, 
    paddingHorizontal: 10, fontSize: 12, borderWidth: 1, borderColor: '#E2E8F0', color: '#1E293B' 
  },

  footerAction: { 
    position: 'absolute', 
    bottom: 0, left: 0, right: 0, 
    paddingHorizontal: 50,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'android' ? 60 : 40, 
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  sendButton: { 
    height: 42,           
    borderRadius: 10, 
    backgroundColor: '#020617', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  sendButtonDisabled: { backgroundColor: '#E2E8F0' },
  sendButtonText: { 
    color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 0.5 
  },
  sendButtonTextDisabled: { color: '#94A3B8' },

  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 12, color: '#64748B', fontWeight: '700', fontSize: 16 }
});