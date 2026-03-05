import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView, TextInput } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface NeuralDesignProps {
  visible: boolean;
  onClose: () => void;
  onDesignGenerated: (design: any) => void;
}

export function NeuralDesign({ visible, onClose, onDesignGenerated }: NeuralDesignProps) {
  const { theme } = useTheme();
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedDesign, setGeneratedDesign] = useState<any>(null);
  const [neuralActivity, setNeuralActivity] = useState<number[]>([]);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Simulate neural network activity
      const interval = setInterval(() => {
        setNeuralActivity(prev => 
          Array.from({ length: 20 }, () => Math.random())
        );
      }, 100);

      return () => clearInterval(interval);
    }
  }, [visible]);

  const generateDesign = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Animate neural network
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();

    // Simulate AI design generation
    setTimeout(() => {
      const design = {
        type: 'component',
        name: 'Neural Button',
        description: 'AI-generated adaptive button component',
        features: [
          'Adaptive sizing based on user interaction',
          'Dynamic color adjustment',
          'Contextual micro-interactions',
          'Accessibility-first design',
          'Performance optimized animations'
        ],
        code: `
// AI-Generated Component
const NeuralButton = ({ 
  variant, 
  size, 
  adaptive = true,
  ...props 
}) => {
  const [metrics, setMetrics] = useMetrics();
  const adaptiveStyles = adaptive 
    ? generateAdaptiveStyles(metrics) 
    : baseStyles;
    
  return (
    <AnimatedPressable
      style={[adaptiveStyles, props.style]}
      onLayout={trackInteraction}
      {...props}
    >
      {props.children}
    </AnimatedPressable>
  );
};`,
        tokens: {
          primary: '#6366F1',
          secondary: '#8B5CF6',
          accent: '#06B6D4',
          success: '#10B981',
        },
      };

      setGeneratedDesign(design);
      setIsGenerating(false);
      onDesignGenerated(design);
    }, 3000);
  };

  if (!visible) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface.overlay }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          🧠 Neural Design Generator
        </Text>
        <Text onPress={onClose} style={[styles.close, { color: theme.colors.text.secondary }]}>
          ✕
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Neural Network Visualization */}
        <View style={[styles.neuralContainer, { backgroundColor: theme.colors.surface.primary }]}>
          <Text style={[styles.neuralTitle, { color: theme.colors.text.primary }]}>
            Neural Network Activity
          </Text>
          <View style={styles.neuralGrid}>
            {neuralActivity.map((activity, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.neuron,
                  {
                    backgroundColor: activity > 0.7 
                      ? theme.colors.status.error 
                      : activity > 0.4 
                        ? theme.colors.status.warning 
                        : theme.colors.brand.primary,
                    opacity: Animated.add(0.3, Animated.multiply(activity, 0.7)),
                    transform: [
                      {
                        scale: Animated.add(0.8, Animated.multiply(activity, 0.4)),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Prompt Input */}
        <View style={[styles.promptContainer, { backgroundColor: theme.colors.surface.primary }]}>
          <Text style={[styles.promptTitle, { color: theme.colors.text.primary }]}>
            Design Prompt
          </Text>
          <TextInput
            style={[
              styles.promptInput,
              {
                color: theme.colors.text.primary,
                borderColor: theme.colors.border.primary,
              },
            ]}
            placeholder="Describe the component you want to generate..."
            placeholderTextColor={theme.colors.text.tertiary}
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={3}
          />
          <Text
            style={[
              styles.generateButton,
              {
                backgroundColor: isGenerating 
                  ? theme.colors.interactive.disabled 
                  : theme.colors.brand.primary,
              },
            ]}
            onPress={generateDesign}
            disabled={isGenerating}
          >
            {isGenerating ? '🔄 Generating...' : '✨ Generate Design'}
          </Text>
        </View>

        {/* Generated Design */}
        {generatedDesign && (
          <View style={[styles.resultContainer, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.resultTitle, { color: theme.colors.text.primary }]}>
              🎨 Generated Design
            </Text>
            <Text style={[styles.resultName, { color: theme.colors.brand.primary }]}>
              {generatedDesign.name}
            </Text>
            <Text style={[styles.resultDescription, { color: theme.colors.text.secondary }]}>
              {generatedDesign.description}
            </Text>
            
            <View style={styles.features}>
              <Text style={[styles.featuresTitle, { color: theme.colors.text.primary }]}>
                Features:
              </Text>
              {generatedDesign.features.map((feature: string, index: number) => (
                <Text key={index} style={[styles.feature, { color: theme.colors.text.secondary }]}>
                  • {feature}
                </Text>
              ))}
            </View>

            <View style={styles.tokenPreview}>
              <Text style={[styles.tokenTitle, { color: theme.colors.text.primary }]}>
                Generated Tokens:
              </Text>
              <View style={styles.tokenColors}>
                {Object.entries(generatedDesign.tokens).map(([name, color]: [string, any]) => (
                  <View key={name} style={styles.tokenItem}>
                    <View style={[styles.tokenColor, { backgroundColor: color }]} />
                    <Text style={[styles.tokenName, { color: theme.colors.text.secondary }]}>
                      {name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    fontSize: 18,
    fontWeight: '600',
  },
  close: {
    fontSize: 20,
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  neuralContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  neuralTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  neuralGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  neuron: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 2,
  },
  promptContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  promptInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  generateButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    padding: 16,
    borderRadius: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  features: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  feature: {
    fontSize: 13,
    marginBottom: 4,
  },
  tokenPreview: {
    marginTop: 16,
  },
  tokenTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  tokenColors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tokenItem: {
    alignItems: 'center',
    gap: 4,
  },
  tokenColor: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  tokenName: {
    fontSize: 12,
  },
});
