import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { X } from 'lucide-react-native';
import { styles } from './styles'; 

const deviceHeight = Dimensions.get("window").height;

interface ModalButton {
  text: string;
  onPress: () => void;
  style?: 'default' | 'destructive' | 'outline';
}

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  children?: React.ReactNode;
  buttons?: ModalButton[];
  type?: 'default' | 'danger' | 'success'; 
}

export default function CustomModal({ 
  isVisible, 
  onClose, 
  title, 
  message,
  children, 
  buttons,
  type = 'default' 
}: CustomModalProps) {
  
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      useNativeDriver={true}
      useNativeDriverForBackdrop={Platform.OS === 'android'}
      deviceHeight={deviceHeight}
      style={{ margin: 20, justifyContent: 'center' }}
    >
      <View style={{ 
        backgroundColor: '#FFF', 
        borderRadius: 16, 
        padding: 20,
        overflow: 'hidden' 
      }}>
        {/* Header */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16 
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: type === 'danger' ? '#EF4444' : type === 'success' ? '#10B981' : '#1E293B',
            flex: 1
          }}>
            {title}
          </Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <X size={22} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView bounces={false} style={{ marginBottom: 20 }}>
          {message && (
            <Text style={{ fontSize: 15, color: '#64748B', lineHeight: 22, textAlign: 'left' }}>
              {message}
            </Text>
          )}
          {children}
        </ScrollView>

        {/* Footer / Buttons (Stack Vertical) */}
        {buttons && buttons.length > 0 && (
          <View style={{ gap: 10 }}>
            {buttons.map((btn, index) => {
              const isDestructive = btn.style === 'destructive';
              const isOutline = btn.style === 'outline';

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  onPress={btn.onPress}
                  style={{
                    backgroundColor: isDestructive ? '#FEE2E2' : isOutline ? 'transparent' : '#3B82F6',
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    borderWidth: isOutline ? 1 : 0,
                    borderColor: '#CBD5E1'
                  }}
                >
                  <Text style={{
                    color: isDestructive ? '#EF4444' : isOutline ? '#64748B' : '#FFF',
                    fontWeight: '600',
                    fontSize: 14,
                    textTransform: 'uppercase'
                  }}>
                    {btn.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </Modal>
  );
}