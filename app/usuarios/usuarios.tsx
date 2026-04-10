import React, { useState, useEffect } from "react";
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, 
  ActivityIndicator, Alert 
} from "react-native";
import { 
  ShieldCheck, User, ShieldAlert, Search, 
  Edit3, Trash2 
} from "lucide-react-native";
import { styles } from "./styles";

// 1. Definição da Interface para evitar o erro 'never'
interface Usuario {
  id: string;
  nome: string;
  posto: string;
  re: string;
  email: string;
  nivel: string;
  status: string;
}

export default function UsuariosScreen() {
  // 2. Tipagem do State como um array de Usuario
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados
    const mockData: Usuario[] = [
      { id: '1', nome: 'SANTOS', posto: '3º SGT. QP PM', re: '123.456-7', email: 'santos@pm.pr.gov.br', nivel: 'Admin', status: 'Ativo' },
      { id: '2', nome: 'OLIVEIRA', posto: 'SD. QP PM', re: '987.654-3', email: 'oliveira@pm.pr.gov.br', nivel: 'Operador', status: 'Ativo' },
      { id: '3', nome: 'SILVA', posto: 'CB. QP PM', re: '456.789-0', email: 'silva@pm.pr.gov.br', nivel: 'Operador', status: 'Inativo' },
    ];

    setTimeout(() => {
      setUsuarios(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const usuariosFiltrados = usuarios.filter(u => 
    u.nome.toLowerCase().includes(busca.toLowerCase()) || 
    u.re.includes(busca)
  );

  // 3. Tipagem do item no renderItem
  const renderUser = ({ item }: { item: Usuario }) => (
    <View style={styles.userCard}>
      <View style={styles.avatar}>
        <User size={24} color="#94A3B8" />
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.posto} {item.nome}</Text>
        <Text style={styles.userRG}>RG {item.re}</Text>
        <Text style={styles.userEmail} numberOfLines={1}>{item.email}</Text>
        
        <View style={styles.badgeRow}>
          {/* Badge Nível */}
          <View style={{ backgroundColor: item.nivel === 'Admin' ? '#EEF2FF' : '#F1F5F9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }}>
            <Text style={{ fontSize: 9, fontWeight: '900', color: item.nivel === 'Admin' ? '#3B82F6' : '#64748B' }}>
              {item.nivel.toUpperCase()}
            </Text>
          </View>
          {/* Badge Status */}
          <View style={{ backgroundColor: item.status === 'Ativo' ? '#ECFDF5' : '#FEF2F2', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }}>
            <Text style={{ fontSize: 9, fontWeight: '900', color: item.status === 'Ativo' ? '#10B981' : '#EF4444' }}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.iconBtn} 
          onPress={() => Alert.alert("Editar", `Editar militar: ${item.nome}`)}
        >
          <Edit3 size={18} color="#1E293B" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconBtn} 
          onPress={() => Alert.alert("Remover", `Confirmar exclusão de ${item.nome}?`)}
        >
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerInfo}>
        <Text style={styles.title}>Usuários</Text>
        <Text style={styles.subtitle}>Gestão de Acessos</Text>
      </View>

      {/* Cards de Estatística */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <ShieldCheck size={20} color="#3B82F6" />
          <Text style={styles.statValue}>
            {usuarios.filter(u => u.nivel === 'Admin').length.toString().padStart(2, '0')}
          </Text>
          <Text style={styles.statLabel}>Admins</Text>
        </View>
        <View style={styles.statCard}>
          <User size={20} color="#10B981" />
          <Text style={styles.statValue}>
            {usuarios.filter(u => u.status === 'Ativo').length.toString().padStart(2, '0')}
          </Text>
          <Text style={styles.statLabel}>Ativos</Text>
        </View>
        <View style={styles.statCard}>
          <ShieldAlert size={20} color="#EF4444" />
          <Text style={styles.statValue}>
            {usuarios.filter(u => u.status === 'Inativo').length.toString().padStart(2, '0')}
          </Text>
          <Text style={styles.statLabel}>Bloqueio</Text>
        </View>
      </View>

      {/* Busca */}
      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <Search size={18} color="#94A3B8" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar por nome ou RG..."
            placeholderTextColor="#94A3B8"
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 50 }} />
      ) : (
        <FlatList 
          data={usuariosFiltrados}
          renderItem={renderUser}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: 'center', color: '#94A3B8', marginTop: 20 }}>
              Nenhum militar encontrado.
            </Text>
          )}
        />
      )}
    </View>
  );
}