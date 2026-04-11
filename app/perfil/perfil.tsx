import React, { useState, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, TextInput, Image, 
  ScrollView, Platform, StatusBar, KeyboardAvoidingView, Alert, ActivityIndicator 
} from "react-native";
import { 
  User, Mail, Camera, Save, 
  Award, Building2, Phone, Hash, MapPin 
} from "lucide-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from "../../context/AuthContext";
import ProfileSkeleton from "../../components/ProfileSkeleton"; 
import api from "../../service/api";
import { styles } from "./styles";

export default function ProfilePage() {
  const { user, setUser, loading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [re, setRe] = useState("");
  const [posto, setPosto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [setor, setSetor] = useState("");
  const [unidade, setUnidade] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      const userData = user?.user || user;
      setName(userData.name || "");
      setRe(userData.re || "");
      setPosto(userData.posto || "Sd. QP PM");
      setTelefone(userData.telefone || "");
      setEmail(userData.email || "");
      setSetor(userData.setor || "");
      setUnidade(userData.unidade || "17º BPM");
      setImage(userData.image || "");
    }
  }, [user]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permissão necessária", "Precisamos de acesso à sua galeria para alterar a foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true, 
    });

    if (!result.canceled) {
      
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(base64Image);
    }
  };

  const handleSave = async () => {
    if (!name || !re) {
      Alert.alert("Erro", "Nome e RG são campos obrigatórios.");
      return;
    }
    setIsSaving(true);
    try {
      const userData = user?.user || user;
      
      
      const response = await api.post("/mobile/update-profile", {
        id: userData.id,
        name, 
        re, 
        posto, 
        telefone, 
        email, 
        setor, 
        unidade,
        image 
      });

      if (response.status === 200) {
        const updatedData = { ...userData, name, re, posto, telefone, email, setor, unidade, image };
        setUser(updatedData);
        await AsyncStorage.setItem('@BPM17:user', JSON.stringify(updatedData));
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      }
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 }]} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerBackground}>
            <Text style={styles.headerTitle}>Meu Perfil</Text>
            <Text style={styles.headerSubtitle}>Gerenciar Dados Militares</Text>
          </View>

          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.avatarImg} />
                ) : (
                  <User size={50} color="#cbd5e1" />
                )}
              </View>
              <TouchableOpacity 
                style={styles.cameraBtn} 
                activeOpacity={0.8}
                onPress={pickImage}
              >
                <Camera size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{name || "Militar"}</Text>
            <Text style={styles.userTag}>{posto} • RG {re || "---"}</Text>
          </View>

          <View style={styles.cardsContainer}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Award size={16} color="#3b82f6" />
                <Text style={styles.cardTitle}>IDENTIFICAÇÃO PROFISSIONAL</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>NOME COMPLETO</Text>
                <View style={styles.inputWrapper}>
                  <User size={18} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput style={styles.input} value={name} onChangeText={setName} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>RG</Text>
                <View style={[styles.inputWrapper, { borderColor: '#e2e8f0' }]}>
                  <Hash size={18} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    value={re} 
                    onChangeText={setRe} 
                    keyboardType="numeric" 
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>POSTO/GRAD</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput 
                      style={[styles.input, { paddingLeft: 12 }]} 
                      value={posto} 
                      onChangeText={setPosto}
                      placeholder="Posto"
                      numberOfLines={1}
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                  <Text style={styles.label}>SETOR</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput 
                      style={[styles.input, { paddingLeft: 12 }]} 
                      value={setor} 
                      onChangeText={setSetor} 
                      placeholder="Setor"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>UNIDADE / BPM</Text>
                <View style={styles.inputWrapper}>
                  <Building2 size={18} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    value={unidade} 
                    onChangeText={setUnidade} 
                    placeholder="Ex: 17º BPM"
                  />
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Phone size={16} color="#3b82f6" />
                <Text style={styles.cardTitle}>CONTATO E ACESSO</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-MAIL INSTITUCIONAL</Text>
                <View style={styles.inputWrapper}>
                  <Mail size={18} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>TELEFONE / WHATSAPP</Text>
                <View style={styles.inputWrapper}>
                  <Phone size={18} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
                </View>
              </View>
            </View>
          </View>

          <View style={{ height: 80 }} /> 
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footerAction}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={[styles.saveButton, isSaving && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
          ) : (
            <Save size={18} color="#fff" style={{ marginRight: 8 }} />
          )}
          <Text style={styles.saveButtonText}>
            {isSaving ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}