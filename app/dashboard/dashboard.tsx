import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  RefreshControl,
  Dimensions
} from "react-native";
import { 
  Shield, 
  Clock, 
  HardDrive, 
  User, 
  AlertTriangle, 
  Activity
} from "lucide-react-native";


import { DashboardSkeleton } from "../../components/Skeleton";
import { styles } from "./styles";

const { width } = Dimensions.get("window");

export default function DashboardComando() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const mockData = {
    isPendente: true,
    turnoAlvo: "MATUTINO",
    ultimoChecklist: { responsavel: "SGT FURRIEL", hora: "08:30" },
    stats: {
      aderencia: "92%",
      reserva: 45,
      emCautela: 128,
      avarias: 3
    },
    logs: [
      { id: "LOG-A2", equipamento: "FUZIL IA2", status: "CRÍTICO", militar: "FALHA NO PERCURSOR DURANTE CONFERÊNCIA", responsavel: "SGT RAMOS", hora: "09:12", livro: "042" },
      { id: "LOG-B5", equipamento: "MUNIÇÃO .40", status: "MANUTENÇÃO", militar: "LOTE ENVIADO PARA DESCARTE/TROCA", responsavel: "SGT FURRIEL", hora: "08:45", livro: "041" }
    ]
  };

  const fetchData = async () => {
    
    setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
      setRefreshing(false);
    }, 2000); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          tintColor="#3B82F6"
          colors={["#3B82F6"]}
        />
      }
    >
    
      
      <View style={[styles.statusHeader, data.isPendente ? styles.headerAlert : styles.headerNormal]}>
        <View style={styles.headerInfo}>
          <Shield color="#FFF" size={24} />
          <View>
            <Text style={styles.headerTitle}>17º BPM - PAINEL OPERACIONAL</Text>
            <Text style={styles.headerSubtitle}>
              {data.isPendente ? `ALERTA: TURNO ${data.turnoAlvo} PENDENTE` : `CONFERÊNCIA CONCLUÍDA`}
            </Text>
          </View>
        </View>
      </View>

     
      <View style={styles.gridCards}>
        <View style={styles.row}>
          <StatCard 
            label="STATUS" 
            value={data.stats.aderencia} 
            sub={data.isPendente ? "PENDENTE" : "OK"} 
            icon={<Clock size={18} color="#EF4444" />}
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
            sub="CRÍTICOS" 
            icon={<AlertTriangle size={18} color="#F59E0B" />}
            alert={data.stats.avarias > 0}
          />
        </View>
      </View>

      
      <View style={styles.sectionHeader}>
        <Activity size={18} color="#3B82F6" />
        <Text style={styles.sectionTitle}>OCORRÊNCIAS EM TEMPO REAL</Text>
      </View>

      {data.logs.map((log: any, index: number) => (
        <View key={index} style={[styles.logCard, log.status === 'CRÍTICO' && styles.logAlert]}>
          <View style={styles.logHeader}>
            <View style={styles.logBadge}>
              <Text style={styles.logBadgeText}>{log.id}</Text>
            </View>
            <Text style={styles.logStatusText}>{log.status}</Text>
          </View>
          
          <Text style={styles.logEquipamento}>{log.equipamento}</Text>
          <Text style={styles.logDescricao}>"{log.militar}"</Text>
          
          <View style={styles.logFooter}>
            <Text style={styles.logFooterText}>LIVRO: {log.livro}</Text>
            <Text style={styles.logFooterText}>{log.hora} • {log.responsavel}</Text>
          </View>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
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