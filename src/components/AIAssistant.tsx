import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface AIAssistantProps {
  visible: boolean;
  onClose: () => void;
  onSuggestion: (suggestion: string) => void;
}

export function AIAssistant({ visible, onClose, onSuggestion }: AIAssistantProps) {
  const { theme } = useTheme();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Simulate AI analysis
      setIsThinking(true);
      setTimeout(() => {
        const aiSuggestions = [
          'Consider using a larger touch target for better accessibility',
          'This component could benefit from haptic feedback',
          'Try adding a subtle loading animation',
          'Consider implementing keyboard shortcuts',
          'Add voice control support for hands-free interaction'
        ];
        setSuggestions(aiSuggestions);
        setIsThinking(false);
      }, 1500);

      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 400,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleSuggestion = useCallback((suggestion: string) => {
    onSuggestion(suggestion);
    onClose();
  }, [onSuggestion, onClose]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface.overlay,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          🤖 AI Design Assistant
        </Text>
        <Text onPress={onClose} style={[styles.close, { color: theme.colors.text.secondary }]}>
          ✕
        </Text>
      </View>

      <View style={styles.content}>
        {isThinking ? (
          <View style={styles.thinking}>
            <Text style={[styles.thinkingText, { color: theme.colors.text.secondary }]}>
              Analyzing design patterns...
            </Text>
            <View style={styles.dots}>
              <Animated.Text style={[styles.dot, { color: theme.colors.brand.primary }]}>●</Animated.Text>
              <Animated.Text style={[styles.dot, { color: theme.colors.brand.primary }]}>●</Animated.Text>
              <Animated.Text style={[styles.dot, { color: theme.colors.brand.primary }]}>●</Animated.Text>
            </View>
          </View>
        ) : (
          <View style={styles.suggestions}>
            {suggestions.map((suggestion, index) => (
              <View
                key={index}
                style={[
                  styles.suggestionItem,
                  { backgroundColor: theme.colors.surface.primary }
                ]}
              >
                <Text
                  style={[styles.suggestionText, { color: theme.colors.text.primary }]}
                  onPress={() => handleSuggestion(suggestion)}
                >
                  💡 {suggestion}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  close: {
    fontSize: 20,
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  thinking: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 16,
  },
  thinkingText: {
    fontSize: 14,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    fontSize: 12,
  },
  suggestions: {
    gap: 12,
  },
  suggestionItem: {
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  suggestionText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
