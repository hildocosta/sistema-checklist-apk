import React, { useState } from "react";
import { 
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
import { ArrowLeft, MailCheck } from "lucide-react-native"; 
import { StatusBar } from "expo-status-bar";

// Importação dos estilos
import { styles } from "./styles";

// Componentes Customizados
import { PrimaryButton } from "../../components/PrimaryButton"; 
import { CustomInput } from "../../components/CustomInput";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleResetRequest = async () => {
    setIsLoading(true);
    setError("");

    if (email === "") {
      setError("POR FAVOR, INFORME SEU E-MAIL.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (email.includes("@pm.pr.gov.br")) {
        setIsLoading(false);
        setIsSubmitted(true);
      } else {
        setError("E-MAIL NÃO ENCONTRADO OU INVÁLIDO.");
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
                <View>
                  <View style={styles.textHeader}>
                    <Text style={styles.title}>Recuperar Senha</Text>
                    <Text style={styles.subtitle}>O link de redefinição será enviado ao seu e-mail</Text>
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
                      label="E-MAIL INSTITUCIONAL"
                      placeholder="seu.nome@pm.pr.gov.br"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />

                    <View style={{ marginTop: 15 }}>
                      <PrimaryButton 
                        title={isLoading ? "ENVIANDO..." : "SOLICITAR REDEFINIÇÃO"}
                        onPress={handleResetRequest}
                        isLoading={isLoading}
                      />
                    </View>
                    
                    <View style={styles.divider} />

                    {/* AJUSTADO: Usando registerContainer e registerText que já existem no seu styles */}
                    <TouchableOpacity 
                      onPress={() => router.back()}
                      style={styles.registerContainer} 
                    >
                      <ArrowLeft size={16} color="#3b82f6" style={{marginRight: 8}}/>
                      <Text style={styles.registerText}>Voltar ao Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                  <View style={{ 
                    backgroundColor: '#f0fdf4', 
                    padding: 20, 
                    borderRadius: 100, 
                    marginBottom: 20,
                  }}>
                    <MailCheck color="#22c55e" size={45} />
                  </View>
                  
                  <Text style={styles.title}>Verifique seu E-mail</Text>
                  <Text style={[styles.subtitle, { marginBottom: 30, textAlign: 'center' }]}>
                    Enviamos as instruções para:{"\n"}
                    <Text style={{fontWeight: 'bold', color: '#1e293b'}}>{email}</Text>
                  </Text>

                  <PrimaryButton 
                    title="IR PARA O LOGIN"
                    onPress={() => router.replace("/")} 
                  />

                  <TouchableOpacity 
                    onPress={() => setIsSubmitted(false)}
                    style={{ marginTop: 25 }}
                  >
                    {/* AJUSTADO: Usando registerText que já existe */}
                    <Text style={[styles.registerText, { textDecorationLine: 'underline' }]}>
                      Tentar outro e-mail
                    </Text>
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