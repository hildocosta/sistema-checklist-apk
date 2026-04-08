import React, { useState, useMemo, useRef } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  FlatList, SafeAreaView, Platform, StatusBar, Alert,
  ScrollView, Animated, Easing
} from "react-native";
import { ChevronRight, Search, CheckCircle2, Check } from 'lucide-react-native';

// Importação dos dados oficiais
import { ACESSORIOSADE } from "../constants/data/acessoriosade";
import { ARMAS } from "../constants/data/armamentos";

interface InventarioItem {
  id: number;
  cat: string;
  desc: string;
  serie: string;
  qtd: number;
  pmpr?: string;
  status: "ok" | "pendente";
  cautela?: string;
  pagLivro?: string;
}

export default function ChecklistRefinado() {
  // Inicializa o estado com a união dos armamentos e acessórios
  const [items, setItems] = useState<InventarioItem[]>(() => [
    ...(ARMAS as InventarioItem[]),
    ...(ACESSORIOSADE as InventarioItem[])
  ]);

  const [abaAtiva, setAbaAtiva] = useState("armamento"); // "armamento" é o cat do seu novo arquivo
  const [filtroTexto, setFiltroTexto] = useState("");
  
  // Estados para animação suave
  const [itemSaindo, setItemSaindo] = useState<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Lógica de Progresso Geral
  const totalGeral = items.length;
  const concluidosGeral = items.filter(i => i.status === "ok").length;
  const progresso = totalGeral > 0 ? Math.round((concluidosGeral / totalGeral) * 100) : 0;

  // Categorias disponíveis no sistema
  const categorias = ["armamento", "munições", "taser", "equip", "rádios", "vtr", "sade", "acess sade"];

  const getContagem = (cat: string) => {
    const total = items.filter(i => i.cat === cat).length;
    const pendentes = items.filter(i => i.cat === cat && i.status === "pendente").length;
    return { total, pendentes };
  };

  // Filtro inteligente (Busca por Descrição, Série ou PMPR)
  const itensFiltrados = useMemo(() => {
    return items.filter(i =>
      i.cat === abaAtiva &&
      i.status === "pendente" &&
      (
        i.desc.toLowerCase().includes(filtroTexto.toLowerCase()) || 
        i.serie.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        (i.pmpr && i.pmpr.toLowerCase().includes(filtroTexto.toLowerCase()))
      )
    );
  }, [items, abaAtiva, filtroTexto]);

  const handleCheck = (id: number) => {
    setItemSaindo(id);

    // Animação de 800ms conforme solicitado para o padrão "Sênior"
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800, 
      easing: Easing.out(Easing.poly(4)),
      useNativeDriver: true,
    }).start(() => {
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: "ok" } : i));
      fadeAnim.setValue(1);
      setItemSaindo(null);
    });
  };

  const updateItem = (id: number, field: keyof InventarioItem, value: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER COM PROGRESSO */}
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

      {/* SELEÇÃO DE CATEGORIAS E BUSCA */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          {categorias.map(cat => {
            const { total, pendentes } = getContagem(cat);
            if (total === 0) return null; // Não mostra categoria vazia
            const ativo = abaAtiva === cat;
            return (
              <TouchableOpacity key={cat} onPress={() => setAbaAtiva(cat)} style={[styles.tab, ativo && styles.tabActive]}>
                <Text style={[styles.tabText, ativo && styles.tabTextActive]}>
                  {cat.toUpperCase()} {pendentes > 0 ? `(${pendentes})` : '✓'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.searchContainer}>
          <Search size={18} color="#94a3b8" style={styles.searchIcon} />
          <TextInput
            placeholder="Buscar por descrição, série ou PMPR..."
            style={styles.searchInput}
            value={filtroTexto}
            onChangeText={setFiltroTexto}
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      {/* LISTAGEM DE ITENS */}
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
                transform: [
                    { scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) },
                    { translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }
                ] 
              }
            ]}>
              <View style={styles.cardMainRow}>
                <View style={styles.cardContent}>
                  <View style={styles.badgeRow}>
                    <View style={styles.qtdBadge}><Text style={styles.qtdText}>{item.qtd} UN</Text></View>
                    {item.pmpr && <Text style={styles.pmprText}>PMPR: {item.pmpr}</Text>}
                    <Text style={styles.serieText}>SN: {item.serie}</Text>
                  </View>
                  <Text style={styles.itemDesc} numberOfLines={3}>{item.desc}</Text>
                </View>

                <TouchableOpacity 
                  disabled={isFinalizando}
                  activeOpacity={0.7}
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
                  style={[styles.miniInput, { width: 80 }]} 
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
            <Text style={styles.emptyText}>Tudo certo nesta categoria!</Text>
          </View>
        }
      />

      {/* BOTÃO FLUTUANTE DE FINALIZAÇÃO */}
      <View style={styles.footerAction}>
         <TouchableOpacity 
          style={[styles.sendButton, progresso < 100 && styles.sendButtonDisabled]}
          onPress={() => Alert.alert("Finalizar", "Deseja enviar o relatório de conferência?")}
         >
            <Text style={styles.sendButtonText}>
              {progresso === 100 ? "FINALIZAR RELATÓRIO" : `PENDENTE (${totalGeral - concluidosGeral})`}
            </Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, backgroundColor: '#fff' 
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#0F172A' },
  headerSubtitle: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  progressCircle: { width: 45, height: 45, borderRadius: 25, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DBEAFE' },
  progressValue: { fontSize: 13, fontWeight: '800', color: '#3B82F6' },
  
  statsRow: { paddingHorizontal: 20, backgroundColor: '#fff', paddingBottom: 15 },
  progressBarBg: { height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, marginBottom: 8 },
  progressBarFill: { height: 6, backgroundColor: '#3B82F6', borderRadius: 3 },
  statsText: { fontSize: 10, fontWeight: '800', color: '#94A3B8', letterSpacing: 0.5 },

  filterSection: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  tabsContainer: { paddingHorizontal: 15, paddingVertical: 12, gap: 10 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' },
  tabActive: { backgroundColor: '#1E293B', borderColor: '#1E293B' },
  tabText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  tabTextActive: { color: '#fff' },

  searchContainer: { flexDirection: 'row', alignItems: 'center', margin: 15, marginTop: 5, backgroundColor: '#F1F5F9', borderRadius: 14, paddingHorizontal: 12 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 48, fontSize: 14, color: '#1E293B' },

  list: { padding: 15, paddingBottom: 140 },
  card: { 
    backgroundColor: '#fff', borderRadius: 24, padding: 16, marginBottom: 15,
    ...Platform.select({ 
        android: { elevation: 4 }, 
        ios: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 } 
    })
  },
  cardMainRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardContent: { flex: 1, paddingRight: 10 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  qtdBadge: { backgroundColor: '#1E293B', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  qtdText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  serieText: { color: '#3B82F6', fontSize: 11, fontWeight: '700' },
  pmprText: { color: '#64748B', fontSize: 11, fontWeight: '700' },
  itemDesc: { fontSize: 15, fontWeight: '700', color: '#1E293B', lineHeight: 20 },
  
  actionButton: { 
    width: 50, height: 50, borderRadius: 18, backgroundColor: '#F1F5F9', 
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' 
  },
  actionButtonSuccess: { backgroundColor: '#10B981', borderColor: '#10B981' },

  cardFooter: { flexDirection: 'row', gap: 10, marginTop: 15, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 15 },
  miniInput: { flex: 1, height: 40, backgroundColor: '#F8FAFC', borderRadius: 10, paddingHorizontal: 12, fontSize: 11, borderWidth: 1, borderColor: '#E2E8F0', color: '#1E293B' },

  footerAction: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'rgba(255,255,255,0.95)' },
  sendButton: { height: 58, borderRadius: 20, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center', elevation: 2 },
  sendButtonDisabled: { backgroundColor: '#CBD5E1', elevation: 0 },
  sendButtonText: { color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 1 },

  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 12, color: '#64748B', fontWeight: '700', fontSize: 16 }
});