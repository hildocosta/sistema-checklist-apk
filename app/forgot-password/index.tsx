import React, { useState } from "react";
import { 
  StyleSheet, View, Text, TextInput, TouchableOpacity, 
  Image, ImageBackground, KeyboardAvoidingView, Platform, 
  ScrollView, ActivityIndicator 
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { ArrowLeft } from "lucide-react-native"; 
import { StatusBar } from "expo-status-bar";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleResetRequest = async () => {
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (email.includes("@")) {
        setIsSubmitted(true);
        setIsLoading(false);
      } else {
        setError("E-MAIL NÃO ENCONTRADO EM NOSSA BASE.");
        setIsLoading(false);
      }
    }, 1500);
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
            
            {/* Header Azul Compacto (70px) - PADRÃO LOGIN */}
            <View style={styles.headerBlue}>
              <Image 
                source={require("../../assets/images/bg-profile.png")} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.card}>
              {!isSubmitted ? (
                /* ESTADO 1: FORMULÁRIO */
                <View>
                  <View style={styles.textHeader}>
                    <Text style={styles.title}>Recuperar Acesso</Text>
                    <Text style={styles.subtitle}>Identifique-se para receber as instruções</Text>
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

                    <TouchableOpacity 
                      style={[styles.buttonMain, isLoading && styles.buttonDisabled]} 
                      onPress={handleResetRequest} 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.buttonText}>ENVIAR INSTRUÇÕES</Text>
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
              ) : (
                /* ESTADO 2: SUCESSO (Mantendo o padrão compacto) */
                <View style={styles.successContainer}>
                  <View style={styles.textHeader}>
                    <Text style={[styles.title, { color: '#22c55e' }]}>Link Enviado!</Text>
                    <Text style={styles.subtitle}>Verifique sua caixa de entrada em:</Text>
                    <Text style={styles.emailHighlight}>{email}</Text>
                  </View>
                  
                  <View style={styles.infoBox}>
                    <Text style={styles.infoBoxText}>Não recebeu? Verifique sua pasta de Spam ou aguarde 5 minutos.</Text>
                  </View>

                  <TouchableOpacity 
                    style={styles.buttonMain} 
                    onPress={() => router.replace("/")}
                  >
                    <Text style={styles.buttonText}>VOLTAR PARA O LOGIN</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => setIsSubmitted(false)}
                    style={styles.tryAgainBtn}
                  >
                    <Text style={styles.tryAgainText}>TENTAR OUTRO E-MAIL</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

                    
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: { flex: 1, backgroundColor: "#0f172a" },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  cardContainer: { 
    width: "100%", 
    elevation: 10, 
    shadowColor: "#000", 
    shadowOpacity: 0.3, 
    shadowRadius: 10 
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
  subtitle: { fontSize: 11, color: "#64748b", textAlign: 'center', marginTop: 2 },
  
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
    marginBottom: 15,
    fontSize: 14,
    color: "#1e293b",
    backgroundColor: "#f8fafc"
  },
  buttonMain: {
    backgroundColor: "#3b82f6",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
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

  /* Estilos do Sucesso */
  successContainer: { alignItems: 'center', paddingTop: 10 },
  emailHighlight: { color: '#1e293b', fontWeight: 'bold', fontSize: 12, marginTop: 5 },
  infoBox: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginVertical: 20
  },
  infoBoxText: { fontSize: 10, color: '#94a3b8', textAlign: 'center', lineHeight: 14 },
  tryAgainBtn: { marginTop: 20 },
  tryAgainText: { fontSize: 11, fontWeight: 'bold', color: '#94a3b8', letterSpacing: 0.5 },

  footerBrand: { marginTop: 25, alignItems: 'center' },
  footerBrandText: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 }
});