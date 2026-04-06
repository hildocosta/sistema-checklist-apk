import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  TextInputProps 
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

interface CustomInputProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
}

export function CustomInput({ label, isPassword, ...rest }: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false); 

  // Definindo a cor azul suave para reutilização
  const activeColor = "#60a5fa"; 
  const inactiveColor = "#64748b";

  return (
    <View style={styles.container}>
      <Text style={[
        styles.label, 
        isFocused && { color: activeColor } 
      ]}>
        {label}
      </Text>
      
      <View style={[
        styles.inputWrapper, 
        isFocused && styles.inputFocused 
      ]}>
        <TextInput
          style={styles.inputInside}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#94a3b8"
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)}  
          {...rest}
        />
        
        {isPassword && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            activeOpacity={0.7}
          >
            {showPassword ? (
              <EyeOff size={18} color={isFocused ? activeColor : inactiveColor} />
            ) : (
              <Eye size={18} color={isFocused ? activeColor : inactiveColor} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  label: { 
    fontSize: 10, 
    fontWeight: "bold", 
    color: "#475569", 
    marginBottom: 4, 
    marginLeft: 2 
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    height: 45,
    backgroundColor: "#f8fafc",
  },
  inputFocused: {
    borderColor: "#60a5fa",
    backgroundColor: "#ffffff",
    borderWidth: 1, 
  },
  inputInside: { 
    flex: 1, 
    paddingHorizontal: 12, 
    fontSize: 14, 
    color: "#1e293b",
    height: '100%'
  },
  eyeIcon: { 
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
});