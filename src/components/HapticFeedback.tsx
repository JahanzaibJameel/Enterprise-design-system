import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface HapticFeedbackProps {
  children: React.ReactNode;
  feedbackType?: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';
  onPress?: () => void;
}

export function HapticFeedback({ children, feedbackType = 'medium', onPress }: HapticFeedbackProps) {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);

  const triggerHaptic = useCallback(() => {
    // Simulate haptic feedback (in real app, use expo-haptics)
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [50],
        success: [10, 50, 10],
        warning: [30, 30, 30],
        error: [50, 30, 50],
      };
      navigator.vibrate(patterns[feedbackType]);
    }
  }, [feedbackType]);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 300,
      friction: 8,
    }).start();
    triggerHaptic();
  }, [scaleAnim, triggerHaptic]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 8,
    }).start();
    if (onPress) {
      onPress();
    }
  }, [scaleAnim, onPress]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          backgroundColor: isPressed ? theme.colors.interactive.pressed : 'transparent',
        },
      ]}
      onStartShouldSetResponder={() => true}
      onResponderGrant={handlePressIn}
      onResponderRelease={handlePressOut}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
});
