import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  
  // HEADER DARK
  headerBackground: {
    backgroundColor: "#020617",
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 12, color: '#3B82F6', fontWeight: '700', textTransform: 'uppercase' },

  // ÁREA DE BUSCA
  searchSection: { 
    marginTop: -25, 
    paddingHorizontal: 20,
    marginBottom: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '700',
    marginLeft: 10
  },

  // LISTA
  listContent: { 
    padding: 20, 
    paddingBottom: 100 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#F0F7FF'
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBoxActive: {
    backgroundColor: '#3B82F6'
  },
  dateLabel: { fontSize: 10, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase' },
  nameLabel: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  hashLabel: { fontSize: 9, color: '#94A3B8', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },

  // RODAPÉ (IGUAL À TELA DE CADASTRO)
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
  },
  btnImprimir: { 
    height: 42,            
    borderRadius: 10, 
    backgroundColor: '#020617', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 8
  },
  btnImprimirText: { color: '#fff', fontWeight: '800', fontSize: 14, letterSpacing: 1 },
  disabledBtn: { opacity: 0.5 }
});