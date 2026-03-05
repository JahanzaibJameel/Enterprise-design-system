import React, { useEffect, ReactNode } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useReducedMotion } from 'react-native-reanimated';
import { spring } from '../tokens';

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
}

export function SlideUp({ children, delay = 0, distance = 40 }: SlideUpProps) {
  const reducedMotion = useReducedMotion();
  const translateY = useSharedValue(reducedMotion ? 0 : distance);
  const opacity = useSharedValue(reducedMotion ? 1 : 0);

  useEffect(() => {
    if (reducedMotion) return;
    translateY.value = withDelay(delay, withSpring(0, spring.gentle));
    opacity.value = withDelay(delay, withTiming(1, { duration: 250 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}
