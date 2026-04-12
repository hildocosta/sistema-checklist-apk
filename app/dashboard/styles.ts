import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // --- LAYOUT BASE ---
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: '900',
    color: '#94A3B8',
    letterSpacing: 1,
  },

  // --- CABEÇALHO (STATUS DO TURNO) ---
  statusHeader: {
    padding: 20,
    paddingTop: 40, // Aumentado para não colidir com notch
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  headerNormal: {
    backgroundColor: '#0F172A', // Azul escuro/Preto PMPR
  },
  headerAlert: {
    backgroundColor: '#DC2626', // Vermelho alerta
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  headerTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },

  // --- GRID DE CARDS (STATS) ---
  gridCards: {
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  cardAlert: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
  },

  // --- INFO DE ÚLTIMA ATUALIZAÇÃO ---
  updateInfo: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  updateText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    fontStyle: 'italic',
  },

  // --- SEÇÕES E LOGS ---
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  logCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logAlert: {
    backgroundColor: '#FFF1F1',
    borderColor: '#FEE2E2',
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  logBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
  },
  logStatusText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#64748B', // Default
    textTransform: 'uppercase',
  },
  logEquipamento: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1E293B',
  },
  logDescricao: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#475569',
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  logFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  logFooterText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
  },

  // --- ESTADOS VAZIOS ---
  emptyLogs: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    opacity: 0.5,
  },
  emptyLogsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    textAlign: 'center',
  }
});