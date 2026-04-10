import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ScrollView } from 'react-native';

export default function UsersSkeleton() {
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
      <View style={styles.headerInfo}>
        <Shimmer style={styles.titleLine} />
        <Shimmer style={styles.subtitleLine} />
      </View>

      <View style={styles.statsContainer}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.statCard}>
            <Shimmer style={styles.statIcon} />
            <Shimmer style={styles.statValue} />
            <Shimmer style={styles.statLabel} />
          </View>
        ))}
      </View>

      <View style={styles.searchSection}>
        <Shimmer style={styles.searchBar} />
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.userCard}>
            <Shimmer style={styles.avatar} />
            <View style={styles.userInfo}>
              <Shimmer style={styles.userName} />
              <Shimmer style={styles.userRG} />
              <Shimmer style={styles.userEmail} />
              <View style={styles.badgeRow}>
                <Shimmer style={styles.badge} />
                <Shimmer style={styles.badge} />
              </View>
            </View>
            <View style={styles.actionButtons}>
              <Shimmer style={styles.iconBtn} />
              <Shimmer style={styles.iconBtn} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#020617" 
  },
  shimmer: { 
    backgroundColor: "#1e293b", 
    borderRadius: 4 
  },
  headerInfo: { 
    padding: 25, 
    paddingTop: 60 
  },
  titleLine: { 
    width: 150, 
    height: 28, 
    marginBottom: 8 
  },
  subtitleLine: { 
    width: 120, 
    height: 14 
  },
  statsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    marginBottom: 25 
  },
  statCard: { 
    width: '30%', 
    height: 100, 
    backgroundColor: "rgba(30, 41, 59, 0.5)", 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8 
  },
  statIcon: { 
    width: 20, 
    height: 20, 
    borderRadius: 5 
  },
  statValue: { 
    width: 30, 
    height: 20 
  },
  statLabel: { 
    width: 50, 
    height: 10 
  },
  searchSection: { 
    paddingHorizontal: 20, 
    marginBottom: 20 
  },
  searchBar: { 
    width: '100%', 
    height: 55, 
    borderRadius: 15 
  },
  listContent: { 
    padding: 20 
  },
  userCard: { 
    flexDirection: 'row', 
    backgroundColor: "rgba(30, 41, 59, 0.5)", 
    borderRadius: 20, 
    padding: 15, 
    marginBottom: 12, 
    alignItems: 'center' 
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 15 
  },
  userInfo: { 
    flex: 1, 
    gap: 6 
  },
  userName: { 
    width: '80%', 
    height: 16 
  },
  userRG: { 
    width: '40%', 
    height: 12 
  },
  userEmail: { 
    width: '60%', 
    height: 10 
  },
  badgeRow: { 
    flexDirection: 'row', 
    gap: 8, 
    marginTop: 4 
  },
  badge: { 
    width: 50, 
    height: 16, 
    borderRadius: 6 
  },
  actionButtons: { 
    flexDirection: 'row', 
    gap: 10 
  },
  iconBtn: { 
    width: 35, 
    height: 35, 
    borderRadius: 10 
  }
});