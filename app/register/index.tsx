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
import { useRouter } from "expo-router";
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

    if (password.length < 6) {
      setError("A SENHA DEVE TER PELO MENOS 6 CARACTERES.");
      setIsLoading(false);
      return;
    }

    try {
      // Aqui você substituiria pela sua URL real de API
      // const response = await fetch("SUA_API/auth/register", { ... });
      
      // Simulação de sucesso
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert("Sucesso", "CONTA CRIADA COM SUCESSO!", [
          { text: "OK", onPress: () => router.push("/") }
        ]);
      }, 2000);

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
          <View style={styles.mainContent}>
            
            <View style={styles.cardContainer}>
              {/* Header Azul */}
              <View style={styles.headerBlue}>
                <Image 
                  source={require("../../assets/images/bg-profile.png")} 
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>

              {/* Card Branco */}
              <View style={styles.card}>
                <View style={styles.textHeader}>
                  <Text style={styles.title}>Nova Conta</Text>
                  <Text style={styles.subtitle}>Crie seu acesso administrativo abaixo</Text>
                </View>

                {/* Container de Erro */}
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
                      placeholder="Crie uma senha segura..."
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
                    <ArrowLeft size={16} color="#3b82f6" style={{marginRight: 5}}/>
                    <Text style={styles.backButtonText}>Voltar ao Login</Text>
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
  scrollContainer: { flexGrow: 1 },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    paddingTop: 60
  },
  cardContainer: { 
    width: "100%",
    maxWidth: 420,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  headerBlue: {
    backgroundColor: "#3b82f6",
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: { width: 65, height: 65 },
  card: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: -1,
  },
  textHeader: { alignItems: "center", marginBottom: 5 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1e293b" },
  subtitle: { fontSize: 12, color: "#64748b", marginTop: 4, textAlign: "center" },
  errorWrapper: { height: 45, justifyContent: "center", marginVertical: 10 },
  errorBox: {
    backgroundColor: "#fef2f2",
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: { color: "#b91c1c", fontSize: 11, fontWeight: "bold", textAlign: "center" },
  form: { width: "100%" },
  label: { fontSize: 11, fontWeight: "bold", color: "#475569", marginBottom: 8, marginLeft: 4 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 16,
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
    borderRadius: 12,
    height: 50,
    backgroundColor: "#f8fafc",
    marginBottom: 25,
  },
  inputInside: { flex: 1, paddingHorizontal: 16, fontSize: 14, color: "#1e293b" },
  eyeIcon: { paddingHorizontal: 15 },
  buttonMain: {
    backgroundColor: "#3b82f6",
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  buttonDisabled: { backgroundColor: "#94a3b8" },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "bold", letterSpacing: 0.5 },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  backButtonText: { color: "#3b82f6", fontWeight: "bold", fontSize: 13 },
  footer: { marginTop: 30, alignItems: 'center', marginBottom: 20 },
  footerText: { color: '#cbd5e1', fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5, opacity: 0.7 }
});