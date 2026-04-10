import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, TextInput, Image, 
  ScrollView, Platform, StatusBar, KeyboardAvoidingView
} from "react-native";
import { 
  User, Mail, Camera, Save, 
  Award, Building2, Phone, Hash 
} from "lucide-react-native";
import { styles } from "./styles";

export default function ProfilePage() {
  const [user, setUser] = useState({
    nome: "Cb. Silva",
    email: "silva.militar@pm.pr.gov.br",
    posto: "CABO",
    re: "123.456-7",
    setor: "PATRULHA RURAL",
    unidade: "17º BPM",
    telefone: "(41) 98888-8888",
    image: null
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER ESCURO IGUAL TELA USUÁRIOS */}
          <View style={styles.headerBackground}>
            <Text style={styles.headerTitle}>Meu Perfil</Text>
            <Text style={styles.headerSubtitle}>Dados Cadastrais</Text>
          </View>

          {/* SEÇÃO DO AVATAR FLUTUANTE */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                {user.image ? (
                  <Image source={{ uri: user.image }} style={styles.avatarImg} />
                ) : (
                  <User size={50} color="#cbd5e1" />
                )}
              </View>
              <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
                <Camera size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.userName}>{user.nome}</Text>
            <Text style={styles.userTag}>{user.posto} • RG {user.re}</Text>
          </View>

          {/* CONTAINER DE CARDS */}
          <View style={styles.cardsContainer}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Award size={16} color="#3b82f6" />
                <Text style={styles.cardTitle}>DADOS PROFISSIONAIS</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>NOME COMPLETO</Text>
                <View style={styles.inputWrapper}>
                  <User size={18} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    value={user.nome}
                    onChangeText={(v) => setUser({...user, nome: v})}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1.2 }]}>
                  <Text style={styles.label}>POSTO/GRAD</Text>
                  <View style={[styles.inputWrapper, styles.lightInput]}>
                    <Award size={16} color="#94a3b8" style={styles.inputIcon} />
                    <TextInput 
                      style={styles.input}
                      value={user.posto}
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>RG</Text>
                  <View style={[styles.inputWrapper, styles.lightInput]}>
                    <Hash size={16} color="#94a3b8" style={styles.inputIcon} />
                    <TextInput 
                      style={styles.input}
                      value={user.re}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>UNIDADE / LOTAÇÃO</Text>
                <View style={styles.inputWrapper}>
                  <Building2 size={18} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    value={user.unidade}
                  />
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Phone size={16} color="#3b82f6" />
                <Text style={styles.cardTitle}>CONTATO INSTITUCIONAL</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-MAIL</Text>
                <View style={[styles.inputWrapper, styles.disabledInput]}>
                  <Mail size={18} color="#cbd5e1" style={styles.inputIcon} />
                  <TextInput 
                    style={[styles.input, { color: '#94a3b8' }]}
                    value={user.email}
                    editable={false}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>TELEFONE</Text>
                <View style={styles.inputWrapper}>
                  <Phone size={18} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    value={user.telefone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* FOOTER FIXO */}
      <View style={styles.footerAction}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.saveButton}
          onPress={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1500);
          }}
        >
          <Save size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.saveButtonText}>
            {isLoading ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}