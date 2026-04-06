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
  TouchableOpacity,
  Alert 
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { ArrowLeft } from "lucide-react-native"; 
import { StatusBar } from "expo-status-bar";

// Componentes Customizados
import { PrimaryButton } from "../../components/PrimaryButton"; 
import { CustomInput } from "../../components/CustomInput";

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
                <CustomInput 
                  label="NOME COMPLETO"
                  placeholder="Ex: Cb. Silva"
                  value={name}
                  onChangeText={setName}
                />

                <CustomInput 
                  label="E-MAIL"
                  placeholder="E-mail institucional..."
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <View style={{ marginBottom: 10 }}> 
                  <CustomInput 
                    label="SENHA"
                    placeholder="Crie uma senha..."
                    value={password}
                    onChangeText={setPassword}
                    isPassword
                  />
                </View>

                <PrimaryButton 
                  title="CRIAR MINHA CONTA"
                  onPress={handleRegister}
                  isLoading={isLoading}
                />

                
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
});