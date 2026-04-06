import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundContainer: { 
    flex: 1, 
    backgroundColor: "#0f172a" 
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: "center", 
    padding: 20 
  },
  cardContainer: { 
    width: "100%",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerBlue: {
    backgroundColor: "#3b82f6",
    height: 70,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: { width: 50, height: 50 },
  card: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
    marginTop: -1, 
  },
  textHeader: { alignItems: "center", marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#1e293b" },
  subtitle: { fontSize: 11, color: "#64748b", marginTop: 2, textAlign: "center" },
  errorWrapper: { height: 40, justifyContent: "center" },
  errorBox: {
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: { color: "#b91c1c", fontSize: 10, fontWeight: "bold", textAlign: "center" },
  form: { width: "100%" },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    width: "100%",
    marginVertical: 20,
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: { color: "#3b82f6", fontWeight: "bold", fontSize: 12 },
});