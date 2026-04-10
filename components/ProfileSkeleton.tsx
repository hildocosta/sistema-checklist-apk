import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  ScrollView 
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ProfileSkeleton() {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const Shimmer = ({ style }: { style?: any }) => (
    <Animated.View style={[styles.shimmer, { opacity: pulseAnim }, style]} />
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        
        
        <View style={styles.headerBackground}>
          <Shimmer style={styles.headerTitle} />
          <Shimmer style={styles.headerSubtitle} />
        </View>

        
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Shimmer style={styles.avatarCircle} />
            <View style={styles.cameraBtnPlaceholder} />
          </View>
          <Shimmer style={styles.userName} />
          <Shimmer style={styles.userTag} />
        </View>

        
        <View style={styles.cardsContainer}>
          
         
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Shimmer style={styles.iconPlaceholder} />
              <Shimmer style={styles.cardTitleText} />
            </View>
            
            <View style={styles.inputGroup}>
              <Shimmer style={styles.label} />
              <Shimmer style={styles.inputWrapper} />
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1.2 }}>
                <Shimmer style={styles.label} />
                <Shimmer style={styles.inputWrapper} />
              </View>
              <View style={{ flex: 1 }}>
                <Shimmer style={styles.label} />
                <Shimmer style={styles.inputWrapper} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Shimmer style={styles.label} />
              <Shimmer style={styles.inputWrapper} />
            </View>
          </View>

         
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Shimmer style={styles.iconPlaceholder} />
              <Shimmer style={styles.cardTitleText} />
            </View>
            <View style={styles.inputGroup}>
              <Shimmer style={styles.label} />
              <Shimmer style={styles.inputWrapper} />
            </View>
            <View style={styles.inputGroup}>
              <Shimmer style={styles.label} />
              <Shimmer style={styles.inputWrapper} />
            </View>
          </View>

        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      
      <View style={styles.footerAction}>
        <Shimmer style={styles.saveButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  shimmer: { backgroundColor: "#1e293b", borderRadius: 4 },
  
  
  headerBackground: {
    height: 140,
    backgroundColor: "#0f172a",
    paddingTop: 40,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: { width: 120, height: 28, marginBottom: 8 },
  headerSubtitle: { width: 100, height: 14 },

  avatarSection: { alignItems: "center", marginTop: -50, marginBottom: 20 },
  avatarContainer: { width: 100, height: 100, position: "relative" },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: "#020617" },
  cameraBtnPlaceholder: { 
    position: "absolute", bottom: 0, right: 0, 
    width: 34, height: 34, borderRadius: 17, 
    backgroundColor: "#1e293b", borderWidth: 3, borderColor: "#020617" 
  },
  userName: { width: 150, height: 22, marginTop: 15, borderRadius: 10 },
  userTag: { width: 180, height: 14, marginTop: 8, borderRadius: 10 },


  cardsContainer: { paddingHorizontal: 20 },
  card: { 
    backgroundColor: "rgba(30, 41, 59, 0.5)", 
    borderRadius: 16, padding: 20, marginBottom: 20 
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
  iconPlaceholder: { width: 16, height: 16 },
  cardTitleText: { width: 150, height: 14 },
  
  inputGroup: { marginBottom: 15 },
  label: { width: 80, height: 10, marginBottom: 8 },
  inputWrapper: { width: "100%", height: 50, borderRadius: 12 },
  row: { flexDirection: "row", gap: 15, marginBottom: 15 },


  footerAction: { 
    position: "absolute", bottom: 0, width: "100%", 
    padding: 20, backgroundColor: "#020617", borderTopWidth: 1, borderTopColor: "#1e293b" 
  },
  saveButton: { width: "100%", height: 56, borderRadius: 16 },
});