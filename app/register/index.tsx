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
  ActivityIndicator,
  Alert 
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react-native"; 
import { StatusBar } from "expo-status-bar";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setIsLoading(true);
    setError("");

    if (name === "" || email === "" || password === "") {
      setError("PREENCHA TODOS OS CAMPOS.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A SENHA DEVE TER PELO MENOS 6 CARACTERES.");
      setIsLoading(false);
      return;
    }

    try {
      // Simulação de sucesso
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert("Sucesso", "CONTA CRIADA COM SUCESSO!", [
          { text: "OK", onPress: () => router.push("/") }
        ]);
      }, 1500);
    } catch (err) {
      setError("ERRO AO CRIAR CONTA. TENTE NOVAMENTE.");
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
            
            {/* Header Azul Compacto (70px) - IDÊNTICO AO LOGIN */}
            <View style={styles.headerBlue}>
              <Image 
                source={require("../../assets/images/bg-profile.png")} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* Card Branco Compacto */}
            <View style={styles.card}>
              <View style={styles.textHeader}>
                <Text style={styles.title}>Nova Conta</Text>
                <Text style={styles.subtitle}>Crie seu acesso administrativo abaixo</Text>
              </View>

              <View style={styles.errorWrapper}>
                {error ? (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.form}>
                <Text style={styles.label}>NOME COMPLETO</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Ex: Cb. Silva"
                  placeholderTextColor="#94a3b8"
                  value={name}
                  onChangeText={setName}
                />

                <Text style={styles.label}>E-MAIL</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="E-mail institucional..."
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
                    placeholder="Crie uma senha..."
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

                <TouchableOpacity 
                  style={[styles.buttonMain, isLoading && styles.buttonDisabled]} 
                  onPress={handleRegister} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>CRIAR MINHA CONTA</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => router.back()}
                  style={styles.backButton}
                >
                  <ArrowLeft size={14} color="#3b82f6" style={{marginRight: 5}}/>
                  <Text style={styles.backButtonText}>Voltar ao Login</Text>
                </TouchableOpacity>
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
    height: 70, // Reduzido para 70px
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: { width: 50, height: 50 }, // Reduzido para 50px
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
    height: 45, // Ajustado para 45px
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
    height: 45, // Ajustado para 45px
    backgroundColor: "#f8fafc",
    marginBottom: 20,
  },
  inputInside: { flex: 1, paddingHorizontal: 12, fontSize: 14, color: "#1e293b" },
  eyeIcon: { paddingHorizontal: 12 },
  buttonMain: {
    backgroundColor: "#3b82f6",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#94a3b8" },
  buttonText: { color: "#fff", fontSize: 13, fontWeight: "bold" },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: { color: "#3b82f6", fontWeight: "bold", fontSize: 12 },
});