import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F8FAFC" 
  },
  headerBackground: {
    backgroundColor: "#020617",
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: '900', 
    color: '#FFFFFF' 
  },
  headerSubtitle: { 
    fontSize: 12, 
    color: '#3B82F6', 
    fontWeight: '700', 
    textTransform: 'uppercase' 
  },
  filterSection: { 
    marginTop: -25 
  }, 
  tabsContainer: { 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    gap: 10 
  },
  tab: { 
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12, 
    borderRadius: 14, 
    backgroundColor: '#FFFFFF',
    borderWidth: 1, 
    borderColor: '#E2E8F0',
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4,
    gap: 8
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
  scrollContent: { 
    padding: 20, 
    paddingBottom: 120 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 24, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: '#E2E8F0',
    shadowColor: '#64748B', 
    shadowOpacity: 0.05, 
    shadowRadius: 10, 
    elevation: 2
  },
  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    marginBottom: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F1F5F9', 
    paddingBottom: 10 
  },
  sectionTitle: { 
    fontSize: 10, 
    fontWeight: '900', 
    color: '#0F172A', 
    letterSpacing: 1, 
    textTransform: 'uppercase' 
  },
  inputGroup: { 
    marginBottom: 16 
  },
  label: { 
    fontSize: 10, 
    fontWeight: '800', 
    color: '#94A3B8', 
    textTransform: 'uppercase', 
    marginBottom: 6, 
    marginLeft: 4 
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#F8FAFC', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E2E8F0',
    height: 48, 
    paddingHorizontal: 12
  },
  inputIcon: { 
    marginRight: 10 
  },
  input: { 
    flex: 1, 
    fontSize: 14, 
    color: '#1E293B', 
    fontWeight: '600' 
  },
  pickerButton: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
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
  btnSalvar: { 
    height: 42,                
    borderRadius: 10, 
    backgroundColor: '#020617', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  btnSalvarText: { 
    color: '#fff', 
    fontWeight: '800', 
    fontSize: 14, 
    letterSpacing: 1 
  }
});