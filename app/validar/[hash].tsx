import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  CheckCircle2, 
  XCircle, 
  User, 
  Calendar, 
  Clock, 
  FileSearch, 
  ChevronLeft 
} from 'lucide-react-native';
import api from '../../service/api';


interface Relatorio {
  responsavel: string;
  data: string;
  hora: string;
}

export default function ValidarScreen() {
  const { hash } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [relatorio, setRelatorio] = useState<Relatorio | null>(null);

  
  useEffect(() => {
    const validarHash = async () => {
      try {
        const response = await api.get(`/mobile/conferencia?hash=${hash}`);
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          setRelatorio(response.data[0]);
        } else {
          setRelatorio(null);
        }
      } catch (error) {
        setRelatorio(null);
      } finally {
        setLoading(false);
      }
    };

    if (hash) validarHash();
  }, [hash]);

    
  const LoadingState = () => (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={styles.loadingText}>Autenticando documento...</Text>
    </View>
  );

  const SuccessCard = () => (
    <View style={styles.content}>
      <View style={styles.statusHeader}>
        <View style={styles.iconSuccess}>
          <CheckCircle2 color="#10B981" size={32} />
        </View>
        <Text style={styles.title}>Relatório Válido</Text>
        <Text style={styles.subtitle}>Documento autenticado no sistema</Text>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.labelRow}>
          <User size={14} color="#3B82F6" />
          <Text style={styles.labelText}>RESPONSÁVEL</Text>
        </View>
        <Text style={styles.valueText}>{relatorio?.responsavel}</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.infoBox, { flex: 1, marginRight: 8 }]}>
          <View style={styles.labelRow}>
            <Calendar size={14} color="#64748B" />
            <Text style={styles.labelText}>DATA</Text>
          </View>
          <Text style={styles.valueTextSmall}>{relatorio?.data}</Text>
        </View>
        <View style={[styles.infoBox, { flex: 1 }]}>
          <View style={styles.labelRow}>
            <Clock size={14} color="#64748B" />
            <Text style={styles.labelText}>HORA</Text>
          </View>
          <Text style={styles.valueTextSmall}>{relatorio?.hora}</Text>
        </View>
      </View>

      <View style={styles.hashBox}>
        <View style={styles.labelRow}>
          <FileSearch size={14} color="#2563EB" />
          <Text style={[styles.labelText, { color: '#3B82F6' }]}>CÓDIGO DE VERIFICAÇÃO</Text>
        </View>
        <Text style={styles.hashText}>{hash}</Text>
      </View>

      <Text style={styles.footerText}>PMPR • 17º BPM • SJP</Text>
    </View>
  );

  const ErrorCard = () => (
    <View style={styles.content}>
      <View style={styles.statusHeader}>
        <View style={styles.iconError}>
          <XCircle color="#EF4444" size={32} />
        </View>
        <Text style={styles.title}>Não Encontrado</Text>
        <Text style={styles.subtitle}>Este código não consta em nossos registros.</Text>
      </View>
      <Text style={styles.legalText}>
        A falsificação de documentos públicos é crime conforme o Art. 297 do Código Penal.
      </Text>
    </View>
  );

  
  if (loading) return <LoadingState />;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <ChevronLeft size={24} color="#64748B" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.logoContainer}>
           <Image 
              source={require('../../assets/images/bg-profile.png')} 
              style={styles.logo} 
           />
        </View>

        {relatorio ? <SuccessCard /> : <ErrorCard />}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  
  container: { 
    flexGrow: 1, 
    backgroundColor: '#F8FAFC', 
    padding: 20, 
    paddingTop: 60 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F8FAFC' 
  },
  loadingText: { 
    marginTop: 10, 
    color: '#64748B', 
    fontWeight: '600' 
  },

  
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 40 
  },
  backText: { 
    color: '#64748B', 
    fontWeight: 'bold', 
    marginLeft: 4 
  },

  
  card: { 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 24, 
    paddingTop: 40, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8 
  },
  logoContainer: { 
    position: 'absolute', 
    top: -40, 
    alignSelf: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 40, 
    padding: 5, 
    elevation: 5 
  },
  logo: { 
    width: 80, 
    height: 80, 
    borderRadius: 40 
  },

  
  content: { 
    alignItems: 'stretch' 
  },
  statusHeader: { 
    alignItems: 'center', 
    marginBottom: 25 
  },
  iconSuccess: { 
    backgroundColor: '#ECFDF5', 
    padding: 15, 
    borderRadius: 100, 
    marginBottom: 10 
  },
  iconError: { 
    backgroundColor: '#FEF2F2', 
    padding: 15, 
    borderRadius: 100, 
    marginBottom: 10 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#334155' 
  },
  subtitle: { 
    fontSize: 12, 
    color: '#94A3B8' 
  },


  infoBox: { 
    backgroundColor: '#F1F5F9', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 12 
  },
  labelRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 4 
  },
  labelText: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: '#94A3B8', 
    marginLeft: 6 
  },
  valueText: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    textTransform: 'uppercase' 
  },
  valueTextSmall: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#1E293B' 
  },
  row: { 
    flexDirection: 'row', 
    marginBottom: 12 
  },

  hashBox: { 
    backgroundColor: '#EFF6FF', 
    padding: 15, 
    borderRadius: 12, 
    borderStyle: 'dashed', 
    borderWidth: 1, 
    borderColor: '#BFDBFE' 
  },
  hashText: { 
    fontSize: 11, 
    color: '#2563EB', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 5 
  },
  footerText: { 
    textAlign: 'center', 
    marginTop: 25, 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: '#CBD5E1', 
    letterSpacing: 2 
  },
  legalText: { 
    textAlign: 'center', 
    color: '#F87171', 
    fontSize: 10, 
    fontStyle: 'italic', 
    marginTop: 20 
  }
});