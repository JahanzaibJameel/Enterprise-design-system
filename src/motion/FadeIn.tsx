import React, { useEffect, ReactNode } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useReducedMotion } from 'react-native-reanimated';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  from?: number;
}

export function FadeIn({ children, delay = 0, duration = 300, from = 0 }: FadeInProps) {
  const reducedMotion = useReducedMotion();
  const opacity = useSharedValue(reducedMotion ? 1 : from);
  const translateY = useSharedValue(reducedMotion ? 0 : 12);

  useEffect(() => {
    if (reducedMotion) return;
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    translateY.value = withDelay(delay, withTiming(0, { duration }));
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}
