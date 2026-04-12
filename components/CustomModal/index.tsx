import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './styles'; 
import { X } from 'lucide-react-native';

const deviceHeight = Dimensions.get("window").height;

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  // Adicionado 'success' aqui para resolver o erro de tipagem
  type?: 'default' | 'danger' | 'success'; 
}

export default function CustomModal({ 
  isVisible, 
  onClose, 
  title, 
  children, 
  footer,
  type = 'default' 
}: CustomModalProps) {
  
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={300}
      animationOutTiming={300}
      
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={0} 
      
      useNativeDriver={true}
      useNativeDriverForBackdrop={Platform.OS === 'android'}
      deviceHeight={deviceHeight}
      hideModalContentWhileAnimating={true}
      
      style={styles.marginZero}
    >
      <View style={styles.container}>
       
        <View style={styles.header}>
          <Text style={[
            styles.title, 
            type === 'danger' && { color: '#EF4444' },
            type === 'success' && { color: '#10B981' } // Cor verde para sucesso
          ]}>
            {title}
          </Text>
          
          <TouchableOpacity 
            onPress={onClose} 
            activeOpacity={0.6}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <X size={22} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {children}
        </View>

        {footer && (
          <View style={styles.footer}>
            {footer}
          </View>
        )}
      </View>
    </Modal>
  );
}