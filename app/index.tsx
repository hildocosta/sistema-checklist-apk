import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ImageBackground,
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  ActivityIndicator 
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native"; 
import { StatusBar } from "expo-status-bar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
            
            {/* Header Azul Compacto (70px) */}
            <View style={styles.headerBlue}>
              <Image 
                source={require("../assets/images/bg-profile.png")} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* Card de Formulário */}
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
                <Text style={styles.label}>E-MAIL</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Digite seu e-mail..."
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.label}>SENHA</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput 
                    style={styles.inputInside}
                    placeholder="Digite sua senha..."
                    placeholderTextColor="#94a3b8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    {showPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
                  </TouchableOpacity>
                </View>

                {/* NAVEGAÇÃO PARA ESQUECEU SENHA */}
                <TouchableOpacity 
                  style={styles.forgotBtn}
                  onPress={() => router.push("/forgot-password")}
                >
                  <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.buttonMain, isLoading && styles.buttonDisabled]} 
                  onPress={handleLogin} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>ENTRAR NO SISTEMA</Text>
                  )}
                </TouchableOpacity>

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
  label: { fontSize: 10, fontWeight: "bold", color: "#475569", marginBottom: 4, marginLeft: 2 },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 14,
    color: "#1e293b",
    backgroundColor: "#f8fafc"
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    height: 45,
    backgroundColor: "#f8fafc",
  },
  inputInside: { flex: 1, paddingHorizontal: 12, fontSize: 14, color: "#1e293b" },
  eyeIcon: { paddingHorizontal: 12 },
  forgotBtn: { alignSelf: "flex-end", marginVertical: 12 },
  forgotText: { color: "#3b82f6", fontWeight: "bold", fontSize: 11 },
  buttonMain: {
    backgroundColor: "#3b82f6",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#94a3b8" },
  buttonText: { color: "#fff", fontSize: 13, fontWeight: "bold" },
  registerContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  noAccountText: { color: "#64748b", fontSize: 12 },
  registerText: { color: "#3b82f6", fontWeight: "bold", fontSize: 12 },
});