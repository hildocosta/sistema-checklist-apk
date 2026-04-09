import { StyleSheet, Platform } from "react-native";

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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerBlue: {
    backgroundColor: "#3b82f6",
    height: 80,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  logoImage: { 
    width: 55, 
    height: 55 
  },
  card: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: -1, 
  },
  textHeader: { 
    alignItems: "center", 
    marginBottom: 20 
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#1e293b" },
  subtitle: { 
    fontSize: 12, 
    color: "#64748b", 
    marginTop: 4, 
    textAlign: "center",
    fontWeight: "500"
  },
  errorWrapper: { 
    minHeight: 45, 
    justifyContent: "center",
    marginBottom: 10
  },
  errorBox: {
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fecaca",
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: { 
    color: "#b91c1c", 
    fontSize: 11, 
    fontWeight: "bold", 
    flex: 1,
    marginLeft: 8
  },
  form: { 
    width: "100%" 
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    width: "100%",
    marginVertical: 25,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  noAccountText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "500",
  },
  registerText: {
    color: "#3b82f6",
    fontSize: 13,
    fontWeight: "700",
  },
});