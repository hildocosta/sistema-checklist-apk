import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../service/api';
import { useRouter } from 'expo-router';

// 1. Atualizamos a Interface para aceitar o setUser
interface AuthContextData {
  signed: boolean;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>; // Adicionado para permitir edição
  signIn(credentials: any): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Carrega os dados do usuário salvos no celular ao abrir o App
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

  async function signIn(credentials: any) {
    try {
      console.log("======= INICIANDO LOGIN MOBILE =======");
      
      const response = await api.post('/mobile/login', {
        email: credentials.email,
        password: credentials.password,
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log("STATUS DA RESPOSTA:", response.status);

      const userData = response.data;

      if (response.status === 200 && userData && !userData.error) {
        console.log("DADOS DO MILITAR RECEBIDOS:", JSON.stringify(userData, null, 2));

        setUser(userData);
        await AsyncStorage.setItem('@BPM17:user', JSON.stringify(userData));
        
        console.log("LOGIN SUCESSO! REDIRECIONANDO...");
        router.replace('/dashboard/dashboard');
      } else {
        throw new Error(userData.error || "Dados de usuário inválidos.");
      }

    } catch (error: any) {
      console.error("======= ERRO NO LOGIN =======");
      
      let mensagemAmigavel = "Não foi possível realizar o login.";

      if (error.response) {
        console.log("Erro vindo do Servidor:", error.response.data);
        mensagemAmigavel = error.response.data.error || mensagemAmigavel;
      } else if (error.request) {
        console.log("Erro de Rede: Sem resposta do servidor.");
        mensagemAmigavel = "Servidor offline ou sem conexão com a internet.";
      } else {
        console.log("Erro Geral:", error.message);
      }

      Alert.alert("Erro de Autenticação", mensagemAmigavel);
    }
  }

  function signOut() {
    AsyncStorage.removeItem('@BPM17:user').then(() => {
      setUser(null);
      router.replace('/'); 
    });
  }

  return (
    <AuthContext.Provider value={{ 
      signed: !!user, 
      user, 
      setUser, // 2. Passamos o setUser aqui para o Provider
      signIn, 
      signOut, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);