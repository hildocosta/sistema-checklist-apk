import React, { useEffect, useRef } from "react";
import { 
  Animated, 
  Image, 
  StyleSheet, 
  ImageBackground 
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function SplashScreen() {
  const router = useRouter();
  
  // Valores de animação
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoTranslateY = useRef(new Animated.Value(0)).current; // Novo: para subir o logo no final

  useEffect(() => {
    // 1. Animação de ENTRADA
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Lógica de SAÍDA (Aos 2.1 segundos, o logo sobe um pouco antes de trocar de tela)
    const exitTimer = setTimeout(() => {
      Animated.timing(logoTranslateY, {
        toValue: -50, // Sobe o logo suavemente
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 2100);

    const navigationTimer = setTimeout(() => {
      router.replace("/"); 
    }, 2500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(navigationTimer);
    };
  }, []);

  return (
    <ImageBackground 
      source={require("../assets/images/background-apk.png")} 
      style={styles.container}
      resizeMode="cover"
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      
      <Animated.View style={{
        opacity: logoOpacity,
        transform: [
          { scale: logoScale },
          { translateY: logoTranslateY } // Aplicando o movimento de subida
        ],
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image
          source={require("../assets/images/bg-profile.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180, 
    height: 180,
  },
});