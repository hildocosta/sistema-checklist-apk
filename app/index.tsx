import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ImageBackground,
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Componentes Customizados
import { PrimaryButton } from "../components/PrimaryButton"; 
import { CustomInput } from "../components/CustomInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      if (email === "" || password === "") {
        setError("E-MAIL OU SENHA INVÁLIDOS.");
        setIsLoading(false);
        return;
      }
      
      setTimeout(() => {
        setIsLoading(false);
        router.replace("/(tabs)");
      }, 1500);
    } catch (err) {
      setError("ERRO DE CONEXÃO COM O SERVIDOR.");
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
                <Text style={styles.subtitle}>Identifique-se para continuar</Text>
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
                  placeholder="Digite seu e-mail..."
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
                  title="ENTRAR NO SISTEMA"
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

const styles = StyleSheet.create({
  backgroundContainer: { flex: 1, backgroundColor: "#0f172a" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 20 },
  cardContainer: { 
    width: "100%",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerBlue: {
    backgroundColor: "#3b82f6",
    height: 70,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: { width: 50, height: 50 },
  card: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
    marginTop: -1, 
  },
  textHeader: { alignItems: "center", marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#1e293b" },
  subtitle: { fontSize: 11, color: "#64748b", marginTop: 2, textAlign: "center" },
  errorWrapper: { height: 40, justifyContent: "center" },
  errorBox: {
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: { color: "#b91c1c", fontSize: 10, fontWeight: "bold", textAlign: "center" },
  form: { width: "100%" },
  forgotBtn: { alignSelf: "flex-end", marginBottom: 20 },
  forgotText: { color: "#3b82f6", fontWeight: "bold", fontSize: 11 },
  
  
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    width: "100%",
    marginVertical: 20,
  },

  registerContainer: { 
    flexDirection: "row", 
    justifyContent: "center",
    
  },
  noAccountText: { color: "#64748b", fontSize: 12 },
  registerText: { color: "#3b82f6", fontWeight: "bold", fontSize: 12 },
});