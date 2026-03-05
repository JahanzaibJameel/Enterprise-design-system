import React, { useState, useCallback, useRef, ReactNode } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { fontFamily, fontSize, spacing, radii } from '../tokens';
import { TokenInspector } from './TokenInspector';

type Panel = 'tokens' | 'perf' | null;

interface DebugOverlayProps {
  children: ReactNode;
}

export function DebugOverlay({ children }: DebugOverlayProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [panel, setPanel] = useState<Panel>(null);
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debugVisible, setDebugVisible] = useState(false);

  const handleTripleTap = useCallback(() => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (tapCount.current >= 3) {
      tapCount.current = 0;
      setDebugVisible(true);
    } else {
      tapTimer.current = setTimeout(() => {
        tapCount.current = 0;
      }, 400);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={handleTripleTap} style={{ flex: 1 }}>
        {children}
      </Pressable>

      <Modal
        visible={debugVisible}
        animationType="slide"
        transparent
        onRequestClose={() => { setDebugVisible(false); setPanel(null); }}
      >
        <View style={styles.overlay}>
          <View
            style={[
              styles.sheet,
              {
                backgroundColor: theme.colors.background.primary,
                paddingBottom: insets.bottom + spacing[4],
                borderTopColor: theme.colors.border.primary,
              },
            ]}
          >
            <View style={[styles.handle, { backgroundColor: theme.colors.border.strong }]} />
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                Debug Overlay
              </Text>
              <Pressable
                onPress={() => { setDebugVisible(false); setPanel(null); }}
                style={styles.closeBtn}
                accessibilityLabel="Close debug overlay"
              >
                <Ionicons name="close" size={22} color={theme.colors.text.secondary} />
              </Pressable>
            </View>

            {panel === null && (
              <View style={styles.panelGrid}>
                <DebugTile
                  icon="color-palette-outline"
                  label="Token Inspector"
                  onPress={() => setPanel('tokens')}
                  theme={theme}
                />
                <DebugTile
                  icon="speedometer-outline"
                  label="Performance"
                  onPress={() => setPanel('perf')}
                  theme={theme}
                />
              </View>
            )}

            {panel === 'tokens' && (
              <View style={{ flex: 1 }}>
                <Pressable
                  onPress={() => setPanel(null)}
                  style={styles.backBtn}
                >
                  <Ionicons name="chevron-back" size={18} color={theme.colors.brand.primary} />
                  <Text style={[styles.backLabel, { color: theme.colors.brand.primary }]}>Back</Text>
                </Pressable>
                <TokenInspector />
              </View>
            )}

            {panel === 'perf' && (
              <View style={{ flex: 1 }}>
                <Pressable onPress={() => setPanel(null)} style={styles.backBtn}>
                  <Ionicons name="chevron-back" size={18} color={theme.colors.brand.primary} />
                  <Text style={[styles.backLabel, { color: theme.colors.brand.primary }]}>Back</Text>
                </Pressable>
                <PerfPanel theme={theme} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

function DebugTile({
  icon,
  label,
  onPress,
  theme,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  theme: ReturnType<typeof useTheme>['theme'];
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tile,
        { backgroundColor: theme.colors.background.secondary, borderColor: theme.colors.border.primary },
      ]}
    >
      <Ionicons name={icon} size={28} color={theme.colors.brand.primary} />
      <Text style={[styles.tileLabel, { color: theme.colors.text.primary }]}>{label}</Text>
    </Pressable>
  );
}

function PerfPanel({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  const stats = [
    { label: 'Platform', value: Platform.OS },
    { label: 'Platform Version', value: String(Platform.Version) },
    { label: 'New Architecture', value: 'Enabled' },
    { label: 'React Native', value: '0.76' },
    { label: 'Expo SDK', value: '52' },
    { label: 'Debug Mode', value: __DEV__ ? 'ON' : 'OFF' },
    { label: 'Component Lib', value: '10 components' },
    { label: 'Motion Presets', value: '3 primitives' },
  ];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.perfList}>
      {stats.map((s) => (
        <View
          key={s.label}
          style={[styles.statRow, { borderBottomColor: theme.colors.border.primary }]}
        >
          <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>{s.label}</Text>
          <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>{s.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    borderTopLeftRadius: radii['2xl'],
    borderTopRightRadius: radii['2xl'],
    borderTopWidth: 1,
    maxHeight: '80%',
    paddingTop: spacing[2],
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing[3],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[4],
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.sansBold,
    letterSpacing: -0.3,
  },
  closeBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelGrid: {
    flexDirection: 'row',
    gap: spacing[3],
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[4],
  },
  tile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[5],
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing[2],
  },
  tileLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansMedium,
    textAlign: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[3],
    gap: spacing[0.5],
  },
  backLabel: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.sansMedium,
  },
  perfList: {
    paddingHorizontal: spacing[5],
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  statLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sans,
  },
  statValue: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansMedium,
  },
});
