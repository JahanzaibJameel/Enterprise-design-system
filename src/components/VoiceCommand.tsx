import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import type { Theme } from '../theme/themes/index';

interface VoiceCommandProps {
  onCommand: (command: string, confidence: number) => void;
  isActive: boolean;
}

export function VoiceCommand({ onCommand, isActive }: VoiceCommandProps) {
  const { theme } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startListening = useCallback(() => {
    setIsListening(true);
    
    // Simulate voice recognition (in real app, use expo-speech or Web Speech API)
    const mockCommands = [
      { text: 'Switch to dark theme', confidence: 0.95 },
      { text: 'Show accessibility options', confidence: 0.87 },
      { text: 'Enable high contrast', confidence: 0.92 },
      { text: 'Increase font size', confidence: 0.78 },
    ];

    // Start pulse animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // Simulate voice recognition after delay
    setTimeout(() => {
      const command = mockCommands[Math.floor(Math.random() * mockCommands.length)];
      setTranscript(command.text);
      setConfidence(command.confidence);
      onCommand(command.text, command.confidence);
      pulse.stop();
      setIsListening(false);
    }, 2000 + Math.random() * 2000);
  }, [onCommand, pulseAnim]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    setTranscript('');
    setConfidence(0);
  }, []);

  const styles = getStyles(theme);

  useEffect(() => {
    if (isActive) {
      startListening();
    } else {
      stopListening();
    }
  }, [isActive, startListening, stopListening]);

  if (!isActive) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface.overlay }]}>
      <View style={styles.microphoneContainer}>
        <Animated.View
          style={[
            styles.microphone,
            {
              backgroundColor: isListening ? theme.colors.status.error : theme.colors.surface.primary,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <Text style={[styles.microphoneIcon, { color: theme.colors.text.primary }]}>
            🎤
          </Text>
        </Animated.View>
        
        {isListening && (
          <View style={styles.waveform}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Animated.View
                key={i}
                style={[
                  styles.waveBar,
                  {
                    backgroundColor: theme.colors.brand.primary,
                    height: Math.random() * 30 + 10,
                  },
                ]}
              />
            ))}
          </View>
        )}
      </View>

      <View style={styles.transcriptContainer}>
        <Text style={[styles.transcript, { color: theme.colors.text.primary }]}>
          {transcript || 'Listening...'}
        </Text>
        {confidence > 0 && (
          <Text style={[styles.confidence, { color: theme.colors.text.secondary }]}>
            Confidence: {Math.round(confidence * 100)}%
          </Text>
        )}
      </View>
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: theme.colors.text.primary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  microphoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  microphone: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  microphoneIcon: {
    fontSize: 24,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  waveBar: {
    width: 4,
    borderRadius: 2,
  },
  transcriptContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  transcript: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  confidence: {
    fontSize: 12,
  },
});
