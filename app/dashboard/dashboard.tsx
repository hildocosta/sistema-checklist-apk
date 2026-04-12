import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  RefreshControl, 
  Alert,
  SafeAreaView
} from "react-native";
import { 
  Shield, 
  Clock, 
  HardDrive, 
  User, 
  AlertTriangle, 
  Activity
} from "lucide-react-native";

import api from "../../service/api"; 
import { DashboardSkeleton } from "../../components/Skeleton";
import { styles } from "./styles";

export default function DashboardComando() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get("/mobile/dashboard-stats"); 
      setData(response.data);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
      Alert.alert("Erro", "Não foi possível sincronizar os dados do batalhão.");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (isLoading || !data) {
    return <DashboardSkeleton />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}>
      
      {/* --- PARTE FIXA (ESTÁTICA) --- */}
      <View style={{ zIndex: 10, elevation: 5, backgroundColor: styles.container.backgroundColor }}>
        
        {/* HEADER STATUS */}
        <View style={[styles.statusHeader, data.isPendente ? styles.headerAlert : styles.headerNormal]}>
          <View style={styles.headerInfo}>
            <Shield color="#FFF" size={24} />
            <View>
              <Text style={styles.headerTitle}>17º BPM - PAINEL OPERACIONAL</Text>
              <Text style={styles.headerSubtitle}>
                {data.isPendente 
                  ? `PENDÊNCIA: TURNO ${data.turnoAlvo}` 
                  : `CHECKLIST CONCLUÍDO - ${data.turnoAlvo}`}
              </Text>
            </View>
          </View>
        </View>

        {/* GRUPO DE CARDS FIXOS */}
        <View style={[styles.gridCards, { marginBottom: 10 }]}>
          <View style={styles.row}>
            <StatCard 
              label="ADERÊNCIA" 
              value={data.stats.aderencia} 
              sub={data.isPendente ? "AGUARDANDO" : "CONCLUÍDO"} 
              icon={<Clock size={18} color={data.isPendente ? "#EF4444" : "#10B981"} />}
              alert={data.isPendente}
            />
            <StatCard 
              label="RESERVA" 
              value={data.stats.reserva} 
              sub="DISPONÍVEL" 
              icon={<HardDrive size={18} color="#10B981" />}
            />
          </View>
          <View style={styles.row}>
            <StatCard 
              label="EM CAUTELA" 
              value={data.stats.emCautela} 
              sub="COM EFETIVO" 
              icon={<User size={18} color="#3B82F6" />}
            />
            <StatCard 
              label="AVARIAS" 
              value={data.stats.avarias} 
              sub="ALTERAÇÕES" 
              icon={<AlertTriangle size={18} color="#F59E0B" />}
              alert={data.stats.avarias > 0}
            />
          </View>
        </View>

        {/* INFO DE ATUALIZAÇÃO E TÍTULO DA SEÇÃO (TAMBÉM FIXO) */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
          <Text style={[styles.updateText, { marginBottom: 15 }]}>
            Última conferência: {data.ultimoChecklist.hora} por {data.ultimoChecklist.responsavel}
          </Text>
          
          <View style={[styles.sectionHeader, { marginTop: 0 }]}>
            <Activity size={18} color="#3B82F6" />
            <Text style={styles.sectionTitle}>ALTERAÇÕES CONSTATADAS</Text>
          </View>
        </View>
      </View>

      {/* --- PARTE ROLÁVEL (DINÂMICA) --- */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16 }} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3B82F6" />
        }
      >
        {data.logs.length === 0 ? (
          <View style={styles.emptyLogs}>
            <Text style={styles.emptyLogsText}>Nenhuma alteração registrada hoje.</Text>
          </View>
        ) : (
          data.logs.map((log: any, index: number) => (
            <View key={index} style={[
              styles.logCard, 
              (log.status === 'CRÍTICO' || log.status === 'EXTRAVIO') && styles.logAlert,
              { marginHorizontal: 0, width: '100%' } // Ajuste para ocupar a largura correta
            ]}>
              <View style={styles.logHeader}>
                <View style={styles.logBadge}>
                  <Text style={[styles.logBadgeText, log.id.length > 8 && { fontSize: 10 }]}>
                    {log.id}
                  </Text>
                </View>
                <Text style={[
                  styles.logStatusText, 
                  (log.status === 'CRÍTICO' || log.status === 'EXTRAVIO') && { color: '#EF4444' },
                  log.status === 'ADMINISTRATIVO' && { color: '#3B82F6' } 
                ]}>
                  {log.status}
                </Text>
              </View>
              
              <Text style={styles.logEquipamento}>{log.equipamento}</Text>
              <Text style={styles.logDescricao}>Obs: {log.militar}</Text>
              
              <View style={styles.logFooter}>
                <Text style={styles.logFooterText}>LIVRO: {log.livro}</Text>
                <Text style={styles.logFooterText}>{log.hora} • {log.responsavel}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

    </SafeAreaView>
  );
}

function StatCard({ label, value, sub, icon, alert }: any) {
  return (
    <View style={[styles.card, alert && styles.cardAlert]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardLabel}>{label}</Text>
        {icon}
      </View>
      <Text style={[styles.cardValue, alert && { color: '#EF4444' }]}>{value}</Text>
      <Text style={styles.cardSub}>{sub}</Text>
    </View>
  );
}