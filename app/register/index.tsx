import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  ImageBackground,
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  TouchableOpacity,
  Alert 
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { ArrowLeft } from "lucide-react-native"; 
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";
import { PrimaryButton } from "../../components/PrimaryButton"; 
import { CustomInput } from "../../components/CustomInput";
import api from "../../service/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setIsLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("PREENCHA NOME, E-MAIL E SENHA.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A SENHA DEVE TER NO MÍNIMO 6 CARACTERES.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name: name,
        email: email.toLowerCase().trim(),
        password: password
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Sucesso", "CONTA CRIADA! COMPLETE SEU PERFIL APÓS O LOGIN.", [
          { text: "IR PARA LOGIN", onPress: () => router.replace("/") }
        ]);
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || "ERRO AO CONECTAR COM O SERVIDOR.";
      setError(msg.toUpperCase());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require("../../assets/images/background-apk.png")} 
      style={styles.backgroundContainer}
      resizeMode="cover"
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardContainer}>
            <View style={styles.headerBlue}>
              <Image 
                source={require("../../assets/images/bg-profile.png")} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.card}>
              <View style={styles.textHeader}>
                <Text style={styles.title}>Nova Conta</Text>
                <Text style={styles.subtitle}>Cadastro Rápido - 17º BPM</Text>
              </View>

              <View style={styles.errorWrapper}>
                {error ? (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.form}>
                <CustomInput 
                  label="NOME COMPLETO"
                  placeholder="Ex: Cb. João Silva"
                  value={name}
                  onChangeText={setName}
                />

                <CustomInput 
                  label="E-MAIL INSTITUCIONAL"
                  placeholder="seu-email@pm.pr.gov.br"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <CustomInput 
                  label="SENHA"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChangeText={setPassword}
                  isPassword
                />

                <View style={{ marginTop: 5 }}>
                  <PrimaryButton 
                    title={isLoading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
                    onPress={handleRegister}
                    isLoading={isLoading}
                  />
                </View>
                
                <View style={styles.divider} />

                <TouchableOpacity 
                  onPress={() => router.back()}
                  style={styles.backButton}
                >
                  <ArrowLeft size={14} color="#3b82f6" style={{marginRight: 5}}/>
                  <Text style={styles.backButtonText}>Já sou cadastrado. Login.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}