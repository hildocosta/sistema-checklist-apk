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
import { StatusBar } from "expo-status-bar";

// --- IMPORTAÇÃO DO CONTEXTO ---
import { useAuth } from "../context/AuthContext";

import { styles } from "./styles"; 
import { PrimaryButton } from "../components/PrimaryButton"; 
import { CustomInput } from "../components/CustomInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  
  // Puxamos a função de login real do seu contexto
  const { signIn } = useAuth();

  const handleLogin = async () => {
    // 1. Validação básica de campos vazios
    if (email === "" || password === "") {
      setError("POR FAVOR, PREENCHA TODOS OS CAMPOS.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      // 2. Chamada para a API da Vercel através do Contexto
      await signIn({
        email: email.toLowerCase().trim(),
        password: password
      });
      
      // O redirecionamento para o dashboard já acontece dentro do AuthContext.tsx 
      // se o status for 200.
      
    } catch (err: any) {
      // 3. Tratamento de erro caso a API retorne falha
      setError("E-MAIL OU SENHA INCORRETOS.");
      console.log("Erro no login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require("../assets/images/background-apk.png")}
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
                source={require("../assets/images/bg-profile.png")} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.card}>
              <View style={styles.textHeader}>
                <Text style={styles.title}>Acessar Sistema</Text>
                <Text style={styles.subtitle}>17º Batalhão de Polícia Militar</Text>
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
                  label="E-MAIL"
                  placeholder="exemplo@pm.pr.gov.br"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <CustomInput 
                  label="SENHA"
                  placeholder="Digite sua senha..."
                  value={password}
                  onChangeText={setPassword}
                  isPassword
                />

                <TouchableOpacity 
                  style={styles.forgotBtn}
                  onPress={() => router.push("/forgot-password")}
                >
                  <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <PrimaryButton 
                  title={isLoading ? "AUTENTICANDO..." : "ENTRAR NO SISTEMA"}
                  onPress={handleLogin}
                  isLoading={isLoading}
                />
                
                <View style={styles.divider} />

                <View style={styles.registerContainer}>
                  <Text style={styles.noAccountText}>Não tem uma conta? </Text>
                  <TouchableOpacity onPress={() => router.push("/register")}>
                    <Text style={styles.registerText}>Cadastre-se</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}