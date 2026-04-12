import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View, Text, TouchableOpacity, TextInput,
  FlatList, StatusBar, Alert,
  ScrollView, Animated, Easing, LayoutAnimation,
  ActivityIndicator, Modal
} from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Search, PackageCheck, AlertCircle, CloudUpload } from 'lucide-react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { DATABASE_INICIAL, InventarioItem } from "../../constants/data";
import ChecklistSkeleton from "../../components/ChecklistSkeleton";
import { useAuth } from "../../context/AuthContext"; 
import api from "../../service/api"; 
import { styles } from "./styles";

const ProcessingOverlay = ({ visible, message }: { visible: boolean, message: string }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={{
      flex: 1, 
      backgroundColor: 'rgba(2, 6, 23, 0.90)', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <View style={{ alignItems: 'center', padding: 30 }}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ 
          color: '#fff', 
          marginTop: 20, 
          fontSize: 16, 
          fontWeight: '600',
          textAlign: 'center'
        }}>
          {message}
        </Text>
        <Text style={{ color: '#94a3b8', marginTop: 8, fontSize: 12 }}>
          Por favor, não feche o aplicativo.
        </Text>
      </View>
    </View>
  </Modal>
);

export default function ChecklistRefinado() {
  const { user } = useAuth(); 
  const navigation = useNavigation();
  
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<InventarioItem[]>(JSON.parse(JSON.stringify(DATABASE_INICIAL)));
  const [abaAtiva, setAbaAtiva] = useState("armamento"); 
  const [filtroTexto, setFiltroTexto] = useState("");
  const [itemSaindo, setItemSaindo] = useState<number | null>(null);
  
  const [statusEnvio, setStatusEnvio] = useState({
    processando: false,
    mensagem: ""
  });
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const totalGeral = items.length;
  const concluidosGeral = items.filter(i => i.status === "ok").length;
  const progresso = totalGeral > 0 ? Math.round((concluidosGeral / totalGeral) * 100) : 0;
  const itensFaltantes = totalGeral - concluidosGeral;

  const categoriasOrd = [
    { id: 'armamento', label: 'ARMAS' },
    { id: 'municao', label: 'MUNIÇÕES' },
    { id: 'taser', label: 'TASER' },
    { id: 'equipamento', label: 'EQUIPAMENTOS' },
    { id: 'comunicacao', label: 'RÁDIOS' },
    { id: 'veiculo', label: 'VIATURAS' },
    { id: 'sade', label: 'SADE' },
    { id: 'acess sade', label: 'ACESS SADE' }
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

  const getQRCodeBase64 = async (hash: string) => {
    try {
      const urlValidacao = `https://sistema-checklist-frontend.vercel.app/validar/${hash}`;
      const apiUrl = `https://quickchart.io/qr?text=${encodeURIComponent(urlValidacao)}&size=150&margin=1`;
      const response = await fetch(apiUrl);
      if (!response.ok) return null;
      const blob = await response.blob();
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) { return null; }
  };

  const gerarHTMLParaPDF = (dataFormatada: string, horaFormatada: string, hashUnico: string, qrCodeBase64: string) => {
    const htmlTabelas = categoriasOrd.map(cat => {
      const itensDaCat = items.filter(i => i.cat === cat.id);
      if (itensDaCat.length === 0) return '';
      return `
        <div class="category-block">
          <div class="category-header">${cat.label}</div>
          <table class="main-table">
            <thead>
              <tr>
                <th style="width: 30px;">ORD</th>
                <th style="width: 35px;">QTD</th>
                <th style="text-align: left;">ESPECIFICAÇÃO / SÉRIE</th>
                <th style="width: 75px;">PMPR</th>
                <th style="width: 110px;">OBS / CAUTELA</th>
                <th style="width: 35px;">PÁG</th>
                <th style="width: 40px;">CONF.</th>
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
                  <td style="text-transform: uppercase; font-size: 7px;">
                    ${item.cautela ? `<strong>${item.cautela}</strong>` : 'DISPONÍVEL'}
                  </td>
                  <td style="text-align: center; font-weight: bold;">${item.pagLivro || '---'}</td>
                  <td class="conf-ok">OK</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }).join('');

    return `<html><head><style>
      @page { margin: 30px; size: A4; }
      body { font-family: 'Helvetica', sans-serif; color: #000; line-height: 1.1; padding: 0; margin: 0; }
      .header-container { text-align: center; margin-bottom: 8px; border-bottom: 2px solid #000; padding-bottom: 8px; }
      .header-pmpr { font-size: 10px; font-weight: bold; text-transform: uppercase; }
      .doc-title { font-size: 12px; font-weight: bold; margin: 5px 0; text-transform: uppercase; background-color: #eee; padding: 5px; border: 1px solid #000; }
      .info-box { font-size: 9px; border: 1px solid #000; padding: 6px; margin-bottom: 12px; background-color: #fafafa; }
      .category-block { page-break-inside: avoid; margin-bottom: 12px; }
      .category-header { background-color: #f1f5f9; padding: 4px; border: 1px solid #000; border-bottom: none; font-weight: bold; font-size: 9px; text-transform: uppercase; }
      .main-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
      .main-table th { background-color: #0f172a; color: #ffffff; border: 1px solid #000; padding: 4px; font-size: 7.5px; }
      .main-table td { border: 1px solid #000; padding: 4px; font-size: 7.5px; word-wrap: break-word; vertical-align: middle; }
      .item-desc { font-weight: bold; text-transform: uppercase; }
      .item-sn { font-size: 6.5px; color: #444; }
      .conf-ok { text-align: center; font-weight: bold; color: #059669; }
      .footer-table { width: 100%; margin-top: 25px; border-top: 1px solid #ccc; padding-top: 10px; }
      .signature-side { text-align: center; font-size: 9px; }
      .qrcode-container { text-align: center; display: flex; flex-direction: column; align-items: center; }
      .qrcode-img { width: 80px; height: 80px; }
      .qrcode-label { font-size: 6px; font-weight: bold; margin-top: 2px; color: #444; }
    </style></head><body>
      <div style="text-align: right; font-size: 8px; margin-bottom: 5px;">Relatório gerado em: ${dataFormatada} às ${horaFormatada.substring(0,5)}</div>
      <div class="header-container">
        <div class="header-pmpr">
          POLÍCIA MILITAR DO PARANÁ<br/>6º CRPM | 17º BPM<br/>ALMOXARIFADO
        </div>
        <div class="doc-title">RELATÓRIO DIÁRIO DE CONFERÊNCIA DE CARGA</div>
      </div>
      <div class="info-box">
        <strong>RESPONSÁVEL:</strong> ${user?.posto || ''} ${user?.name || 'MILITAR'} | 
        <strong>RG:</strong> ${user?.re || '---'} | <strong>UNIDADE:</strong> 17º BPM
      </div>
      ${htmlTabelas}
      <table class="footer-table">
        <tr>
          <td class="signature-side" style="width: 70%;">
            <div style="border-top: 1px solid #000; width: 250px; margin: 40px auto 5px auto;"></div>
            <strong>${user?.posto || ''} ${user?.name || 'MILITAR'}</strong><br/>
            Assinatura Digital - ID: ${hashUnico}
          </td>
          <td style="width: 30%;">
            <div class="qrcode-container">
              ${qrCodeBase64 ? `<img src="${qrCodeBase64}" class="qrcode-img" />` : ''}
              <div class="qrcode-label">VALIDAÇÃO AUTÊNTICA</div>
            </div>
          </td>
        </tr>
      </table>
    </body></html>`;
  };

  const executarEnvioServidor = async (uri: string, base64: string, dataF: string, horaF: string, hashU: string) => {
    setStatusEnvio({ processando: true, mensagem: "Sincronizando com o Servidor..." });
    try {
      const payload = {
        pdfBase64: `data:application/pdf;base64,${base64}`,
        fileName: `Checklist_17BPM_${user?.re}_${Date.now()}.pdf`,
        data: dataF,
        hora: horaF,
        hash: hashU,
        responsavel: `${user?.posto || ''} ${user?.name || ''}`.trim(),
        itens: items,
      };

      const res = await api.post("/mobile/conferencia", payload);
      setStatusEnvio({ processando: false, mensagem: "" });

      if (res.status === 201 || res.status === 200) {
        Alert.alert("Sucesso", "Conferência finalizada e enviada com sucesso!", [
          { text: "OK", onPress: () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'dashboard/dashboard' }] })) }
        ]);
      }
    } catch (err) {
      setStatusEnvio({ processando: false, mensagem: "" });
      Alert.alert("Aviso de Conexão", "Não foi possível enviar ao servidor. O PDF foi aberto para salvamento manual.");
    }
  };

  const finalizarEEnviar = async () => {
    if (progresso < 100) {
      Alert.alert("Pendente", `Ainda restam ${itensFaltantes} itens para conferir.`);
      return;
    }

    Alert.alert(
      "Finalizar Conferência", 
      "Deseja gerar o relatório assinado agora?",
      [
        { 
          text: "Visualizar PDF", 
          onPress: async () => {
            setStatusEnvio({ processando: true, mensagem: "Gerando PDF..." });
            try {
              const agora = new Date();
              const hash = `CHECK-${user?.re}-${Date.now()}`;
              const qr = await getQRCodeBase64(hash);
              const html = gerarHTMLParaPDF(agora.toLocaleDateString('pt-BR'), agora.toLocaleTimeString('pt-BR'), hash, qr || "");
              const { uri } = await Print.printToFileAsync({ html });
              setStatusEnvio({ processando: false, mensagem: "" });
              await Sharing.shareAsync(uri);
            } catch { setStatusEnvio({ processando: false, mensagem: "" }); }
          }
        },
        { 
          text: "Enviar ao Sistema", 
          onPress: async () => {
            setStatusEnvio({ processando: true, mensagem: "Preparando envio..." });
            try {
              const agora = new Date();
              const dF = agora.toLocaleDateString('pt-BR');
              const hF = agora.toLocaleTimeString('pt-BR');
              const hash = `CHECK-${user?.re}-${Date.now()}`;
              
              setStatusEnvio({ processando: true, mensagem: "Gerando Assinatura..." });
              const qr = await getQRCodeBase64(hash);
              
              setStatusEnvio({ processando: true, mensagem: "Renderizando..." });
              const html = gerarHTMLParaPDF(dF, hF, hash, qr || "");
              const { uri, base64 } = await Print.printToFileAsync({ html, base64: true });
              
              await executarEnvioServidor(uri, base64 || "", dF, hF, hash);
            } catch (e) {
              setStatusEnvio({ processando: false, mensagem: "" });
              Alert.alert("Erro", "Falha ao processar relatório.");
            }
          }
        },
        { text: "Cancelar", style: 'cancel' }
      ]
    );
  };

  if (isLoading) return <ChecklistSkeleton />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      
      <ProcessingOverlay 
        visible={statusEnvio.processando} 
        message={statusEnvio.mensagem} 
      />

      <View style={styles.headerBackground}>
        <SafeAreaView edges={['top', 'left', 'right']}>
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
            placeholder="Buscar..."
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
              isFinalizando && { opacity: fadeAnim, transform: [{ scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }] }
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
                  placeholder="Observação / Cautela" 
                  style={styles.miniInput} 
                  onChangeText={(text) => atualizarCampoItem(item.id, 'cautela', text)}
                  value={item.cautela} 
                  placeholderTextColor="#cbd5e1"
                />
                <TextInput 
                  placeholder="Pág" 
                  style={[styles.miniInput, { flex: 0, width: 50, textAlign: 'center' }]} 
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
          disabled={statusEnvio.processando}
          style={[
            styles.sendButton, 
            progresso < 100 && { backgroundColor: '#334155' } 
          ]}
          onPress={finalizarEEnviar}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {progresso === 100 ? (
              <>
                <CloudUpload size={20} color="#fff" style={{marginRight: 8}} />
                <Text style={styles.sendButtonText}>FINALIZAR CONFERÊNCIA</Text>
              </>
            ) : (
              <>
                <AlertCircle size={20} color="#fff" style={{marginRight: 8}} />
                <Text style={styles.sendButtonText}>
                  PENDENTE: {itensFaltantes} {itensFaltantes === 1 ? 'ITEM' : 'ITENS'}
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}