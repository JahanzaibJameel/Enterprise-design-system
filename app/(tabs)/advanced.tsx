import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/src/theme/ThemeContext';
import { Button } from '@/src/components/Button';
import { AIAssistant } from '@/src/components/AIAssistant';
import { HapticFeedback } from '@/src/components/HapticFeedback';
import { GestureControl } from '@/src/components/GestureControl';
import { VoiceCommand } from '@/src/components/VoiceCommand';
import { ARPreview } from '@/src/components/ARPreview';
import { NeuralDesign } from '@/src/components/NeuralDesign';

export default function AdvancedFeaturesScreen() {
  const { theme, setThemeId } = useTheme();
  const [activeFeature, setActiveFeature] = useState<string>('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const handleAISuggestion = (suggestion: string) => {
    setAiSuggestions(prev => [...prev, suggestion]);
  };

  const handleVoiceCommand = (command: string, confidence: number) => {
    // Handle voice commands
    if (command.includes('dark theme')) {
      setThemeId('dark');
    } else if (command.includes('light theme')) {
      setThemeId('light');
    } else if (command.includes('high contrast')) {
      setThemeId('highContrast');
    }
  };

  const features = [
    {
      id: 'ai',
      name: '🤖 AI Design Assistant',
      description: 'Get AI-powered design suggestions and optimizations',
      component: AIAssistant,
      props: {
        visible: activeFeature === 'ai',
        onClose: () => setActiveFeature(''),
        onSuggestion: handleAISuggestion,
      },
    },
    {
      id: 'haptic',
      name: '📳 Haptic Feedback',
      description: 'Advanced tactile feedback with multiple patterns',
      component: HapticFeedback,
      props: {
        children: (
          <Text style={[styles.demoButtonText, { color: '#FFFFFF' }]}>
            📳 Haptic Demo
          </Text>
        ),
        feedbackType: 'success',
        onPress: () => console.log('Haptic feedback triggered'),
      },
    },
    {
      id: 'gesture',
      name: '🎮 Advanced Gestures',
      description: 'Multi-touch gestures and spatial interactions',
      component: GestureControl,
      props: {
        onSwipeLeft: () => console.log('Swipe left'),
        onSwipeRight: () => console.log('Swipe right'),
        onSwipeUp: () => console.log('Swipe up'),
        onSwipeDown: () => console.log('Swipe down'),
        onPinch: (scale: number) => console.log('Pinch:', scale),
        onRotate: (rotation: number) => console.log('Rotate:', rotation),
      },
    },
    {
      id: 'voice',
      name: '🎤 Voice Control',
      description: 'Hands-free voice commands and dictation',
      component: VoiceCommand,
      props: {
        isActive: activeFeature === 'voice',
        onCommand: handleVoiceCommand,
      },
    },
    {
      id: 'ar',
      name: '🥽 AR Preview',
      description: 'Augmented reality design visualization',
      component: ARPreview,
      props: {
        visible: activeFeature === 'ar',
        onClose: () => setActiveFeature(''),
        onDesignGenerated: (design: any) => console.log('AR Design:', design),
      },
    },
    {
      id: 'neural',
      name: '🧠 Neural Design',
      description: 'AI-powered component generation',
      component: NeuralDesign,
      props: {
        visible: activeFeature === 'neural',
        onClose: () => setActiveFeature(''),
        onDesignGenerated: (design: any) => console.log('Neural Design:', design),
      },
    },
  ];

  const ActiveComponent = features.find(f => f.id === activeFeature)?.component;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          🚀 Advanced Features (2026)
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Cutting-edge design system capabilities
        </Text>
      </View>

      {/* Feature Grid */}
      <View style={styles.featureGrid}>
        {features.map((feature) => (
          <View
            key={feature.id}
            style={[
              styles.featureCard,
              { backgroundColor: theme.colors.surface.primary },
            ]}
          >
            <Text style={[styles.featureName, { color: theme.colors.text.primary }]}>
              {feature.name}
            </Text>
            <Text style={[styles.featureDescription, { color: theme.colors.text.secondary }]}>
              {feature.description}
            </Text>
            <Button
              label={activeFeature === feature.id ? 'Close' : 'Try It'}
              variant={activeFeature === feature.id ? 'outline' : 'solid'}
              size="sm"
              onPress={() => setActiveFeature(activeFeature === feature.id ? '' : feature.id)}
            />
          </View>
        ))}
      </View>

      {/* AI Suggestions History */}
      {aiSuggestions.length > 0 && (
        <View style={[styles.suggestionsContainer, { backgroundColor: theme.colors.surface.primary }]}>
          <Text style={[styles.suggestionsTitle, { color: theme.colors.text.primary }]}>
            💡 AI Suggestions History
          </Text>
          {aiSuggestions.map((suggestion, index) => (
            <Text key={index} style={[styles.suggestion, { color: theme.colors.text.secondary }]}>
              {index + 1}. {suggestion}
            </Text>
          ))}
        </View>
      )}

      {/* Active Feature Component */}
      {ActiveComponent && (() => {
        const feature = features.find(f => f.id === activeFeature);
        return feature ? <ActiveComponent {...(feature.props as any)} /> : null;
      })()}

      {/* Feature Showcase */}
      <View style={styles.showcase}>
        <Text style={[styles.showcaseTitle, { color: theme.colors.text.primary }]}>
          🎯 2026 Design System Capabilities
        </Text>
        <View style={styles.capabilityList}>
          <Text style={[styles.capability, { color: theme.colors.text.secondary }]}>
            ✨ AI-powered design assistance
          </Text>
          <Text style={[styles.capability, { color: theme.colors.text.secondary }]}>
            🎯 Contextual micro-interactions
          </Text>
          <Text style={[styles.capability, { color: theme.colors.text.secondary }]}>
            📳 Advanced haptic feedback
          </Text>
          <Text style={[styles.capability, { color: theme.colors.text.secondary }]}>
            🎮 Multi-touch gesture control
          </Text>
          <Text style={[styles.capability, { color: theme.colors.text.secondary }]}>
            🎤 Voice-first interactions
          </Text>
          <Text style={[styles.capability, { color: theme.colors.text.secondary }]}>
            🥽 AR/VR design preview
          </Text>
          <Text style={[styles.capability, { color: theme.colors.text.secondary }]}>
            🧠 Neural component generation
          </Text>
          <Text style={[styles.capability, { color: theme.colors.text.secondary }]}>
            ⚡ Real-time performance optimization
          </Text>
          <Text style={[styles.capability, { color: theme.colors.text.secondary }]}>
            🌐 Cross-platform consistency
          </Text>
          <Text style={[styles.capability, { color: theme.colors.text.secondary }]}>
            ♿ Universal accessibility
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    gap: 16,
  },
  featureCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  suggestionsContainer: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  suggestion: {
    fontSize: 13,
    marginBottom: 4,
    paddingLeft: 8,
  },
  showcase: {
    padding: 20,
    paddingTop: 10,
  },
  showcaseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  capabilityList: {
    gap: 8,
  },
  demoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  capability: {
    fontSize: 14,
    lineHeight: 20,
  },
});
