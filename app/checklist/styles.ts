import { StyleSheet, Platform, UIManager } from "react-native";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const styles = StyleSheet.create({
  // ================= { CONTAINER PRINCIPAL } =================
  container: { 
    flex: 1, 
    backgroundColor: "#F8FAFC" 
  },

  // ================= { HEADER E STATUS } =================
  headerBackground: {
    backgroundColor: "#020617",
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: '900', 
    color: '#FFFFFF',
    lineHeight: 25 
  },
  headerSubtitle: { 
    fontSize: 12, 
    color: '#3B82F6', 
    fontWeight: '700', 
    textTransform: 'uppercase',
    marginTop: -2 
  },
  progressCircle: { 
    width: 50, 
    height: 50, 
    borderRadius: 15, 
    backgroundColor: 'rgba(59, 130, 246, 0.2)', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: 'rgba(59, 130, 246, 0.3)' 
  },
  progressValue: { 
    fontSize: 14, 
    fontWeight: '900', 
    color: '#3B82F6' 
  },
  statsRow: { 
    marginTop: 0 
  },
  progressBarBg: { 
    height: 4, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 2, 
    marginBottom: 4 
  },
  progressBarFill: { 
    height: 4, 
    backgroundColor: '#3B82F6', 
    borderRadius: 2 
  },
  statsText: { 
    fontSize: 8, 
    fontWeight: '800', 
    color: '#94A3B8', 
    letterSpacing: 1, 
    textTransform: 'uppercase' 
  },

  // ================= { SELEÇÃO DE ABAS (FILTROS) } =================
  filterSection: { 
    marginTop: -20 
  },
  tabsContainer: { 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    gap: 10 
  },
  tab: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 12, 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#E2E8F0',
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4
  },
  tabActive: { 
    backgroundColor: '#3B82F6', 
    borderColor: '#3B82F6' 
  },
  tabText: { 
    fontSize: 11, 
    fontWeight: '800', 
    color: '#64748B' 
  },
  tabTextActive: { 
    color: '#FFFFFF' 
  },

  // ================= { LISTA E CARDS DE ITENS } =================
  list: { 
    padding: 15, 
    paddingTop: 10, 
    paddingBottom: 130 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 15, 
    marginBottom: 12,
    elevation: 3, 
    shadowColor: '#64748B', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, 
    shadowRadius: 10, 
    borderWidth: 1, 
    borderColor: '#E2E8F0'
  },
  cardMainRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  cardContent: { 
    flex: 1, 
    paddingRight: 10 
  },
  badgeRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: 4 
  },
  qtdBadge: { 
    backgroundColor: '#020617', 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderRadius: 6 
  },
  qtdText: { 
    color: '#fff', 
    fontSize: 9, 
    fontWeight: '900' 
  },
  pmprText: { 
    color: '#64748B', 
    fontSize: 10, 
    fontWeight: '800' 
  },
  serieText: { 
    color: '#3B82F6', 
    fontSize: 10, 
    fontWeight: '800' 
  },
  itemDesc: { 
    fontSize: 14, 
    fontWeight: '800', 
    color: '#1E293B', 
    lineHeight: 18 
  },
  actionButton: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    backgroundColor: '#F1F5F9', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: '#E2E8F0' 
  },
  actionButtonSuccess: { 
    backgroundColor: '#10B981', 
    borderColor: '#10B981' 
  },

  // ================= { INPUTS DO CARD (FOOTER DO CARD) } =================
  cardFooter: { 
    flexDirection: 'row', 
    gap: 8, 
    marginTop: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#F1F5F9', 
    paddingTop: 12 
  },
  miniInput: { 
    flex: 1, 
    height: 38, 
    backgroundColor: '#F8FAFC', 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    fontSize: 11, 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    color: '#1E293B', 
    fontWeight: '600'
  },

  // ================= { AÇÃO FINAL (RODAPÉ DA TELA) } =================
  footerAction: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    paddingHorizontal: 40,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'android' ? 40 : 30, 
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0'
  },
  sendButton: { 
    height: 45,               
    borderRadius: 12, 
    backgroundColor: '#020617', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  sendButtonText: { 
    color: '#fff', 
    fontWeight: '900', 
    fontSize: 13, 
    letterSpacing: 1 
  },

  // ================= { ESTADOS VAZIOS } =================
  emptyContainer: { 
    alignItems: 'center', 
    marginTop: 30, 
    padding: 30 
  },
  emptyText: { 
    marginTop: 10, 
    color: '#64748B', 
    fontWeight: '800', 
    fontSize: 15, 
    textAlign: 'center' 
  }
});