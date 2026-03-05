import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
  withDelay,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { useReducedMotion } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/ThemeContext';
import { FadeIn } from '@/src/motion/FadeIn';
import { SlideUp } from '@/src/motion/SlideUp';
import { ScalePress } from '@/src/motion/ScalePress';
import { fontFamily, fontSize, spacing, radii, spring, duration } from '@/src/tokens';

export default function MotionScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.header, { paddingTop: topPad + spacing[3] }]}>
        <FadeIn>
          <View style={styles.headerRow}>
            <View>
              <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                Motion
              </Text>
              <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                Animation primitives & presets
              </Text>
            </View>
            {reducedMotion && (
              <View style={[styles.reducedBadge, { backgroundColor: theme.colors.status.warningMuted }]}>
                <Ionicons name="accessibility" size={14} color={theme.colors.status.warning} />
                <Text style={[styles.reducedText, { color: theme.colors.status.warning }]}>
                  Reduced
                </Text>
              </View>
            )}
          </View>
        </FadeIn>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + spacing[8] }]}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <FadeIn delay={0}>
          <SectionLabel label="Spring Presets" theme={theme} />
          <SpringDemo theme={theme} />
        </FadeIn>

        <FadeIn delay={80}>
          <SectionLabel label="Scale Press" theme={theme} />
          <ScalePressDemo theme={theme} />
        </FadeIn>

        <FadeIn delay={160}>
          <SectionLabel label="Fade & Slide" theme={theme} />
          <FadeSlideDemo theme={theme} />
        </FadeIn>

        <FadeIn delay={240}>
          <SectionLabel label="Sequenced" theme={theme} />
          <SequenceDemo theme={theme} />
        </FadeIn>

        <FadeIn delay={320}>
          <SectionLabel label="Duration Scale" theme={theme} />
          <DurationDemo theme={theme} />
        </FadeIn>
      </ScrollView>
    </View>
  );
}

function SectionLabel({ label, theme }: { label: string; theme: any }) {
  return (
    <Text
      style={[
        styles.sectionLabel,
        { color: theme.colors.text.tertiary, borderBottomColor: theme.colors.border.primary },
      ]}
    >
      {label}
    </Text>
  );
}

function SpringDemo({ theme }: { theme: any }) {
  const presets = [
    { name: 'Gentle', config: spring.gentle },
    { name: 'Bouncy', config: spring.bouncy },
    { name: 'Snappy', config: spring.snappy },
    { name: 'Stiff', config: spring.stiff },
  ];

  return (
    <View
      style={[
        styles.demoCard,
        { backgroundColor: theme.colors.surface.primary, borderColor: theme.colors.border.primary },
      ]}
    >
      <View style={styles.springGrid}>
        {presets.map((preset) => (
          <SpringBall key={preset.name} name={preset.name} config={preset.config} theme={theme} />
        ))}
      </View>
    </View>
  );
}

function SpringBall({ name, config, theme }: { name: string; config: any; theme: any }) {
  const translateX = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const trigger = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    translateX.value = withSequence(
      withSpring(40, config),
      withSpring(0, config)
    );
  }, []);

  return (
    <Pressable onPress={trigger} style={styles.springItem}>
      <Animated.View
        style={[
          styles.springBall,
          { backgroundColor: theme.colors.brand.primary },
          style,
        ]}
      />
      <Text style={[styles.springLabel, { color: theme.colors.text.secondary }]}>{name}</Text>
    </Pressable>
  );
}

function ScalePressDemo({ theme }: { theme: any }) {
  return (
    <View
      style={[
        styles.demoCard,
        { backgroundColor: theme.colors.surface.primary, borderColor: theme.colors.border.primary },
      ]}
    >
      <View style={styles.scalePressRow}>
        {[0.98, 0.95, 0.9, 0.8].map((scale) => (
          <ScalePress key={scale} scale={scale} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            <View
              style={[
                styles.scaleTile,
                { backgroundColor: theme.colors.brand.primaryMuted, borderColor: theme.colors.brand.primary },
              ]}
            >
              <Text style={[styles.scaleTileLabel, { color: theme.colors.brand.primary }]}>
                {scale}
              </Text>
            </View>
          </ScalePress>
        ))}
      </View>
      <Text style={[styles.demoHint, { color: theme.colors.text.tertiary }]}>
        Tap each tile to feel the scale
      </Text>
    </View>
  );
}

function FadeSlideDemo({ theme }: { theme: any }) {
  const [visible, setVisible] = useState(true);
  const [key, setKey] = useState(0);

  const toggle = useCallback(() => {
    setVisible((v) => !v);
    setKey((k) => k + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <View
      style={[
        styles.demoCard,
        { backgroundColor: theme.colors.surface.primary, borderColor: theme.colors.border.primary },
      ]}
    >
      <Pressable
        onPress={toggle}
        style={[
          styles.demoToggleBtn,
          { backgroundColor: theme.colors.brand.primaryMuted, borderColor: theme.colors.brand.primary },
        ]}
      >
        <Ionicons
          name={visible ? 'eye-off-outline' : 'eye-outline'}
          size={16}
          color={theme.colors.brand.primary}
        />
        <Text style={[styles.demoToggleBtnLabel, { color: theme.colors.brand.primary }]}>
          {visible ? 'Hide Elements' : 'Show Elements'}
        </Text>
      </Pressable>
      {visible && (
        <View key={key} style={{ gap: spacing[2], marginTop: spacing[3] }}>
          <FadeIn delay={0} duration={300}>
            <View style={[styles.fadeItem, { backgroundColor: theme.colors.brand.primaryMuted }]}>
              <Text style={[styles.fadeItemLabel, { color: theme.colors.brand.primary }]}>
                FadeIn — delay: 0
              </Text>
            </View>
          </FadeIn>
          <FadeIn delay={100} duration={300}>
            <View style={[styles.fadeItem, { backgroundColor: theme.colors.brand.secondaryMuted }]}>
              <Text style={[styles.fadeItemLabel, { color: theme.colors.brand.secondary }]}>
                FadeIn — delay: 100ms
              </Text>
            </View>
          </FadeIn>
          <SlideUp delay={200} distance={30}>
            <View style={[styles.fadeItem, { backgroundColor: theme.colors.accent.muted }]}>
              <Text style={[styles.fadeItemLabel, { color: theme.colors.accent.default }]}>
                SlideUp — delay: 200ms
              </Text>
            </View>
          </SlideUp>
        </View>
      )}
    </View>
  );
}

function SequenceDemo({ theme }: { theme: any }) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animate = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    rotation.value = withSequence(
      withTiming(360, { duration: 600 }),
      withTiming(0, { duration: 0 })
    );
    scale.value = withSequence(
      withTiming(1.2, { duration: 200 }),
      withSpring(1, spring.bouncy)
    );
    opacity.value = withSequence(
      withTiming(0.3, { duration: 200 }),
      withTiming(1, { duration: 400 })
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <View
      style={[
        styles.demoCard,
        { backgroundColor: theme.colors.surface.primary, borderColor: theme.colors.border.primary },
      ]}
    >
      <View style={styles.sequenceCenter}>
        <Pressable onPress={animate}>
          <Animated.View style={[styles.sequenceBall, { backgroundColor: theme.colors.brand.primary }, style]}>
            <Ionicons name="star" size={24} color="#FFFFFF" />
          </Animated.View>
        </Pressable>
        <Text style={[styles.demoHint, { color: theme.colors.text.tertiary }]}>
          Tap to trigger sequence
        </Text>
      </View>
    </View>
  );
}

function DurationDemo({ theme }: { theme: any }) {
  const durations = [
    { label: 'instant', ms: 50 },
    { label: 'fast', ms: 150 },
    { label: 'normal', ms: 300 },
    { label: 'slow', ms: 500 },
    { label: 'slower', ms: 750 },
  ];

  return (
    <View
      style={[
        styles.demoCard,
        { backgroundColor: theme.colors.surface.primary, borderColor: theme.colors.border.primary },
      ]}
    >
      {durations.map((d) => (
        <DurationBar key={d.label} label={d.label} ms={d.ms} theme={theme} />
      ))}
    </View>
  );
}

function DurationBar({ label, ms, theme }: { label: string; ms: number; theme: any }) {
  const width = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    width: `${width.value}%` as any,
  }));

  const trigger = useCallback(() => {
    width.value = 0;
    width.value = withTiming(100, { duration: ms });
  }, [ms]);

  return (
    <Pressable onPress={trigger} style={styles.durationRow}>
      <Text style={[styles.durationLabel, { color: theme.colors.text.secondary }]}>
        {label}
      </Text>
      <Text style={[styles.durationMs, { color: theme.colors.text.tertiary }]}>
        {ms}ms
      </Text>
      <View style={[styles.durationTrack, { backgroundColor: theme.colors.background.tertiary }]}>
        <Animated.View
          style={[
            styles.durationFill,
            { backgroundColor: theme.colors.brand.primary },
            style,
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[4],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontSize['3xl'],
    fontFamily: fontFamily.sansBold,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sans,
    marginTop: spacing[0.5],
  },
  reducedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
    borderRadius: radii.full,
    marginTop: spacing[1],
  },
  reducedText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
  },
  content: {
    paddingHorizontal: spacing[5],
    gap: spacing[4],
  },
  sectionLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansSemibold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingBottom: spacing[2],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  demoCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing[4],
  },
  springGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: spacing[2],
  },
  springItem: {
    alignItems: 'flex-start',
    gap: spacing[2],
  },
  springBall: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
  },
  springLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
  },
  scalePressRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: spacing[3],
  },
  scaleTile: {
    width: 64,
    height: 64,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleTileLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansBold,
  },
  demoHint: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
    textAlign: 'center',
    marginTop: spacing[3],
  },
  demoToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1.5],
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radii.lg,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  demoToggleBtnLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansMedium,
  },
  fadeItem: {
    paddingVertical: spacing[2.5],
    paddingHorizontal: spacing[3],
    borderRadius: radii.lg,
  },
  fadeItemLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansMedium,
  },
  sequenceCenter: {
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  sequenceBall: {
    width: 72,
    height: 72,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  durationLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansMedium,
    width: 56,
  },
  durationMs: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
    width: 36,
    textAlign: 'right',
  },
  durationTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  durationFill: {
    height: '100%',
    borderRadius: 3,
  },
});
