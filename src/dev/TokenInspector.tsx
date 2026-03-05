import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { fontFamily, fontSize, spacing, radii } from '../tokens';

type Category = 'colors' | 'typography' | 'spacing' | 'radii' | 'motion';

const CATEGORIES: Category[] = ['colors', 'typography', 'spacing', 'radii', 'motion'];

export function TokenInspector() {
  const { theme } = useTheme();
  const [active, setActive] = useState<Category>('colors');

  const colorEntries: [string, string][] = [
    ['background.primary', theme.colors.background.primary],
    ['background.secondary', theme.colors.background.secondary],
    ['background.tertiary', theme.colors.background.tertiary],
    ['surface.primary', theme.colors.surface.primary],
    ['border.primary', theme.colors.border.primary],
    ['text.primary', theme.colors.text.primary],
    ['text.secondary', theme.colors.text.secondary],
    ['text.tertiary', theme.colors.text.tertiary],
    ['brand.primary', theme.colors.brand.primary],
    ['brand.secondary', theme.colors.brand.secondary],
    ['accent.default', theme.colors.accent.default],
    ['status.success', theme.colors.status.success],
    ['status.warning', theme.colors.status.warning],
    ['status.error', theme.colors.status.error],
  ];

  const typographyEntries: [string, string][] = [
    ['sans', 'Inter_400Regular'],
    ['sansMedium', 'Inter_500Medium'],
    ['sansSemibold', 'Inter_600SemiBold'],
    ['sansBold', 'Inter_700Bold'],
    ['size.xs', '11'],
    ['size.sm', '13'],
    ['size.md', '15'],
    ['size.lg', '17'],
    ['size.xl', '20'],
    ['size.2xl', '24'],
    ['size.3xl', '30'],
  ];

  const spacingEntries: [string, string][] = [
    ['0', '0'],
    ['0.5 (2)', '2'],
    ['1 (4)', '4'],
    ['2 (8)', '8'],
    ['3 (12)', '12'],
    ['4 (16)', '16'],
    ['5 (20)', '20'],
    ['6 (24)', '24'],
    ['8 (32)', '32'],
    ['10 (40)', '40'],
    ['12 (48)', '48'],
    ['16 (64)', '64'],
    ['20 (80)', '80'],
    ['24 (96)', '96'],
    ['32 (128)', '128'],
  ];

  const radiiEntries: [string, string][] = [
    ['none', '0'],
    ['xs', '3'],
    ['sm', '6'],
    ['md', '10'],
    ['lg', '14'],
    ['xl', '18'],
    ['2xl', '24'],
    ['3xl', '32'],
    ['full', '9999'],
  ];

  const motionEntries: [string, string][] = [
    ['duration.instant', '50ms'],
    ['duration.fast', '150ms'],
    ['duration.normal', '300ms'],
    ['duration.slow', '500ms'],
    ['duration.slower', '750ms'],
    ['spring.gentle.damping', '20'],
    ['spring.gentle.stiffness', '150'],
    ['spring.snappy.damping', '30'],
    ['spring.snappy.stiffness', '300'],
  ];

  const dataMap: Record<Category, [string, string][]> = {
    colors: colorEntries,
    typography: typographyEntries,
    spacing: spacingEntries,
    radii: radiiEntries,
    motion: motionEntries,
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setActive(cat)}
            style={[
              styles.tab,
              {
                backgroundColor:
                  active === cat ? theme.colors.brand.primaryMuted : 'transparent',
                borderColor:
                  active === cat ? theme.colors.brand.primary : theme.colors.border.primary,
              },
            ]}
          >
            <Text
              style={[
                styles.tabLabel,
                {
                  color:
                    active === cat ? theme.colors.brand.primary : theme.colors.text.secondary,
                },
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.list}>
        {dataMap[active].map(([key, value]) => (
          <View
            key={key}
            style={[styles.row, { borderBottomColor: theme.colors.border.primary }]}
          >
            <Text style={[styles.key, { color: theme.colors.text.secondary }]}>{key}</Text>
            <View style={styles.valueRow}>
              {active === 'colors' && (
                <View
                  style={[
                    styles.swatch,
                    {
                      backgroundColor: value,
                      borderColor: theme.colors.border.strong,
                    },
                  ]}
                />
              )}
              <Text style={[styles.value, { color: theme.colors.text.primary }]}>{value}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    gap: spacing[2],
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[3],
  },
  tab: {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
    borderRadius: radii.full,
    borderWidth: 1,
  },
  tabLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
    textTransform: 'capitalize',
  },
  list: {
    paddingHorizontal: spacing[5],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[2.5],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  key: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
    flex: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  swatch: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
  },
  value: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
    textAlign: 'right',
  },
});
