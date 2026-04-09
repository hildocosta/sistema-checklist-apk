import { StyleSheet, Platform, UIManager } from "react-native";

// Habilitar LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff' 
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#0F172A' },
  headerSubtitle: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  progressCircle: { 
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#EFF6FF', 
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DBEAFE' 
  },
  progressValue: { fontSize: 14, fontWeight: '900', color: '#3B82F6' },
  statsRow: { paddingHorizontal: 20, backgroundColor: '#fff', paddingBottom: 15 },
  progressBarBg: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, marginBottom: 8 },
  progressBarFill: { height: 8, backgroundColor: '#3B82F6', borderRadius: 4 },
  statsText: { fontSize: 10, fontWeight: '800', color: '#94A3B8', letterSpacing: 0.5 },
  filterSection: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  tabsContainer: { paddingHorizontal: 15, paddingVertical: 12, gap: 10 },
  tab: { 
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, 
    backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' 
  },
  tabActive: { backgroundColor: '#1E293B', borderColor: '#1E293B' },
  tabText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  tabTextActive: { color: '#fff' },
  searchContainer: { 
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginBottom: 15, 
    backgroundColor: '#F1F5F9', borderRadius: 14, paddingHorizontal: 12 
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 46, fontSize: 14, color: '#1E293B' },
  list: { 
    padding: 15, 
    paddingBottom: 120 
  },
  card: { 
    backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12,
    elevation: 3, shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8
  },
  cardMainRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardContent: { flex: 1, paddingRight: 10 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 6 },
  qtdBadge: { backgroundColor: '#1E293B', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  qtdText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  pmprText: { color: '#64748B', fontSize: 11, fontWeight: '700' },
  serieText: { color: '#3B82F6', fontSize: 11, fontWeight: '700' },
  itemDesc: { fontSize: 15, fontWeight: '700', color: '#1E293B', lineHeight: 20 },
  actionButton: { 
    width: 48, height: 48, borderRadius: 14, backgroundColor: '#F1F5F9', 
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' 
  },
  actionButtonSuccess: { backgroundColor: '#10B981', borderColor: '#10B981' },
  cardFooter: { 
    flexDirection: 'row', gap: 8, marginTop: 15, borderTopWidth: 1, 
    borderTopColor: '#F1F5F9', paddingTop: 12 
  },
  miniInput: { 
    flex: 1, height: 38, backgroundColor: '#F8FAFC', borderRadius: 8, 
    paddingHorizontal: 10, fontSize: 12, borderWidth: 1, borderColor: '#E2E8F0', color: '#1E293B' 
  },
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
  sendButtonDisabled: { backgroundColor: '#E2E8F0' },
  sendButtonText: { 
    color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 0.5 
  },
  sendButtonTextDisabled: { color: '#94A3B8' },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 12, color: '#64748B', fontWeight: '700', fontSize: 16 }
});