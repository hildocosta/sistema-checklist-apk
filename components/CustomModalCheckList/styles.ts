import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  marginZero: {
    margin: 20, 
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    // Sombra Sênior
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 15,
  },
  title: {
    fontSize: 20, // Aumentei um pouco para destaque
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  content: {
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    textAlign: 'center',
  },
  footer: {
    // ALTERAÇÃO CHAVE: Mudamos para coluna para os botões empilharem
    flexDirection: 'column', 
    gap: 10, 
    marginTop: 5,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  }
});