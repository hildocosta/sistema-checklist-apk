import React, { useState, useMemo, useRef } from "react";
import {
  View, Text, TouchableOpacity, TextInput,
  FlatList, SafeAreaView, Platform, StatusBar, Alert,
  ScrollView, Animated, Easing, LayoutAnimation
} from "react-native";
import { ChevronRight, Search, CheckCircle2, Check } from 'lucide-react-native';

// Importe de dados e estilos
import { DATABASE_INICIAL, InventarioItem } from "../../constants/data";
import { styles } from "./styles";

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

  const handleCheck = (id: number) => {
    setItemSaindo(id);
    
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start(() => {
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
            placeholder="Buscar Descrição..."
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
                  placeholder="Pág" 
                  style={[styles.miniInput, { flex: 0, width: 70 }]} 
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