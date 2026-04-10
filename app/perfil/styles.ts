import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F8FAFC" 
  },
  // --- NOVO HEADER ESTILO USUÁRIOS ---
  headerBackground: {
    backgroundColor: "#020617",
    paddingBottom: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 4,
  },
  // --- AVATAR FLUTUANTE ---
  avatarSection: { 
    alignItems: 'center', 
    marginTop: -50, // Faz o avatar subir para cima do header escuro
    marginBottom: 20
  },
  avatarContainer: { 
    position: 'relative', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarCircle: { 
    width: 110, 
    height: 110, 
    borderRadius: 35, // Arredondamento moderno
    backgroundColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 4, 
    borderColor: '#fff'
  },
  avatarImg: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 30 
  },
  cameraBtn: { 
    position: 'absolute', 
    bottom: -5, 
    right: -5, 
    backgroundColor: '#3B82F6', 
    width: 36, 
    height: 36, 
    borderRadius: 12,
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 3, 
    borderColor: '#F8FAFC'
  },
  userName: { 
    fontSize: 20, 
    fontWeight: '900', 
    color: '#1E293B',
    marginTop: 10
  },
  userTag: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#3B82F6', 
    marginTop: 2, 
    textTransform: 'uppercase' 
  },
  // --- CONTEÚDO ---
  scrollContent: { 
    paddingBottom: 120 
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 24, 
    padding: 20, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Sombra leve
    shadowColor: '#64748B', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, 
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: 18, 
  },
  cardTitle: { 
    fontSize: 11, 
    fontWeight: '900', 
    color: '#64748B', 
    letterSpacing: 1 
  },
  inputGroup: { 
    marginBottom: 15 
  },
  label: { 
    fontSize: 10, 
    fontWeight: '800', 
    color: '#94A3B8', 
    marginBottom: 6, 
    marginLeft: 4,
    textTransform: 'uppercase'
  },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F1F5F9', 
    borderRadius: 14, 
    paddingHorizontal: 12, 
    height: 52, 
    borderWidth: 1, 
    borderColor: '#E2E8F0'
  },
  lightInput: { backgroundColor: '#F8FAFC' },
  disabledInput: { backgroundColor: '#F8FAFC', borderColor: '#F1F5F9' },
  inputIcon: { marginRight: 10 },
  input: { 
    flex: 1, 
    fontSize: 14, 
    color: '#1E293B', 
    fontWeight: '700' 
  },
  row: { flexDirection: 'row', gap: 12 },
  // --- FOOTER ---
  footerAction: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    paddingHorizontal: 50,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'android' ? 60 : 40, 
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  saveButton: { 
    height: 42,               
    borderRadius: 10, 
    backgroundColor: '#020617', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  saveButtonText: { 
    color: '#fff', 
    fontWeight: '800', 
    fontSize: 14, 
    letterSpacing: 1 
  }
});