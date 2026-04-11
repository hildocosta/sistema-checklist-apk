import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, TextInput,
  FlatList, SafeAreaView, StatusBar, Alert,
  ScrollView, Animated, Easing, LayoutAnimation,
  ActivityIndicator
} from "react-native";
import { ChevronRight, Search, PackageCheck, Send } from 'lucide-react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { DATABASE_INICIAL, InventarioItem } from "../../constants/data";
import ChecklistSkeleton from "../../components/ChecklistSkeleton";
import { useAuth } from "../../context/AuthContext"; 
import api from "../../service/api"; 
import { styles } from "./styles";

export default function ChecklistRefinado() {
  const { user } = useAuth(); 
  const navigation = useNavigation();
  
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<InventarioItem[]>(JSON.parse(JSON.stringify(DATABASE_INICIAL)));
  const [abaAtiva, setAbaAtiva] = useState("armamento"); 
  const [filtroTexto, setFiltroTexto] = useState("");
  const [itemSaindo, setItemSaindo] = useState<number | null>(null);
  const [enviando, setEnviando] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const totalGeral = items.length;
  const concluidosGeral = items.filter(i => i.status === "ok").length;
  const progresso = totalGeral > 0 ? Math.round((concluidosGeral / totalGeral) * 100) : 0;

  const categoriasOrd = [
    { id: 'armamento', label: 'ARMAS' },
    { id: 'municao', label: 'MUNIÇÕES' },
    { id: 'taser', label: 'TASER' },
    { id: 'equipamento', label: 'EQUIP' },
    { id: 'comunicacao', label: 'RÁDIOS' },
    { id: 'veiculo', label: 'VIATURAS' },
    { id: 'sade', label: 'SADE' },
    { id: 'acess sade', label: 'ACES SADE' }
  ];

  const getContagem = (catId: string) => {
    const subset = items.filter(i => i.cat === catId);
    return {
      total: subset.length,
      pendentes: subset.filter(i => i.status === "pendente").length
    };
  };

  const getLabel = (catId: string) => {
    const cat = categoriasOrd.find(c => c.id === catId);
    return cat ? cat.label : catId.toUpperCase();
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

  const atualizarCampoItem = (id: number, campo: 'cautela' | 'pagLivro', valor: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [campo]: valor } : i));
  };

  const handleCheck = (id: number) => {
    setItemSaindo(id);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 350,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: "ok" } : i));
      fadeAnim.setValue(1);
      setItemSaindo(null);
    });
  };

  const gerarHTMLParaPDF = (dataFormatada: string, horaFormatada: string, hashUnico: string, qrCodeUrl: string) => {
    const htmlTabelas = categoriasOrd.map(cat => {
      const itensDaCat = items.filter(i => i.cat === cat.id);
      if (itensDaCat.length === 0) return '';

      return `
        <div class="category-block">
          <div class="category-header">
            ${cat.label} (${itensDaCat.length} ITENS)
          </div>
          <table class="main-table">
            <thead>
              <tr>
                <th style="width: 35px;">ORD</th>
                <th style="width: 40px;">QTD</th>
                <th style="text-align: left;">ESPECIFICAÇÃO / SÉRIE</th>
                <th style="width: 100px;">PMPR</th>
                <th style="width: 120px;">OBS / CAUTELA</th>
                <th style="width: 45px;">CONF.</th>
              </tr>
            </thead>
            <tbody>
              ${itensDaCat.map((item, index) => `
                <tr>
                  <td style="text-align: center;">${(index + 1).toString().padStart(2, '0')}</td>
                  <td style="text-align: center;">${item.qtd}</td>
                  <td>
                    <div class="item-desc">${item.desc}</div>
                    <div class="item-sn">S/N: ${item.serie && item.serie !== '----' ? item.serie : '---'}</div>
                  </td>
                  <td style="text-align: center;">${item.pmpr && item.pmpr !== '----' ? item.pmpr : '---'}</td>
                  <td style="text-transform: uppercase;">
                    ${item.cautela ? `<strong>${item.cautela}</strong>` : 'DISPONÍVEL'}
                    ${item.pagLivro ? `<br/><span class="item-sn">LIVRO PÁG: ${item.pagLivro}</span>` : ''}
                  </td>
                  <td class="conf-ok">OK</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }).join('');

    return `
      <html>
        <head>
          <style>
            @page { margin: 35px; size: A4; }
            body { font-family: 'Helvetica', sans-serif; color: #000; line-height: 1.2; padding: 0; margin: 0; }
            .header-container { text-align: center; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 10px; }
            .header-pmpr { font-size: 11px; font-weight: bold; text-transform: uppercase; }
            .doc-title { font-size: 14px; font-weight: bold; margin: 10px 0; text-transform: uppercase; background-color: #eee; padding: 6px; border: 1px solid #000; }
            .info-box { font-size: 10px; border: 1px solid #000; padding: 8px; margin-bottom: 20px; background-color: #fafafa; }
            
            /* Ajuste de Alinhamento das Tabelas */
            .category-block { page-break-inside: avoid; margin-bottom: 20px; }
            .category-header { background-color: #f1f5f9; padding: 6px; border: 1px solid #000; border-bottom: none; font-weight: bold; font-size: 10px; }
            .main-table { width: 100%; border-collapse: collapse; table-layout: fixed; } /* O fixed força o alinhamento */
            .main-table th { background-color: #0f172a; color: #ffffff; border: 1px solid #000; padding: 6px; font-size: 9px; text-transform: uppercase; }
            .main-table td { border: 1px solid #000; padding: 5px; font-size: 8.5px; word-wrap: break-word; vertical-align: middle; }
            
            .item-desc { font-weight: bold; text-transform: uppercase; }
            .item-sn { font-size: 7px; color: #444; margin-top: 2px; }
            .conf-ok { text-align: center; font-weight: bold; color: #059669; }

            .footer-table { width: 100%; margin-top: 40px; border-top: 1px solid #ccc; padding-top: 15px; }
            .signature-side { text-align: center; font-size: 10px; }
            .qrcode-img { width: 80px; height: 80px; }
          </style>
        </head>
        <body>
          <div style="text-align: right; font-size: 8px; margin-bottom: 5px;">Gerado em: ${dataFormatada} às ${horaFormatada.substring(0,5)}</div>
          <div class="header-container">
            <div class="header-pmpr">
              POLÍCIA MILITAR DO PARANÁ<br/>
              6º COMANDO REGIONAL DE POLÍCIA MILITAR<br/>
              17º BATALHÃO DE POLÍCIA MILITAR<br/>
              QUARTA SEÇÃO - ALMOXARIFADO
            </div>
            <div class="doc-title">RELATÓRIO DIÁRIO DE CONFERÊNCIA DE CARGA</div>
          </div>
          <div class="info-box">
            <strong>RESPONSÁVEL:</strong> ${user?.posto || ''} ${user?.name || 'MILITAR'} | 
            <strong>RG:</strong> ${user?.re || '---'} |
            <strong>UNIDADE:</strong> 17º BPM
          </div>
          
          ${htmlTabelas}

          <div style="page-break-inside: avoid;">
            <table class="footer-table">
              <tr>
                <td class="signature-side" style="width: 70%;">
                  <div style="border-top: 1px solid #000; width: 280px; margin: 40px auto 5px auto;"></div>
                  <strong>Assinatura Digital do Responsável</strong><br/>
                  <span style="font-size: 8px; color: #666;">ID: ${hashUnico}</span>
                </td>
                <td style="width: 30%; text-align: right;">
                  <img src="${qrCodeUrl}" class="qrcode-img" /><br/>
                  <span style="font-size: 7px; color: #666;">Autenticidade Garantida</span>
                </td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `;
  };

  const finalizarEEnviar = async () => {
    if (progresso < 100) {
      Alert.alert("Atenção", "Conclua a conferência de todos os itens antes de gerar o relatório.");
      return;
    }

    setEnviando(true);

    try {
      const agora = new Date();
      const dataFormatada = agora.toLocaleDateString('pt-BR');
      const horaFormatada = agora.toLocaleTimeString('pt-BR');
      const hashUnico = `CHECK-${user?.re || '000'}-${Date.now()}`;
      const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${hashUnico}`;

      const htmlContent = gerarHTMLParaPDF(dataFormatada, horaFormatada, hashUnico, qrCodeUrl);
      const { uri, base64 } = await Print.printToFileAsync({ html: htmlContent, base64: true });

      Alert.alert(
        "Relatório Gerado", 
        "Conferência concluída com sucesso. Como deseja proceder?",
        [
          { text: "Visualizar PDF", onPress: () => Sharing.shareAsync(uri) },
          { 
            text: "Enviar para Furrielaria", 
            style: 'default',
            onPress: async () => {
              try {
                const payload = {
                  pdfBase64: `data:application/pdf;base64,${base64}`,
                  fileName: `Checklist_17BPM_${user?.re}_${Date.now()}.pdf`,
                  data: dataFormatada,
                  hora: horaFormatada,
                  hash: hashUnico,
                  responsavel: `${user?.posto || ''} ${user?.name || 'Militar'}`.trim(),
                  itens: items,
                };

                const response = await api.post("/mobile/conferencia", payload);
                
                if (response.status === 201 || response.status === 200) {
                  Alert.alert("Enviado!", "O relatório foi protocolado no sistema do 17º BPM.", [
                    {
                      text: "OK",
                      onPress: () => {
                        setItems(JSON.parse(JSON.stringify(DATABASE_INICIAL)));
                        setAbaAtiva("armamento");
                        setFiltroTexto("");
                        navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'dashboard/dashboard' }], 
                          })
                        );
                      }
                    }
                  ]);
                }
              } catch (err) {
                Alert.alert("Erro de Conexão", "O relatório foi gerado, mas não pôde ser enviado ao servidor. Verifique sua internet.");
              }
            }
          },
          { text: "Cancelar", style: 'cancel' }
        ]
      );

    } catch (error: any) {
      Alert.alert("Erro", "Falha ao processar o arquivo PDF.");
    } finally {
      setEnviando(false);
    }
  };

  if (isLoading) return <ChecklistSkeleton />;

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
            <Text style={styles.statsText}>{concluidosGeral} de {totalGeral} itens</Text>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          {categoriasOrd.map(cat => {
            const { total, pendentes } = getContagem(cat.id);
            if (total === 0) return null;
            const ativo = abaAtiva === cat.id;
            return (
              <TouchableOpacity 
                key={cat.id} 
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setAbaAtiva(cat.id);
                }} 
                style={[styles.tab, ativo && styles.tabActive]}
              >
                <Text style={[styles.tabText, ativo && styles.tabTextActive]}>
                  {cat.label} {pendentes > 0 ? `(${pendentes})` : '✓'}
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
            placeholder="Buscar descrição, PMPR ou série..."
            style={styles.searchInput}
            value={filtroTexto}
            onChangeText={setFiltroTexto}
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      <FlatList
        data={itensFiltrados}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isFinalizando = itemSaindo === item.id;
          return (
            <Animated.View style={[
              styles.card, 
              isFinalizando && { 
                opacity: fadeAnim, 
                transform: [{ scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }] 
              }
            ]}>
              <View style={styles.cardMainRow}>
                <View style={styles.cardContent}>
                  <View style={styles.badgeRow}>
                    <View style={styles.qtdBadge}><Text style={styles.qtdText}>{item.qtd} UN</Text></View>
                    {item.pmpr && item.pmpr !== "----" && (
                      <Text style={styles.pmprText}>{item.cat === 'veiculo' ? 'VTR' : 'PMPR'} {item.pmpr}</Text>
                    )}
                  </View>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                  {item.serie && item.serie !== "----" && (
                    <Text style={styles.serieText}>Série: {item.serie}</Text>
                  )}
                </View>

                <TouchableOpacity 
                  disabled={isFinalizando}
                  style={[styles.actionButton, isFinalizando && styles.actionButtonSuccess]} 
                  onPress={() => handleCheck(item.id)}
                >
                  {isFinalizando ? <ActivityIndicator color="#fff" size="small" /> : <ChevronRight size={26} color="#3B82F6" />}
                </TouchableOpacity>
              </View>

              <View style={styles.cardFooter}>
                <TextInput 
                  placeholder="Cautela / Observação" 
                  style={styles.miniInput} 
                  onChangeText={(text) => atualizarCampoItem(item.id, 'cautela', text)}
                  value={item.cautela} 
                  placeholderTextColor="#cbd5e1"
                />
                <TextInput 
                  placeholder="Pág" 
                  style={[styles.miniInput, { flex: 0, width: 60, textAlign: 'center' }]} 
                  onChangeText={(text) => atualizarCampoItem(item.id, 'pagLivro', text)}
                  value={item.pagLivro} 
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
            <Text style={styles.emptyText}>Categoria {getLabel(abaAtiva)} Conferida!</Text>
          </View>
        }
      />

      <View style={styles.footerAction}>
        <TouchableOpacity 
          activeOpacity={0.8}
          disabled={enviando}
          style={[styles.sendButton, (progresso < 100) && styles.sendButtonDisabled]}
          onPress={finalizarEEnviar}
        >
          {enviando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
               {progresso === 100 && <Send size={20} color="#fff" style={{marginRight: 8}} />}
               <Text style={styles.sendButtonText}>
                {progresso === 100 ? "GERAR E ENVIAR RELATÓRIO" : `PENDENTE: ${totalGeral - concluidosGeral} ITENS`}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}