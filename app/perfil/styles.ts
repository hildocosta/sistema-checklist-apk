import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F8FAFC" 
  },
  scrollContent: { 
    padding: 15,
    paddingBottom: 120 
  },
  avatarSection: { 
    alignItems: 'center', 
    marginVertical: 20 
  },
  avatarContainer: { 
    position: 'relative', 
    marginBottom: 15 
  },
  avatarCircle: { 
    width: 110, 
    height: 110, 
    borderRadius: 30, 
    backgroundColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10,
    borderWidth: 4, 
    borderColor: '#fff'
  },
  avatarImg: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 26 
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
    fontSize: 18, 
    fontWeight: '800', 
    color: '#1E293B' 
  },
  userTag: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#3B82F6', 
    marginTop: 2, 
    textTransform: 'uppercase' 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 16, 
    marginBottom: 15,
    elevation: 3, 
    shadowColor: '#64748B', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, 
    shadowRadius: 8
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F8FAFC', 
    paddingBottom: 10 
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
    marginLeft: 2 
  },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F1F5F9', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    height: 48, 
    borderWidth: 1, 
    borderColor: '#E2E8F0'
  },
  lightInput: { 
    backgroundColor: '#F8FAFC' 
  },
  disabledInput: { 
    backgroundColor: '#F8FAFC', 
    borderColor: '#F1F5F9' 
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
  row: { 
    flexDirection: 'row', 
    gap: 12 
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
    fontSize: 13, 
    letterSpacing: 0.5 
  }
});