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

// Importação dos estilos
import { styles } from "./styles";

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