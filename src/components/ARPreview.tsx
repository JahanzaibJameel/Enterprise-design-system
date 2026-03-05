import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ARPreviewProps {
  visible: boolean;
  onClose: () => void;
}

export function ARPreview({ visible, onClose }: ARPreviewProps) {
  const { theme } = useTheme();
  const [isARSupported, setIsARSupported] = useState(false);
  const [arObjects, setArObjects] = useState<any[]>([]);
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Check AR support (in real app, use AR libraries)
    const checkARSupport = async () => {
      const supported = 'xr' in navigator;
      setIsARSupported(supported);
      
      if (supported) {
        // Simulate AR objects
        setArObjects([
          { id: 1, name: 'Design Token', color: '#4F46E5', position: { x: 0, y: 0, z: -2 } },
          { id: 2, name: 'Component', color: '#10B981', position: { x: 1, y: 0, z: -3 } },
          { id: 3, name: 'Animation', color: '#F59E0B', position: { x: -1, y: 0, z: -2.5 } },
        ]);
      }
    };

    if (visible) {
      checkARSupport();
      startAnimation();
    }
  }, [visible]);

  const startAnimation = () => {
    // Rotate objects
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 360,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse scale
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  if (!visible) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface.overlay }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          🥽 AR Design Preview
        </Text>
        <Text onPress={onClose} style={[styles.close, { color: theme.colors.text.secondary }]}>
          ✕
        </Text>
      </View>

      {!isARSupported ? (
        <View style={styles.notSupported}>
          <Text style={[styles.notSupportedText, { color: theme.colors.text.secondary }]}>
            AR is not supported on this device
          </Text>
          <Text style={[styles.notSupportedSubtext, { color: theme.colors.text.tertiary }]}>
            Try on a device with AR capabilities
          </Text>
        </View>
      ) : (
        <View style={styles.arView}>
          {/* Simulated AR Scene */}
          <View style={styles.scene}>
            {arObjects.map((obj) => (
              <Animated.View
                key={obj.id}
                style={[
                  styles.arObject,
                  {
                    backgroundColor: obj.color,
                    transform: [
                      { translateX: obj.position.x * 50 },
                      { translateY: obj.position.y * 50 },
                      { scale: scaleAnim },
                      { rotate: rotationAnim.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg'],
                      }) },
                    ],
                  },
                ]}
              >
                <Text style={styles.objectLabel}>{obj.name}</Text>
              </Animated.View>
            ))}
          </View>

          {/* AR Controls */}
          <View style={[styles.controls, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.controlsTitle, { color: theme.colors.text.primary }]}>
              AR Controls
            </Text>
            <View style={styles.controlButtons}>
              <Text style={[styles.controlButton, { backgroundColor: theme.colors.brand.primary }]}>
                📍 Reset Position
              </Text>
              <Text style={[styles.controlButton, { backgroundColor: theme.colors.status.success }]}>
                🎯 Focus Object
              </Text>
              <Text style={[styles.controlButton, { backgroundColor: theme.colors.status.warning }]}>
                📐 Measure
              </Text>
            </View>
          </View>

          {/* AR Info */}
          <View style={[styles.info, { backgroundColor: theme.colors.surface.secondary }]}>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              💡 Tip: Move your device to explore the 3D design space
            </Text>
          </View>
        </View>
      )}
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
  notSupported: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  notSupportedText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  notSupportedSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  arView: {
    flex: 1,
    padding: 20,
  },
  scene: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    marginBottom: 20,
  },
  arObject: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  objectLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  controls: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  controlsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  info: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
