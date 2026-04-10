import React, { useState } from "react";
import { 
  View, Text, ScrollView, TextInput, TouchableOpacity, 
  SafeAreaView, StatusBar, Alert, ActivityIndicator 
} from "react-native";
import { 
  Shield, UserPlus, PackagePlus, User, Hash, 
  Mail, KeyRound, Save, Archive, ChevronDown, Building2 
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from "./styles";

export default function CadastrarScreen() {
  const [abaAtiva, setAbaAtiva] = useState("militar");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  
  const [form, setForm] = useState({
    nome: "", re: "", posto: "Sd. QP PM", email: "", 
    categoria: "armamento", descricao: "", pmpr: ""
  });

  const handleSalvar = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", `${abaAtiva === 'militar' ? 'Militar' : 'Item'} cadastrado com sucesso!`);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      
     
      <View style={styles.headerBackground}>
        <SafeAreaView>
          <Text style={styles.headerTitle}>Gestão de Entradas</Text>
          <Text style={styles.headerSubtitle}>17º Batalhão de Polícia Militar</Text>
        </SafeAreaView>
      </View>

      
      <View style={styles.filterSection}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            onPress={() => setAbaAtiva("militar")}
            style={[styles.tab, abaAtiva === "militar" && styles.tabActive]}
          >
            <UserPlus size={16} color={abaAtiva === "militar" ? "#fff" : "#64748B"} />
            <Text style={[styles.tabText, abaAtiva === "militar" && styles.tabTextActive]}>Militar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setAbaAtiva("item")}
            style={[styles.tab, abaAtiva === "item" && styles.tabActive]}
          >
            <PackagePlus size={16} color={abaAtiva === "item" ? "#fff" : "#64748B"} />
            <Text style={[styles.tabText, abaAtiva === "item" && styles.tabTextActive]}>Novo Item</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            {abaAtiva === "militar" ? (
              <>
                <Shield size={18} color="#3B82F6" />
                <Text style={styles.sectionTitle}>Credenciamento de Usuário</Text>
              </>
            ) : (
              <>
                <Archive size={18} color="#10B981" />
                <Text style={styles.sectionTitle}>Inclusão de Material</Text>
              </>
            )}
          </View>

          
          {abaAtiva === "militar" ? (
            <View>
              <InputGroup label="Nome Completo" icon={User} placeholder="Ex: Anderson Silva" />
              <InputGroup label="RG" icon={Hash} placeholder="000.000-0" />
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Posto/Graduação</Text>
                <TouchableOpacity style={[styles.inputContainer, styles.pickerButton]}>
                  <Text style={styles.input}>Sd. QP PM</Text>
                  <ChevronDown size={18} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <InputGroup label="E-mail Institucional" icon={Mail} placeholder="militar@pm.pr.gov.br" />
              <InputGroup label="Senha de Acesso" icon={KeyRound} placeholder="Mínimo 6 dígitos" secureTextEntry />
            </View>
          ) : (
            <View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Categoria</Text>
                <TouchableOpacity style={[styles.inputContainer, styles.pickerButton]}>
                  <Text style={styles.input}>Armamento</Text>
                  <ChevronDown size={18} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <InputGroup label="Descrição" icon={Archive} placeholder="Ex: Pistola Beretta APX 9mm" />
              <InputGroup label="Nº PMPR" icon={Hash} placeholder="P00XXX" />
              <InputGroup label="Nº de Série" icon={Shield} placeholder="Série do Fabricante" />
              <InputGroup label="Quantidade" icon={PackagePlus} placeholder="1" keyboardType="numeric" />
            </View>
          )}
        </View>
      </ScrollView>

      
      <View style={[
        styles.footerAction, 
        { paddingBottom: insets.bottom > 0 ? insets.bottom : 15 }
      ]}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={[styles.btnSalvar, abaAtiva === "item" && { backgroundColor: '#059669' }]}
          onPress={handleSalvar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Save size={20} color="#fff" />
              <Text style={styles.btnSalvarText}>CONCLUIR CADASTRO</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}


function InputGroup({ label, icon: Icon, ...props }: any) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Icon size={18} color="#94A3B8" style={styles.inputIcon} />
        <TextInput 
          style={styles.input} 
          placeholderTextColor="#CBD5E1"
          {...props} 
        />
      </View>
    </View>
  );
}