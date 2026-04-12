import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, 
  StatusBar, SafeAreaView, Image, RefreshControl,
  ActivityIndicator
} from "react-native";
import { 
  ShieldCheck, User, Search, 
  Edit3, Trash2, RefreshCw, AlertTriangle,
  UserX, CheckCircle2
} from "lucide-react-native";

import UsersSkeleton from "../../components/UsersSkeleton";
import CustomModal from "../../components/CustomModal";
import api from "../../service/api";
import { styles } from "./styles";

// --- IMPORTAÇÃO DO CONTEXTO DE AUTENTICAÇÃO ---
import { useAuth } from "../../context/AuthContext";

interface Usuario {
  id: string;
  name: string;
  posto: string;
  re: string;
  email: string;
  nivel: 'Admin' | 'Operador';
  image?: string;
}

export default function UsuariosScreen() {
  // Dados do Contexto Global
  const { user: loggedUser, setUser } = useAuth();

  // Estados Locais
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  
  const [feedbackData, setFeedbackData] = useState({ title: "", message: "", type: "default" as "default" | "danger" | "success" });
  const [userSelected, setUserSelected] = useState<Usuario | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Busca inicial de usuários
  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get("/mobile/users");
      setUsuarios(response.data);
    } catch (error) {
      showFeedback("Erro", "Não foi possível carregar a lista de militares.", "danger");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const showFeedback = (title: string, message: string, type: "default" | "danger" | "success") => {
    setFeedbackData({ title, message, type });
    setIsFeedbackModalOpen(true);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const handleOpenEdit = (user: Usuario) => {
    setUserSelected({ ...user });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (user: Usuario) => {
    setUserSelected(user);
    setIsDeleteModalOpen(true);
  };

  // --- FUNÇÃO DE ATUALIZAÇÃO AJUSTADA ---
  const handleUpdateUser = async () => {
    if (!userSelected) return;
    setIsSaving(true);

    try {
      // 1. Atualiza na API
      await api.put(`/mobile/users/${userSelected.id}`, {
        name: userSelected.name,
        posto: userSelected.posto,
        nivel: userSelected.nivel
      });
      
      // 2. Atualiza a lista local na tela
      setUsuarios(prev => prev.map(u => u.id === userSelected.id ? { ...u, ...userSelected } : u));
      
      // 3. SE FOR O USUÁRIO LOGADO, ATUALIZA O CONTEXTO GLOBAL (DRAWER)
      if (loggedUser && userSelected.id === loggedUser.id) {
        setUser({
          ...loggedUser,
          name: userSelected.name,
          posto: userSelected.posto,
          nivel: userSelected.nivel
        });
      }

      setIsEditModalOpen(false);
      
      setTimeout(() => {
        showFeedback("Sucesso", "Militar atualizado com sucesso!", "success");
      }, 400);

    } catch (error: any) {
      const msg = error.response?.data?.error || "Falha ao atualizar militar.";
      showFeedback("Erro", msg, "danger");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!userSelected) return;
    setIsSaving(true);

    try {
      await api.delete(`/mobile/users/${userSelected.id}`);
      setUsuarios(prev => prev.filter(u => u.id !== userSelected.id));
      setIsDeleteModalOpen(false);
      
      setTimeout(() => {
        showFeedback("Removido", "Militar removido do sistema.", "success");
      }, 400);

    } catch (error: any) {
      const msg = error.response?.data?.error || "Não foi possível excluir o registro.";
      showFeedback("Erro", msg, "danger");
    } finally {
      setIsSaving(false);
    }
  };

  const usuariosFiltrados = useMemo(() => {
    const term = busca.toLowerCase();
    return usuarios.filter(u => 
      (u.name?.toLowerCase() || "").includes(term) || 
      (u.re || "").includes(term)
    );
  }, [busca, usuarios]);

  const renderUser = ({ item }: { item: Usuario }) => (
    <View style={styles.userCard}>
      <View style={styles.avatar}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
        ) : (
          <User size={24} color="#94A3B8" />
        )}
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.posto} {item.name}</Text>
        <Text style={styles.userRG}>RG {item.re}</Text>
        
        <View style={styles.badgeRow}>
          <View style={[styles.badgeBase, { backgroundColor: item.nivel === 'Admin' ? '#EEF2FF' : '#F1F5F9' }]}>
            <Text style={[styles.badgeText, { color: item.nivel === 'Admin' ? '#3B82F6' : '#64748B' }]}>
              {item.nivel?.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => handleOpenEdit(item)}>
          <Edit3 size={18} color="#1E293B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => handleOpenDelete(item)}>
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
            <View>
              <Text style={styles.title}>Usuários</Text>
              <Text style={styles.subtitle}>Gestão de Acessos</Text>
            </View>
            <TouchableOpacity onPress={onRefresh} disabled={refreshing}>
              <RefreshCw size={22} color="#FFF" style={{ opacity: refreshing ? 0.5 : 1 }} />
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
          <UserX size={20} color="#F59E0B" /> 
          <Text style={styles.statValue}>
            {usuarios.filter(u => u.nivel !== 'Admin').length.toString().padStart(2, '0')}
          </Text>
          <Text style={styles.statLabel}>Operadores</Text>
        </View>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <Search size={18} color="#94A3B8" />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Buscar por nome ou RE..." 
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3B82F6" />}
      />

      <CustomModal
        isVisible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Militar"
        footer={
          <View style={{ width: '100%', alignItems: 'center' }}>
            <TouchableOpacity 
              style={[styles.btnSave, { width: '80%', alignSelf: 'center' }]} 
              onPress={handleUpdateUser} 
              disabled={isSaving}
            >
              {isSaving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnSaveText}>Salvar Alterações</Text>}
            </TouchableOpacity>
          </View>
        }
      >
        <Text style={styles.label}>Posto / Graduação</Text>
        <TextInput 
          style={styles.input} 
          value={userSelected?.posto} 
          onChangeText={(t) => setUserSelected(p => p ? {...p, posto: t} : null)} 
        />
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput 
          style={styles.input} 
          value={userSelected?.name} 
          onChangeText={(t) => setUserSelected(p => p ? {...p, name: t} : null)} 
        />
        <Text style={styles.label}>Nível de Acesso</Text>
        <View style={styles.rowLevels}>
          {['Admin', 'Operador'].map((lvl) => (
            <TouchableOpacity 
              key={lvl} 
              onPress={() => setUserSelected(p => p ? {...p, nivel: lvl as any} : null)} 
              style={[styles.levelOption, userSelected?.nivel === lvl && styles.levelOptionActive]}
            >
              <Text style={[styles.levelText, userSelected?.nivel === lvl && styles.levelTextActive]}>{lvl}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </CustomModal>

      <CustomModal
        isVisible={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
        type="danger"
        footer={
          <View style={{ width: '100%', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity 
              style={[styles.btnSave, { backgroundColor: '#EF4444', width: '80%' }]} 
              onPress={handleDeleteConfirm}
              disabled={isSaving}
            >
              {isSaving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnSaveText}>Sim, Excluir Militar</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsDeleteModalOpen(false)}>
              <Text style={{ color: '#64748B', fontWeight: '700' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        }
      >
        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
          <View style={{ backgroundColor: '#FEF2F2', padding: 20, borderRadius: 50, marginBottom: 15 }}>
            <AlertTriangle size={40} color="#EF4444" />
          </View>
          <Text style={{ textAlign: 'center', color: '#64748B', fontSize: 15, lineHeight: 22 }}>
            Você está prestes a remover {"\n"}
            <Text style={{ fontWeight: '800', color: '#1E293B' }}>{userSelected?.posto} {userSelected?.name}</Text>
            {"\n"}Esta ação não pode ser desfeita.
          </Text>
        </View>
      </CustomModal>

      <CustomModal
        isVisible={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        title={feedbackData.title}
        type={feedbackData.type === 'danger' ? 'danger' : 'default'}
        footer={
          <View style={{ width: '100%', alignItems: 'center' }}>
            <TouchableOpacity 
              style={[
                styles.btnSave, 
                { 
                  backgroundColor: feedbackData.type === 'danger' ? '#EF4444' : '#1E293B', 
                  width: '60%' 
                }
              ]} 
              onPress={() => setIsFeedbackModalOpen(false)}
            >
              <Text style={styles.btnSaveText}>OK</Text>
            </TouchableOpacity>
          </View>
        }
      >
        <View style={{ alignItems: 'center', paddingVertical: 15 }}>
          {feedbackData.type === 'success' ? (
            <CheckCircle2 size={50} color="#1E293B" />
          ) : (
            <AlertTriangle size={50} color="#EF4444" />
          )}
          <Text style={{ marginTop: 15, textAlign: 'center', color: '#64748B', fontSize: 16 }}>
            {feedbackData.message}
          </Text>
        </View>
      </CustomModal>
    </View>
  );
}