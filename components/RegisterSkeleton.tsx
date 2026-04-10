import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ScrollView } from 'react-native';

export default function RegisterSkeleton() {
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
      {/* HEADER GESTÃO */}
      <View style={styles.headerBackground}>
        <Shimmer style={styles.titleLine} />
        <Shimmer style={styles.subtitleLine} />
      </View>

      {/* TABS SKELETON */}
      <View style={styles.filterSection}>
        <View style={styles.tabsContainer}>
          <Shimmer style={styles.tabItem} />
          <Shimmer style={styles.tabItem} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* SECTOR HEADER */}
          <View style={styles.sectionHeader}>
            <Shimmer style={styles.iconCircle} />
            <Shimmer style={styles.sectionTitleText} />
          </View>

          {/* FORM FIELDS SKELETON */}
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={styles.inputGroup}>
              <Shimmer style={styles.label} />
              <Shimmer style={styles.inputContainer} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FOOTER BUTTON */}
      <View style={styles.footerAction}>
        <Shimmer style={styles.btnSalvar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  shimmer: { backgroundColor: "#1e293b", borderRadius: 4 },
  
  // Header
  headerBackground: { backgroundColor: "#0f172a", padding: 25, paddingTop: 60 },
  titleLine: { width: 180, height: 26, marginBottom: 8 },
  subtitleLine: { width: 220, height: 14 },

  // Tabs
  filterSection: { paddingHorizontal: 20, marginTop: 20 },
  tabsContainer: { flexDirection: 'row', backgroundColor: '#0f172a', borderRadius: 12, padding: 6, gap: 10 },
  tabItem: { flex: 1, height: 40, borderRadius: 8 },

  // Card Content
  scrollContent: { padding: 20 },
  card: { backgroundColor: "rgba(30, 41, 59, 0.5)", borderRadius: 20, padding: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 25 },
  iconCircle: { width: 24, height: 24, borderRadius: 12 },
  sectionTitleText: { width: 160, height: 18 },

  // Inputs
  inputGroup: { marginBottom: 20 },
  label: { width: 100, height: 12, marginBottom: 10 },
  inputContainer: { width: '100%', height: 55, borderRadius: 12 },

  
  footerAction: { padding: 20, backgroundColor: "#020617" },
  btnSalvar: { width: '100%', height: 56, borderRadius: 16 }
});