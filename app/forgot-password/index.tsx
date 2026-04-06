import React, { useState } from "react";
import { 
  StyleSheet, View, Text, Image, ImageBackground, 
  KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity 
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { ArrowLeft } from "lucide-react-native"; 
import { StatusBar } from "expo-status-bar";

// Componentes Customizados
import { PrimaryButton } from "../../components/PrimaryButton"; 
import { CustomInput } from "../../components/CustomInput";

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
                    <CustomInput 
                      label="E-MAIL"
                      placeholder="Digite seu e-mail..."
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />

                    <View style={{ marginTop: 10 }}>
                      <PrimaryButton 
                        title="ENVIAR INSTRUÇÕES"
                        onPress={handleResetRequest}
                        isLoading={isLoading}
                      />
                    </View>

                    
                    <View style={styles.divider} />

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
                /* ESTADO 2: SUCESSO */
                <View style={styles.successContainer}>
                  <View style={styles.textHeader}>
                    <Text style={[styles.title, { color: '#22c55e' }]}>Link Enviado!</Text>
                    <Text style={styles.subtitle}>Verifique sua caixa de entrada em:</Text>
                    <Text style={styles.emailHighlight}>{email}</Text>
                  </View>
                  
                  <View style={styles.infoBox}>
                    <Text style={styles.infoBoxText}>Não recebeu? Verifique sua pasta de Spam ou aguarde 5 minutos.</Text>
                  </View>

                  <PrimaryButton 
                    title="VOLTAR PARA O LOGIN"
                    onPress={() => router.replace("/")}
                  />

                  
                  <View style={styles.divider} />

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
  
  
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    width: "100%",
    marginVertical: 20,
  },

  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: { color: "#3b82f6", fontWeight: "bold", fontSize: 12 },
  successContainer: { alignItems: 'center', paddingTop: 10, width: '100%' },
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
  tryAgainBtn: { 
    
  },
  tryAgainText: { fontSize: 11, fontWeight: 'bold', color: '#94a3b8', letterSpacing: 0.5 },
});