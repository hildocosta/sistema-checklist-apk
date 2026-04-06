import { useEffect } from 'react';
import { Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export { ErrorBoundary } from 'expo-router';

// CONFIGURAÇÃO SÊNIOR: O App agora tenta iniciar pela rota 'splash'
export const unstable_settings = {
  initialRouteName: 'splash',
};

// Mantém a Splash Nativa (app.json) até chamarmos o hide
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      // Escondemos a splash nativa assim que o JS carregou. 
      // A partir daqui, a sua tela 'app/splash.tsx' assume o controle visual.
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* StatusBar clara para o fundo azul escuro do 17BPM */}
      <StatusBar style="light" />

      <Stack screenOptions={{ headerShown: false }}>
        {/* NOVA TELA DE SPLASH ANIMADA */}
        <Stack.Screen name="splash" />

        {/* LOGIN (index) */}
        <Stack.Screen name="index" />

        {/* REGISTRO */}
        <Stack.Screen name="register/index" />

        {/* ESQUECI A SENHA */}
        <Stack.Screen name="forgot-password/index" />

        {/* GRUPO DE ABAS INTERNAS */}
        <Stack.Screen name="(tabs)" />
        
        {/* MODAIS (Configuração nativa iOS/Android) */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal',
            headerShown: Platform.OS === 'ios'
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}