import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { fontSize, spacing, fontFamily } from '../tokens';

interface PerformanceMetrics {
  renderTime: number;
  fps: number;
  memoryUsage: number;
  reRenders: number;
  themeSwitchLatency: number;
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

export function PerformanceMonitor({ onMetricsUpdate }: PerformanceMonitorProps) {
  const { theme } = useTheme();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    fps: 60,
    memoryUsage: 0,
    reRenders: 0,
    themeSwitchLatency: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  // Track render time
  const renderStart = React.useRef<number>(Date.now());
  const renderCount = React.useRef<number>(0);

  useEffect(() => {
    const renderEnd = Date.now();
    const renderTime = renderEnd - renderStart.current;
    renderCount.current += 1;
    
    setMetrics(prev => ({
      ...prev,
      renderTime,
      reRenders: renderCount.current,
    }));

    renderStart.current = Date.now();
  });

  // Track FPS
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      if (isVisible) {
        requestAnimationFrame(measureFPS);
      }
    };

    if (isVisible) {
      requestAnimationFrame(measureFPS);
    }
  }, [isVisible]);

  // Track memory usage (if available)
  useEffect(() => {
    if ('memory' in performance && isVisible) {
      const interval = setInterval(() => {
        const memory = (performance as any).memory;
        const memoryUsage = Math.round(memory.usedJSHeapSize / 1048576); // Convert to MB
        
        setMetrics(prev => ({
          ...prev,
          memoryUsage,
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Track theme switch latency
  const measureThemeSwitch = useCallback(() => {
    const start = performance.now();
    return () => {
      const latency = Math.round(performance.now() - start);
      setMetrics(prev => ({
        ...prev,
        themeSwitchLatency: latency,
      }));
    };
  }, []);

  // Expose metrics to parent
  useEffect(() => {
    onMetricsUpdate?.(metrics);
  }, [metrics, onMetricsUpdate]);

  if (!isVisible) {
    return (
      <View style={styles.toggleContainer}>
        <Text 
          style={[styles.toggleText, { color: theme.colors.text.tertiary }]}
          onPress={() => setIsVisible(true)}
        >
          📊
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Performance Metrics
        </Text>
        <Text 
          style={[styles.closeText, { color: theme.colors.text.tertiary }]}
          onPress={() => setIsVisible(false)}
        >
          ✕
        </Text>
      </View>
      
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
            Render Time
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text.primary }]}>
            {metrics.renderTime}ms
          </Text>
        </View>
        
        <View style={styles.metricItem}>
          <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
            FPS
          </Text>
          <Text style={[
            styles.metricValue, 
            { color: metrics.fps >= 55 ? theme.colors.status.success : theme.colors.status.error }
          ]}>
            {metrics.fps}
          </Text>
        </View>
        
        <View style={styles.metricItem}>
          <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
            Memory
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text.primary }]}>
            {metrics.memoryUsage}MB
          </Text>
        </View>
        
        <View style={styles.metricItem}>
          <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
            Re-renders
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text.primary }]}>
            {metrics.reRenders}
          </Text>
        </View>
        
        <View style={styles.metricItem}>
          <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
            Theme Switch
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text.primary }]}>
            {metrics.themeSwitchLatency}ms
          </Text>
        </View>
      </View>
    </View>
  );
}

// Hook for other components to use
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    fps: 60,
    memoryUsage: 0,
    reRenders: 0,
    themeSwitchLatency: 0,
  });

  return { metrics, setMetrics };
}

const styles = StyleSheet.create({
  toggleContainer: {
    position: 'absolute',
    top: spacing[4],
    right: spacing[4],
    zIndex: 1000,
  },
  toggleText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.sans,
  },
  container: {
    position: 'absolute',
    top: spacing[4],
    right: spacing[4],
    padding: spacing[3],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    minWidth: 200,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  title: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansSemibold,
  },
  closeText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.sans,
  },
  metricsGrid: {
    gap: spacing[2],
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
  },
  metricValue: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
  },
});
