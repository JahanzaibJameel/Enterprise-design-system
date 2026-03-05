import React, { ReactNode, useCallback } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useReducedMotion } from 'react-native-reanimated';
import { spring } from '../tokens';

interface ScalePressProps {
  children: ReactNode;
  onPress?: () => void;
  scale?: number;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ScalePress({ children, onPress, scale = 0.96, disabled = false }: ScalePressProps) {
  const reducedMotion = useReducedMotion();
  const scaleValue = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    if (!reducedMotion) {
      scaleValue.value = withSpring(scale, spring.snappy);
    }
  }, [reducedMotion, scale]);

  const handlePressOut = useCallback(() => {
    if (!reducedMotion) {
      scaleValue.value = withSpring(1, spring.gentle);
    }
  }, [reducedMotion]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={style}
    >
      {children}
    </AnimatedPressable>
  );
}
