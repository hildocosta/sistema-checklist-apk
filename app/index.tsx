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
import { useRouter } from "expo-router";
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
      
      // Simulação de autenticação
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
      source={require("../assets/images/background-apk.png")} // Sua imagem de fundo tecnológica
      style={styles.backgroundContainer}
      resizeMode="cover"
    >
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
            
            {/* Header Azul (Identidade 17º BPM) */}
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
                <Text style={styles.subtitle}>Entre com seu e-mail e senha para continuar</Text>
              </View>

              {/* Espaço fixo para o erro (evita que a tela pule/estique) */}
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
                    {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.forgotBtn}>
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
                  <TouchableOpacity>
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
  backgroundContainer: { 
    flex: 1, 
    backgroundColor: "#0f172a" 
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: "center", 
    padding: 25 
  },
  cardContainer: { 
    width: "100%",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  headerBlue: {
    backgroundColor: "#3b82f6",
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  logoImage: { 
    width: 65, 
    height: 65 
  },
  card: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 35,
    marginTop: -1, 
    zIndex: 1,
  },
  textHeader: { 
    alignItems: "center", 
    marginBottom: 10 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#1e293b" 
  },
  subtitle: { 
    fontSize: 12, 
    color: "#64748b", 
    marginTop: 4,
    textAlign: "center" 
  },
  errorWrapper: {
    height: 45, // Reserva o espaço para o erro não empurrar os campos
    justifyContent: "center",
    marginVertical: 5,
  },
  errorBox: {
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: { 
    color: "#b91c1c", 
    fontSize: 11, 
    fontWeight: "bold", 
    textAlign: "center" 
  },
  form: { width: "100%" },
  label: { 
    fontSize: 11, 
    fontWeight: "bold", 
    color: "#475569", 
    marginBottom: 6,
    marginLeft: 2
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
    color: "#1e293b",
    backgroundColor: "#f8fafc"
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    height: 48,
    backgroundColor: "#f8fafc",
    marginBottom: 5,
  },
  inputInside: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#1e293b",
  },
  eyeIcon: { paddingHorizontal: 12 },
  forgotBtn: { 
    alignSelf: "flex-end", 
    marginBottom: 25 
  },
  forgotText: { 
    color: "#3b82f6", 
    fontWeight: "bold", 
    fontSize: 12 
  },
  buttonMain: {
    backgroundColor: "#3b82f6",
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "bold", 
    letterSpacing: 0.5
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  noAccountText: { color: "#64748b", fontSize: 12 },
  registerText: { 
    color: "#3b82f6", 
    fontWeight: "bold", 
    fontSize: 12 
  },
  footer: {
    marginTop: 20,
    alignItems: 'center'
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1
  }
});