import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Platform,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { 
  User, Mail, Camera, Save, 
  Award, Building2, Phone, Hash 
} from "lucide-react-native";

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

  const updateField = (field: string, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

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
          {/* SEÇÃO DO AVATAR */}
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

          {/* CARDS DE INFORMAÇÃO */}
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
                  onChangeText={(v) => updateField("nome", v)}
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
                    onChangeText={(v) => updateField("posto", v)}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>RG (PMPR)</Text>
                <View style={[styles.inputWrapper, styles.lightInput]}>
                  <Hash size={16} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input}
                    value={user.re}
                    onChangeText={(v) => updateField("re", v)}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>UNIDADE</Text>
              <View style={styles.inputWrapper}>
                <Building2 size={18} color="#94a3b8" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input}
                  value={user.unidade}
                  onChangeText={(v) => updateField("unidade", v)}
                />
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Phone size={16} color="#3b82f6" />
              <Text style={styles.cardTitle}>CONTATO E SETOR</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-MAIL INSTITUCIONAL</Text>
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
              <Text style={styles.label}>TELEFONE / WHATSAPP</Text>
              <View style={styles.inputWrapper}>
                <Phone size={18} color="#94a3b8" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input}
                  value={user.telefone}
                  keyboardType="phone-pad"
                  onChangeText={(v) => updateField("telefone", v)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* BOTÃO SALVAR - POSICIONAMENTO IDÊNTICO AO CHECKLIST */}
      <View style={styles.footerAction}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.saveButton}
          onPress={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 2000);
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },

  // AJUSTE DE VÁCUO: paddingBottom suficiente para o conteúdo não ficar atrás do botão
  scrollContent: { 
    padding: 15,
    paddingBottom: 120 
  },

  avatarSection: { alignItems: 'center', marginVertical: 20 },
  avatarContainer: { position: 'relative', marginBottom: 15 },
  avatarCircle: { 
    width: 110, height: 110, borderRadius: 30, backgroundColor: '#fff', 
    alignItems: 'center', justifyContent: 'center',
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10,
    borderWidth: 4, borderColor: '#fff'
  },
  avatarImg: { width: '100%', height: '100%', borderRadius: 26 },
  cameraBtn: { 
    position: 'absolute', bottom: -5, right: -5, 
    backgroundColor: '#3B82F6', width: 36, height: 36, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#F8FAFC'
  },
  userName: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  userTag: { fontSize: 12, fontWeight: '700', color: '#3B82F6', marginTop: 2, textTransform: 'uppercase' },

  card: { 
    backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 15,
    elevation: 3, shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8
  },
  cardHeader: { 
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15, 
    borderBottomWidth: 1, borderBottomColor: '#F8FAFC', paddingBottom: 10 
  },
  cardTitle: { fontSize: 11, fontWeight: '900', color: '#64748B', letterSpacing: 1 },

  inputGroup: { marginBottom: 15 },
  label: { fontSize: 10, fontWeight: '800', color: '#94A3B8', marginBottom: 6, marginLeft: 2 },
  
  inputWrapper: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', 
    borderRadius: 12, paddingHorizontal: 12, height: 48, borderWidth: 1, borderColor: '#E2E8F0'
  },
  lightInput: { backgroundColor: '#F8FAFC' },
  disabledInput: { backgroundColor: '#F8FAFC', borderColor: '#F1F5F9' },
  
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#1E293B', fontWeight: '600' },
  row: { flexDirection: 'row', gap: 12 },

  footerAction: { 
    position: 'absolute', 
    bottom: 0, left: 0, right: 0, 
    paddingHorizontal: 50,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'android' ? 60 : 40, 
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  saveButton: { 
    height: 42,               
    borderRadius: 10, 
    backgroundColor: '#020617', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  saveButtonText: { 
    color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 0.5 
  }
});