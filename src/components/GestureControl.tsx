import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface GestureControlProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onRotate?: (rotation: number) => void;
}

export function GestureControl({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onRotate,
}: GestureControlProps) {
  const { theme } = useTheme();
  const [gesture, setGesture] = useState<string>('');
  const [gestureData, setGestureData] = useState<any>(null);
  const gestureAnim = useRef(new Animated.Value(0)).current;

  const handleGesture = useCallback((type: string, data?: any) => {
    setGesture(type);
    setGestureData(data);
    
    // Trigger callbacks
    switch (type) {
      case 'swipe-left':
        onSwipeLeft?.();
        break;
      case 'swipe-right':
        onSwipeRight?.();
        break;
      case 'swipe-up':
        onSwipeUp?.();
        break;
      case 'swipe-down':
        onSwipeDown?.();
        break;
      case 'pinch':
        onPinch?.(data.scale);
        break;
      case 'rotate':
        onRotate?.(data.rotation);
        break;
    }

    // Animate gesture indicator
    Animated.sequence([
      Animated.timing(gestureAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(gestureAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Clear gesture after animation
    setTimeout(() => {
      setGesture('');
      setGestureData(null);
    }, 1000);
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPinch, onRotate, gestureAnim]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.gestureArea}
        contentContainerStyle={styles.gestureContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {/* Gesture Indicator */}
      <Animated.View
        style={[
          styles.gestureIndicator,
          {
            backgroundColor: theme.colors.brand.primary,
            opacity: gestureAnim,
            transform: [
              {
                scale: gestureAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1.2],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.gestureText}>
          {gesture === 'swipe-left' && '← Swipe Left'}
          {gesture === 'swipe-right' && 'Swipe Right →'}
          {gesture === 'swipe-up' && '↑ Swipe Up'}
          {gesture === 'swipe-down' && '↓ Swipe Down'}
          {gesture === 'pinch' && `🔍 Pinch: ${gestureData?.scale?.toFixed(1)}x`}
          {gesture === 'rotate' && `🔄 Rotate: ${gestureData?.rotation?.toFixed(0)}°`}
        </Text>
      </Animated.View>

      {/* Gesture Instructions */}
      <View style={[styles.instructions, { backgroundColor: theme.colors.surface.primary }]}>
        <Text style={[styles.instructionTitle, { color: theme.colors.text.primary }]}>
          🎮 Advanced Gestures
        </Text>
        <View style={styles.instructionList}>
          <Text style={[styles.instruction, { color: theme.colors.text.secondary }]}>
            • Swipe left/right for navigation
          </Text>
          <Text style={[styles.instruction, { color: theme.colors.text.secondary }]}>
            • Swipe up/down for actions
          </Text>
          <Text style={[styles.instruction, { color: theme.colors.text.secondary }]}>
            • Pinch to zoom
          </Text>
          <Text style={[styles.instruction, { color: theme.colors.text.secondary }]}>
            • Rotate to adjust
          </Text>
        </View>
      </View>

      {/* Demo Buttons */}
      <View style={styles.demoButtons}>
        <View style={styles.buttonRow}>
          <Text
            style={[
              styles.demoButton,
              { backgroundColor: theme.colors.brand.primary },
            ]}
            onPress={() => handleGesture('swipe-left')}
          >
            ← Left
          </Text>
          <Text
            style={[
              styles.demoButton,
              { backgroundColor: theme.colors.brand.primary },
            ]}
            onPress={() => handleGesture('swipe-right')}
          >
            Right →
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <Text
            style={[
              styles.demoButton,
              { backgroundColor: theme.colors.status.success },
            ]}
            onPress={() => handleGesture('pinch', { scale: 1.5 })}
          >
            🔍 Pinch
          </Text>
          <Text
            style={[
              styles.demoButton,
              { backgroundColor: theme.colors.status.warning },
            ]}
            onPress={() => handleGesture('rotate', { rotation: 45 })}
          >
            🔄 Rotate
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gestureArea: {
    flex: 1,
  },
  gestureContent: {
    flexGrow: 1,
  },
  gestureIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -30,
    marginLeft: -100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
  },
  gestureText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  instructions: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionList: {
    gap: 4,
  },
  instruction: {
    fontSize: 12,
    lineHeight: 16,
  },
  demoButtons: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  demoButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
