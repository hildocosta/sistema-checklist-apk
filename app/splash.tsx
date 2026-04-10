import React, { useEffect, useRef } from "react";
import { 
  Animated, 
  Image, 
  StyleSheet, 
  ImageBackground,
  Dimensions
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  
  
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    
    const exitTimer = setTimeout(() => {
      Animated.timing(logoTranslateY, {
        toValue: -40,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 2000);

    
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
      
      <Animated.View style={[
        styles.logoContainer,
        {
          opacity: logoOpacity,
          transform: [
            { scale: logoScale },
            { translateY: logoTranslateY }
          ]
        }
      ]}>
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
    backgroundColor: "#020617", 
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8, 
  },
  logo: {
    width: 200, 
    height: 200,
  },
});