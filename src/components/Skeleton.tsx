import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeContext';
import { radii } from '../tokens';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width, height = 16, borderRadius = radii.sm, style }: SkeletonProps) {
  const { theme } = useTheme();
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 0.5, 1], [0.4, 0.8, 0.4]),
  }));

  return (
    <Animated.View
      style={[
        {
          width: width ?? '100%',
          height,
          borderRadius,
          backgroundColor: theme.isDark
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.06)',
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

export function SkeletonCard() {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface.primary,
          borderRadius: radii.xl,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <Skeleton width={40} height={40} borderRadius={radii.full} />
        <View style={styles.cardHeaderText}>
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
      <Skeleton height={12} style={{ marginTop: 12 }} />
      <Skeleton width="80%" height={12} style={{ marginTop: 8 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  cardHeaderText: {
    flex: 1,
    gap: 6,
  },
});
