import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  BarChart3, 
  Users, 
  Power,
  UserCircle,
  UserPlus
} from 'lucide-react-native';

import { useColorScheme } from '@/components/useColorScheme';

const LogoBpm = require('../assets/images/bg-profile.png'); 

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index', 
};

SplashScreen.preventAutoHideAsync();

function CustomDrawerContent(props: any) {
  const router = useRouter();
  
  return (
    <View style={{ flex: 1, backgroundColor: '#020617' }}>
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 50 }}
      >
        <View style={styles.centralizer}>
          
          {/* CABEÇALHO */}
          <View style={styles.drawerHeader}>
            <View style={styles.logoContainer}>
              <Image 
                source={LogoBpm} 
                style={styles.logoImage} 
                resizeMode="contain" 
              />
            </View>
            <View>
              <Text style={styles.headerTitle}>17º BPM</Text>
              <Text style={styles.headerSubtitle}>Gestão Operacional</Text>
            </View>
          </View>

          {/* DIVIDER */}
          <View style={styles.divider} />

          {/* ITENS DO MENU */}
          <View style={styles.menuItemsContainer}>
            <DrawerItem
              label="Dashboard"
              labelStyle={styles.drawerLabel}
              icon={({ size }) => <LayoutDashboard size={size} color="#3b82f6" />}
              onPress={() => router.push('/(tabs)')}
              style={styles.drawerItemStyle}
            />
            
            <DrawerItem
              label="CheckList"
              labelStyle={styles.drawerLabel}
              icon={({ size }) => <ClipboardCheck size={size} color="#3b82f6" />} // Cor azul para indicar ativo
              onPress={() => router.push('/checklist')} // Rota vinculada ao arquivo checklist.tsx
              style={styles.drawerItemStyle}
            />
            
            <DrawerItem
              label="Relatórios"
              labelStyle={styles.drawerLabel}
              icon={({ size }) => <BarChart3 size={size} color="#94a3b8" />}
              onPress={() => console.log('Relatórios')}
              style={styles.drawerItemStyle}
            />

            <DrawerItem
              label="Usuários"
              labelStyle={styles.drawerLabel}
              icon={({ size }) => <Users size={size} color="#94a3b8" />}
              onPress={() => console.log('Usuários')}
              style={styles.drawerItemStyle}
            />

            <DrawerItem
              label="Perfil"
              labelStyle={styles.drawerLabel}
              icon={({ size }) => <UserCircle size={size} color="#94a3b8" />}
              onPress={() => console.log('Perfil')}
              style={styles.drawerItemStyle}
            />

            <DrawerItem
              label="Cadastrar"
              labelStyle={styles.drawerLabel}
              icon={({ size }) => <UserPlus size={size} color="#94a3b8" />}
              onPress={() => console.log('Cadastrar')}
              style={styles.drawerItemStyle}
            />

            {/* BOTÃO SAIR */}
            <TouchableOpacity 
              style={styles.logoutButtonInline} 
              onPress={() => router.replace('/')}
              activeOpacity={0.8}
            >
              <Power size={18} color="#fff" />
              <Text style={styles.logoutText}>SAIR DO SISTEMA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => { if (error) throw error; }, [error]);
  useEffect(() => { if (loaded) SplashScreen.hideAsync(); }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayoutNav />
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" />
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false, 
          drawerStyle: { backgroundColor: '#020617', width: 240 },
          overlayColor: 'rgba(0,0,0,0.6)',
        }}
      >
        {/* Escondemos index e splash do menu lateral, mas mantemos as rotas */}
        <Drawer.Screen name="index" options={{ drawerItemStyle: { display: 'none' }, swipeEnabled: false }} />
        <Drawer.Screen name="splash" options={{ drawerItemStyle: { display: 'none' }, swipeEnabled: false }} />
        
        {/* Telas visíveis via DrawerItem (opcionalmente visíveis no Drawer nativo também) */}
        <Drawer.Screen name="(tabs)" options={{ title: 'Painel' }} />
        
        {/* Nova Tela de Checklist vinculada */}
        <Drawer.Screen 
          name="checklist" 
          options={{ 
            title: 'Conferência Digital',
            headerShown: true, // Habilitado para ter botão de voltar ou menu
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#020617' }
          }} 
        />
      </Drawer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  centralizer: {
    justifyContent: 'center',
    flex: 1,
  },
  drawerHeader: { 
    paddingHorizontal: 24, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12,
    marginBottom: 10
  },
  logoContainer: { width: 42, height: 42 },
  logoImage: { width: '100%', height: '100%' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerSubtitle: {
    color: '#3b82f6',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#1e293b',
    marginHorizontal: 24,
    marginVertical: 15,
  },
  menuItemsContainer: {
    paddingHorizontal: 12,
  },
  drawerItemStyle: {
    marginVertical: -2,
  },
  drawerLabel: { 
    color: '#94a3b8', 
    fontSize: 15, 
    fontWeight: '500',
    marginLeft: 10, 
  },
  logoutButtonInline: { 
    backgroundColor: '#1e3a8a', 
    flexDirection: 'row', 
    padding: 14, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 10,
    marginTop: 40, 
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)'
  },
  logoutText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.5
  },
});