import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../service/api';
import { useRouter } from 'expo-router';

interface User {
  id: string;
  name: string;
  email: string;
  re: string;
  posto: string;
  nivel: 'Admin' | 'Operador';
  image?: string;
  telefone?: string;
  setor?: string;
  unidade?: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn(credentials: any): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Carrega os dados ao iniciar o app
  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@BPM17:user');
      if (storageUser) {
        try {
          setUser(JSON.parse(storageUser));
        } catch (e) {
          console.error("Erro ao recuperar usuário do storage:", e);
        }
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  // Persiste os dados sempre que o estado 'user' mudar
  useEffect(() => {
    async function saveUser() {
      if (user) {
        await AsyncStorage.setItem('@BPM17:user', JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem('@BPM17:user');
      }
    }
    saveUser();
  }, [user]);

  async function signIn(credentials: any) {
    try {
      const response = await api.post('/mobile/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const userData = response.data;

      if (response.status === 200 && userData && !userData.error) {
        setUser(userData);
        router.replace('/dashboard/dashboard');
      } else {
        throw new Error(userData.error || "Dados de usuário inválidos.");
      }
    } catch (error: any) {
      let mensagemAmigavel = "Não foi possível realizar o login.";
      if (error.response) {
        mensagemAmigavel = error.response.data.error || mensagemAmigavel;
      }
      Alert.alert("Erro de Autenticação", mensagemAmigavel);
    }
  }

  function signOut() {
    setUser(null);
    router.replace('/'); 
  }

  return (
    <AuthContext.Provider value={{ 
      signed: !!user, 
      user, 
      setUser, 
      signIn, 
      signOut, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);