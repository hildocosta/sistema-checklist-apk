import { StyleSheet, Platform, UIManager } from "react-native";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  
  // HEADER ESTILO 17BPM
  headerBackground: {
    backgroundColor: "#020617",
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 12, color: '#3B82F6', fontWeight: '700', textTransform: 'uppercase' },
  
  // PROGRESSO NO HEADER
  progressCircle: { 
    width: 54, height: 54, borderRadius: 18, backgroundColor: 'rgba(59, 130, 246, 0.2)', 
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(59, 130, 246, 0.3)' 
  },
  progressValue: { fontSize: 16, fontWeight: '900', color: '#3B82F6' },
  
  statsRow: { marginTop: 5 },
  progressBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 8 },
  progressBarFill: { height: 6, backgroundColor: '#3B82F6', borderRadius: 3 },
  statsText: { fontSize: 9, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, textTransform: 'uppercase' },

  // ABAS FLUTUANTES
  filterSection: { marginTop: -25 }, 
  tabsContainer: { paddingHorizontal: 15, paddingVertical: 10, gap: 10 },
  tab: { 
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, 
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0',
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4
  },
  tabActive: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  tabText: { fontSize: 11, fontWeight: '800', color: '#64748B' },
  tabTextActive: { color: '#FFFFFF' },

  // BUSCA
  searchSection: { paddingHorizontal: 20, marginTop: 10 },
  searchContainer: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#FFFFFF', borderRadius: 15, paddingHorizontal: 15,
    height: 50, borderWidth: 1, borderColor: '#E2E8F0'
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 14, color: '#1E293B', fontWeight: '600' },

  // LISTA E CARDS
  list: { padding: 20, paddingBottom: 130 },
  card: { 
    backgroundColor: '#fff', borderRadius: 24, padding: 18, marginBottom: 15,
    elevation: 3, shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 10, borderWidth: 1, borderColor: '#E2E8F0'
  },
  cardMainRow: { flexDirection: 'row', alignItems: 'center' },
  cardContent: { flex: 1, paddingRight: 10 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  qtdBadge: { backgroundColor: '#020617', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  qtdText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  pmprText: { color: '#64748B', fontSize: 11, fontWeight: '800' },
  serieText: { color: '#3B82F6', fontSize: 11, fontWeight: '800' },
  itemDesc: { fontSize: 15, fontWeight: '800', color: '#1E293B', lineHeight: 22 },
  
  actionButton: { 
    width: 50, height: 50, borderRadius: 16, backgroundColor: '#F1F5F9', 
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' 
  },
  actionButtonSuccess: { backgroundColor: '#10B981', borderColor: '#10B981' },

  cardFooter: { 
    flexDirection: 'row', gap: 10, marginTop: 15, borderTopWidth: 1, 
    borderTopColor: '#F1F5F9', paddingTop: 15 
  },
  miniInput: { 
    flex: 1, height: 42, backgroundColor: '#F8FAFC', borderRadius: 10, 
    paddingHorizontal: 12, fontSize: 12, borderWidth: 1, borderColor: '#E2E8F0', 
    color: '#1E293B', fontWeight: '600'
  },

  // RODAPÉ
  footerAction: { 
    position: 'absolute', 
    bottom: 0, left: 0, right: 0, 
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
  sendButton: { 
    height: 42,           
    borderRadius: 10, 
    backgroundColor: '#020617', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  sendButtonDisabled: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' },
  sendButtonText: { color: '#fff', fontWeight: '900', fontSize: 14, letterSpacing: 1 },
  sendButtonTextDisabled: { color: '#94A3B8' },

  emptyContainer: { alignItems: 'center', marginTop: 40, padding: 30 },
  emptyText: { marginTop: 15, color: '#64748B', fontWeight: '800', fontSize: 16, textAlign: 'center' }
});