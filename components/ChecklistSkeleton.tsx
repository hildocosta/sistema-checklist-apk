import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

export default function ChecklistSkeleton() {
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
        <View style={styles.headerTop}>
          <View>
            <Shimmer style={styles.titleLine} />
            <Shimmer style={styles.subtitleLine} />
          </View>
          <View style={styles.circlePlaceholder} />
        </View>

        <View style={styles.statsRow}>
          <Shimmer style={styles.progressBar} />
          <Shimmer style={styles.statsText} />
        </View>
      </View>

      {/* CATEGORIAS (TABS) HORIZONTAIS */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          {[1, 2, 3, 4].map((i) => (
            <Shimmer key={i} style={styles.tabPlaceholder} />
          ))}
        </ScrollView>
      </View>

      {/* SEARCH BAR SKELETON */}
      <View style={styles.searchSection}>
        <Shimmer style={styles.searchBar} />
      </View>

      {/* LISTA DE CARDS SKELETON */}
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardMainRow}>
              <View style={{ flex: 1 }}>
                <View style={styles.badgeRow}>
                  <Shimmer style={styles.badgeSmall} />
                  <Shimmer style={styles.badgeMedium} />
                </View>
                <Shimmer style={styles.itemDesc} />
              </View>
              <Shimmer style={styles.actionBtn} />
            </View>
            
            <View style={styles.cardFooter}>
              <Shimmer style={styles.miniInput} />
              <Shimmer style={[styles.miniInput, { width: 60 }]} />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FOOTER BUTTON */}
      <View style={styles.footerAction}>
        <Shimmer style={styles.sendButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  shimmer: { backgroundColor: "#1e293b", borderRadius: 4 },
  
  // Header
  headerBackground: { backgroundColor: "#0f172a", padding: 20, paddingTop: 50, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  titleLine: { width: 140, height: 22, marginBottom: 8 },
  subtitleLine: { width: 180, height: 14 },
  circlePlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#1e293b" },
  statsRow: { gap: 10 },
  progressBar: { width: '100%', height: 8, borderRadius: 4 },
  statsText: { width: 200, height: 12 },

  // Tabs
  filterSection: { marginVertical: 15 },
  tabsContainer: { paddingHorizontal: 20, gap: 10 },
  tabPlaceholder: { width: 100, height: 38, borderRadius: 20 },

  // Search
  searchSection: { paddingHorizontal: 20, marginBottom: 15 },
  searchBar: { width: '100%', height: 50, borderRadius: 12 },

  // Cards
  list: { paddingHorizontal: 20, gap: 15 },
  card: { backgroundColor: "rgba(30, 41, 59, 0.5)", borderRadius: 16, padding: 16, borderLeftWidth: 4, borderLeftColor: "#1e293b" },
  cardMainRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  badgeSmall: { width: 50, height: 18 },
  badgeMedium: { width: 80, height: 18 },
  itemDesc: { width: '90%', height: 20, borderRadius: 6 },
  actionBtn: { width: 44, height: 44, borderRadius: 12 },
  
  // Card Footer
  cardFooter: { flexDirection: 'row', gap: 10, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)", paddingTop: 12 },
  miniInput: { flex: 1, height: 35, borderRadius: 8 },

  // Footer
  footerAction: { padding: 20, backgroundColor: "#020617" },
  sendButton: { width: '100%', height: 56, borderRadius: 16 }
});