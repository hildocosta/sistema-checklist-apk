import axios from 'axios';

const api = axios.create({
  // Verifique se no seu .env a URL termina com /api 
  // Ex: https://seu-site.com/api
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json', // ESSENCIAL: Diz ao Next.js para enviar JSON, não HTML
  },
});

// Log para te ajudar a debugar no terminal do Expo se a URL está correta
console.log("API BaseURL:", process.env.EXPO_PUBLIC_API_URL);

export default api;