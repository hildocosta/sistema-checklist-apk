import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ScrollView } from 'react-native';

export default function HistorySkeleton() {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.7, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const Shimmer = ({ style }: { style?: any }) => (
    <Animated.View style={[styles.shimmer, { opacity: pulseAnim }, style]} />
  );

  return (
    <View style={styles.container}>
      {/* HEADER SKELETON */}
      <View style={styles.headerBackground}>
        <Shimmer style={styles.titleLine} />
        <Shimmer style={styles.subtitleLine} />
      </View>

      {/* SEARCH BAR SKELETON */}
      <View style={styles.searchSection}>
        <Shimmer style={styles.searchBar} />
      </View>

      {/* LIST SKELETON */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={styles.card}>
            <View style={styles.infoContainer}>
              <Shimmer style={styles.iconBox} />
              <View style={{ flex: 1, gap: 8 }}>
                <Shimmer style={styles.dateText} />
                <Shimmer style={styles.nameText} />
                <Shimmer style={styles.hashText} />
              </View>
              <Shimmer style={styles.chevron} />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FOOTER BUTTON SKELETON */}
      <View style={styles.footerAction}>
        <Shimmer style={styles.btnImprimir} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  shimmer: { backgroundColor: "#1e293b", borderRadius: 4 },
  
  // Header
  headerBackground: { backgroundColor: "#0f172a", padding: 25, paddingTop: 60 },
  titleLine: { width: 120, height: 26, marginBottom: 8 },
  subtitleLine: { width: 180, height: 14 },

  // Search
  searchSection: { paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
  searchBar: { width: '100%', height: 50, borderRadius: 12 },

  // List & Cards
  listContent: { padding: 20, gap: 12 },
  card: { 
    backgroundColor: "rgba(30, 41, 59, 0.5)", 
    borderRadius: 16, 
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)"
  },
  infoContainer: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  iconBox: { width: 44, height: 44, borderRadius: 12 },
  dateText: { width: 100, height: 12 },
  nameText: { width: 160, height: 16 },
  hashText: { width: 140, height: 10 },
  chevron: { width: 18, height: 18, borderRadius: 9 },

  
  footerAction: { padding: 20, backgroundColor: "#020617" },
  btnImprimir: { width: '100%', height: 56, borderRadius: 16 }
});