import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRouter, usePathname } from 'expo-router'; 
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Users, 
  Power,
  UserCircle,
  Shield,
  PlusCircle,
  FileText,
  Activity
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
  const pathname = usePathname(); 

  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  return (
    <View style={{ flex: 1, backgroundColor: '#020617' }}>
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 50 }}
      >
        <View style={styles.centralizer}>
          
          <View style={styles.drawerHeader}>
            <View style={styles.logoContainer}>
              <Image source={LogoBpm} style={styles.logoImage} resizeMode="contain" />
            </View>
            <View>
              <Text style={styles.headerTitle}>17º BPM</Text>
              <Text style={styles.headerSubtitle}>Gestão Operacional</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.menuItemsContainer}>
            
            {/* DASHBOARD - Rota: dashboard/dashboard */}
            <DrawerItem
              label="Dashboard"
              labelStyle={[styles.drawerLabel, isActive('/dashboard/dashboard') && styles.labelActive]}
              icon={({ size }) => (
                <LayoutDashboard size={size} color={isActive('/dashboard/dashboard') ? "#3b82f6" : "#94a3b8"} />
              )}
              onPress={() => router.push('/dashboard/dashboard')}
              style={[styles.drawerItemStyle, isActive('/dashboard/dashboard') && styles.itemActiveBackground]}
            />
            
            <DrawerItem
              label="Conferência"
              labelStyle={[styles.drawerLabel, isActive('/checklist/checklist') && styles.labelActive]}
              icon={({ size }) => (
                <ClipboardCheck size={size} color={isActive('/checklist/checklist') ? "#3b82f6" : "#94a3b8"} />
              )}
              onPress={() => router.push('/checklist/checklist')}
              style={[styles.drawerItemStyle, isActive('/checklist/checklist') && styles.itemActiveBackground]}
            />

            <DrawerItem
              label="Novo Cadastro"
              labelStyle={[styles.drawerLabel, isActive('/cadastrar/cadastrar') && styles.labelActive]}
              icon={({ size }) => (
                <PlusCircle size={size} color={isActive('/cadastrar/cadastrar') ? "#3b82f6" : "#94a3b8"} />
              )}
              onPress={() => router.push('/cadastrar/cadastrar')}
              style={[styles.drawerItemStyle, isActive('/cadastrar/cadastrar') && styles.itemActiveBackground]}
            />

            <DrawerItem
              label="Relatórios"
              labelStyle={[styles.drawerLabel, isActive('/relatorios/relatorios') && styles.labelActive]}
              icon={({ size }) => (
                <FileText size={size} color={isActive('/relatorios/relatorios') ? "#3b82f6" : "#94a3b8"} />
              )}
              onPress={() => router.push('/relatorios/relatorios')}
              style={[styles.drawerItemStyle, isActive('/relatorios/relatorios') && styles.itemActiveBackground]}
            />

            <DrawerItem
              label="Usuários"
              labelStyle={[styles.drawerLabel, isActive('/usuarios/usuarios') && styles.labelActive]}
              icon={({ size }) => (
                <Users size={size} color={isActive('/usuarios/usuarios') ? "#3b82f6" : "#94a3b8"} />
              )}
              onPress={() => router.push('/usuarios/usuarios')}
              style={[styles.drawerItemStyle, isActive('/usuarios/usuarios') && styles.itemActiveBackground]}
            />

            <DrawerItem
              label="Meu Perfil"
              labelStyle={[styles.drawerLabel, isActive('/perfil/perfil') && styles.labelActive]}
              icon={({ size }) => (
                <UserCircle size={size} color={isActive('/perfil/perfil') ? "#3b82f6" : "#94a3b8"} />
              )}
              onPress={() => router.push('/perfil/perfil')}
              style={[styles.drawerItemStyle, isActive('/perfil/perfil') && styles.itemActiveBackground]}
            />

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
          drawerStyle: { backgroundColor: '#020617', width: 260 },
          overlayColor: 'rgba(0,0,0,0.6)',
        }}
      >
        {/* LOGIN - Escondido do menu */}
        <Drawer.Screen name="index" options={{ drawerItemStyle: { display: 'none' }, swipeEnabled: false }} />
        
        {/* DASHBOARD - Configurado como tela principal com Header */}
        <Drawer.Screen 
          name="dashboard/dashboard" 
          options={{ 
            title: 'PAINEL DE CONTROLE',
            headerShown: true,
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
            headerTitleStyle: { fontWeight: '900', fontSize: 16 },
            headerStyle: { backgroundColor: '#020617', elevation: 0, shadowOpacity: 0 },
            headerRight: () => (
              <View style={[styles.badgeNivel, { borderColor: 'rgba(16, 185, 129, 0.3)', backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                <Activity size={12} color="#10b981" />
                <Text style={[styles.badgeText, { color: '#10b981' }]}>LIVE</Text>
              </View>
            ),
          }} 
        />

        <Drawer.Screen 
          name="relatorios/relatorios" 
          options={{ 
            title: 'RELATÓRIOS',
            headerShown: true,
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
            headerTitleStyle: { fontWeight: '900', fontSize: 16 },
            headerStyle: { backgroundColor: '#020617', elevation: 0, shadowOpacity: 0 }
          }} 
        />

        <Drawer.Screen 
          name="cadastrar/cadastrar" 
          options={{ 
            title: 'NOVO CADASTRO',
            headerShown: true,
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
            headerTitleStyle: { fontWeight: '900', fontSize: 16 },
            headerStyle: { backgroundColor: '#020617', elevation: 0, shadowOpacity: 0 }
          }} 
        />

        <Drawer.Screen 
          name="checklist/checklist" 
          options={{ 
            title: 'CONFERÊNCIA DIGITAL',
            headerShown: true,
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '900', fontSize: 16 },
            headerStyle: { backgroundColor: '#020617', elevation: 0, shadowOpacity: 0 }
          }} 
        />

        <Drawer.Screen 
          name="usuarios/usuarios" 
          options={{ 
            title: 'GESTÃO DE USUÁRIOS',
            headerShown: true,
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '900', fontSize: 16 },
            headerStyle: { backgroundColor: '#020617', elevation: 0, shadowOpacity: 0 }
          }} 
        />
       
        <Drawer.Screen 
          name="perfil/perfil" 
          options={{ 
            title: 'MEU PERFIL',
            headerShown: true,
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '900', fontSize: 16 },
            headerStyle: { backgroundColor: '#020617', elevation: 0, shadowOpacity: 0 },
            headerRight: () => (
              <View style={styles.badgeNivel}>
                <Shield size={12} color="#3b82f6" />
                <Text style={styles.badgeText}>OPERADOR</Text>
              </View>
            ),
          }} 
        />
      </Drawer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  centralizer: { justifyContent: 'center', flex: 1 },
  drawerHeader: { paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  logoContainer: { width: 42, height: 42 },
  logoImage: { width: '100%', height: '100%' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerSubtitle: { color: '#3b82f6', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  divider: { height: 1, backgroundColor: '#1e293b', marginHorizontal: 24, marginVertical: 15 },
  menuItemsContainer: { paddingHorizontal: 12 },
  drawerItemStyle: { marginVertical: 2, borderRadius: 8 }, 
  drawerLabel: { color: '#94a3b8', fontSize: 15, fontWeight: '500', marginLeft: 10 },
  labelActive: { color: '#3b82f6', fontWeight: 'bold' },
  itemActiveBackground: { backgroundColor: 'rgba(59, 130, 246, 0.1)' },
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
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 13, letterSpacing: 0.5 },
  badgeNivel: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5,
    backgroundColor: 'rgba(59, 130, 246, 0.15)', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 8, 
    marginRight: 15,
    borderWidth: 1, 
    borderColor: 'rgba(59, 130, 246, 0.3)' 
  },
  badgeText: { fontSize: 10, fontWeight: '800', color: '#3B82F6', textTransform: 'uppercase' },
});