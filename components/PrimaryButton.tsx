import React from "react";
import { 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  StyleProp, 
  ViewStyle 
} from "react-native";


interface PrimaryButtonProps {
  title: string;               
  onPress: () => void;         
  isLoading?: boolean;         
  disabled?: boolean;          
  style?: StyleProp<ViewStyle>; 
}

export function PrimaryButton({ 
  title, 
  onPress, 
  isLoading = false, 
  disabled = false, 
  style 

}: PrimaryButtonProps) {

  const isButtonDisabled = disabled || isLoading;


  return (
    <TouchableOpacity 
      style={[
        styles.buttonMain, 
        isButtonDisabled && styles.buttonDisabled, 
        style
      ]} 
      onPress={onPress} 
      disabled={isButtonDisabled}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonMain: {
    backgroundColor: "#3b82f6",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  buttonDisabled: { 
    backgroundColor: "#94a3b8" 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 13, 
    fontWeight: "bold" 
  },
});