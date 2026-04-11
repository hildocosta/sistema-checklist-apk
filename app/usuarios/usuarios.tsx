import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, 
  Alert, StatusBar, SafeAreaView, Image, RefreshControl 
} from "react-native";
import { 
  ShieldCheck, User, ShieldAlert, Search, 
  Edit3, Trash2, RefreshCw 
} from "lucide-react-native";

import UsersSkeleton from "../../components/UsersSkeleton";
import api from "../../service/api";
import { styles } from "./styles";

interface Usuario {
  id: string;
  name: string; // Ajustado para 'name' (Prisma)
  posto: string;
  re: string;
  email: string;
  nivel: string;
  image?: string; // Campo de imagem que salvamos
  status?: string; // Caso você tenha esse campo no banco
}

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Função para buscar dados da API
  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get("/mobile/users");
      setUsuarios(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar a lista de militares.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter(u => 
      (u.name?.toLowerCase() || "").includes(busca.toLowerCase()) || 
      (u.re || "").includes(busca)
    );
  }, [busca, usuarios]);

  const renderUser = ({ item }: { item: Usuario }) => (
    <View style={styles.userCard}>
      <View style={styles.avatar}>
        {item.image ? (
          <Image 
            source={{ uri: item.image }} 
            style={{ width: '100%', height: '100%', borderRadius: 20 }} 
          />
        ) : (
          <User size={24} color="#94A3B8" />
        )}
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.posto} {item.name}</Text>
        <Text style={styles.userRG}>RG {item.re}</Text>
        <Text style={styles.userEmail} numberOfLines={1}>{item.email}</Text>
        
        <View style={styles.badgeRow}>
          <View style={{ 
            backgroundColor: item.nivel === 'Admin' ? '#EEF2FF' : '#F1F5F9', 
            paddingHorizontal: 8, 
            paddingVertical: 2, 
            borderRadius: 6 
          }}>
            <Text style={{ 
              fontSize: 9, 
              fontWeight: '900', 
              color: item.nivel === 'Admin' ? '#3B82F6' : '#64748B' 
            }}>
              {(item.nivel || 'OPERADOR').toUpperCase()}
            </Text>
          </View>
          
          {/* Status Fictício baseado em ter RE ou não, ou ajuste conforme seu banco */}
          <View style={{ 
            backgroundColor: '#ECFDF5', 
            paddingHorizontal: 8, 
            paddingVertical: 2, 
            borderRadius: 6,
            marginLeft: 6
          }}>
            <Text style={{ fontSize: 9, fontWeight: '900', color: '#10B981' }}>
              ATIVO
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.iconBtn} 
          onPress={() => Alert.alert("Editar", `Editar militar: ${item.name}`)}
        >
          <Edit3 size={18} color="#1E293B" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconBtn} 
          onPress={() => Alert.alert("Remover", `Confirmar exclusão de ${item.name}?`)}
        >
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) return <UsersSkeleton />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      
      <View style={styles.headerInfo}>
        <SafeAreaView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.title}>Usuários</Text>
              <Text style={styles.subtitle}>Gestão de Acessos</Text>
            </View>
            <TouchableOpacity onPress={onRefresh} style={{ marginRight: 20 }}>
              <RefreshCw size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

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
            {usuarios.length.toString().padStart(2, '0')}
          </Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <ShieldAlert size={20} color="#EF4444" />
          <Text style={styles.statValue}>00</Text>
          <Text style={styles.statLabel}>Bloqueio</Text>
        </View>
      </View>

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

      <FlatList 
        data={usuariosFiltrados}
        renderItem={renderUser}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', color: '#94A3B8', marginTop: 30, fontWeight: '600' }}>
            Nenhum militar encontrado.
          </Text>
        )}
      />
    </View>
  );
}