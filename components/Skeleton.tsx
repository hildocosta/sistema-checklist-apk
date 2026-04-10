import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export function DashboardSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.6, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const Shimmer = ({ style }: { style?: any }) => (
    <Animated.View style={[styles.shimmer, { opacity }, style]} />
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.headerSkeleton}>
        <Shimmer style={styles.circle} />
        <View style={{ gap: 8 }}>
          <Shimmer style={{ width: width * 0.6, height: 18 }} />
          <Shimmer style={{ width: width * 0.4, height: 12 }} />
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.row}>
          <View style={styles.cardSkeleton}><Shimmer style={styles.full} /></View>
          <View style={styles.cardSkeleton}><Shimmer style={styles.full} /></View>
        </View>
        <View style={styles.row}>
          <View style={styles.cardSkeleton}><Shimmer style={styles.full} /></View>
          <View style={styles.cardSkeleton}><Shimmer style={styles.full} /></View>
        </View>
      </View>

      
      <View style={styles.sectionTitleSkeleton}>
        <Shimmer style={{ width: 150, height: 20 }} />
      </View>

     
      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.logSkeleton}>
          <View style={styles.logHeader}>
            <Shimmer style={{ width: 60, height: 20, borderRadius: 4 }} />
            <Shimmer style={{ width: 80, height: 15 }} />
          </View>
          <Shimmer style={{ width: '80%', height: 18, marginTop: 12 }} />
          <Shimmer style={{ width: '100%', height: 14, marginTop: 8 }} />
          <View style={styles.logFooter}>
            <Shimmer style={{ width: 100, height: 12 }} />
            <Shimmer style={{ width: 120, height: 12 }} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 16 },
  shimmer: { backgroundColor: '#1e293b', borderRadius: 4 },
  full: { width: '100%', height: '100%' },
  
  
  headerSkeleton: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 25, marginTop: 10 },
  circle: { width: 30, height: 30, borderRadius: 15 },

  
  grid: { gap: 12, marginBottom: 25 },
  row: { flexDirection: 'row', gap: 12 },
  cardSkeleton: { flex: 1, height: 110, backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: 12, overflow: 'hidden' },

  
  sectionTitleSkeleton: { marginBottom: 15 },


  logSkeleton: { 
    height: 130, 
    backgroundColor: 'rgba(30, 41, 59, 0.3)', 
    borderRadius: 12, 
    padding: 15, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1e293b'
  },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  logFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }
});