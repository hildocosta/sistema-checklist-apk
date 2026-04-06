import React from 'react';
import { Tabs } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { LayoutDashboard, ShieldAlert, Menu } from 'lucide-react-native';
import { TouchableOpacity, Platform } from 'react-native';

export default function TabLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        // CENTRALIZAÇÃO REAL AQUI
        headerTitleAlign: 'center', 
        
        headerStyle: { 
          backgroundColor: '#020617',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: { 
          color: '#fff', 
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerTintColor: '#3b82f6',

        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        
        // Removemos o headerTitleContainerStyle antigo para não dar conflito
        
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            activeOpacity={0.7}
          >
            <Menu size={28} color="#fff" />
          </TouchableOpacity>
        ),

        // Adicionamos um elemento vazio à direita para equilibrar o peso visual
        // Isso garante que o título fique matematicamente no centro da tela
        headerRight: () => <TouchableOpacity style={{ marginRight: 15, width: 28 }} />,

        tabBarStyle: {
          backgroundColor: '#020617',
          borderTopColor: '#1e293b',
          height: 70,
          paddingBottom: 12,
        },
        tabBarActiveTintColor: '#3b82f6',
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: '17º BPM',
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: 'SERVIÇO',
          tabBarLabel: 'Ocorrências',
          tabBarIcon: ({ color }) => <ShieldAlert size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}