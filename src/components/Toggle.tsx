import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/ThemeContext';
import type { Theme } from '../theme/themes/index';
import { spring } from '../tokens';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 31;
const THUMB_SIZE = 26;
const PADDING = 2;
const TRAVEL = TRACK_WIDTH - THUMB_SIZE - PADDING * 2;

export function Toggle({ value, onValueChange, disabled = false, accessibilityLabel }: ToggleProps) {
  const { theme } = useTheme();
  const progress = useSharedValue(value ? 1 : 0);
  const shadowStyle = getShadowStyle(theme);

  React.useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, spring.snappy);
  }, [value]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: disabled ? theme.colors.interactive.disabled : (value ? theme.colors.brand.primary : theme.colors.surface.secondary),
    borderWidth: 2,
    borderColor: value ? theme.colors.brand.primary : theme.colors.border.primary,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * TRAVEL }],
  }));

  const handlePress = useCallback(() => {
    if (!disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onValueChange(!value);
    }
  }, [disabled, value, onValueChange]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessible
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
      style={{ opacity: disabled ? 0.4 : 1 }}
    >
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View
          style={[
            styles.thumb,
            thumbStyle,
            { ...shadowStyle },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const getShadowStyle = (theme: Theme) => ({
  shadowColor: theme.colors.text.primary,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
});

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    padding: PADDING,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
  },
});
