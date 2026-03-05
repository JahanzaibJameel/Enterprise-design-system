import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/ThemeContext';
import { FadeIn } from '@/src/motion/FadeIn';
import { Badge } from '@/src/components/Badge';
import { fontFamily, fontSize, spacing, radii } from '@/src/tokens';
import { primitive } from '@/src/tokens/colors';
import { DebugOverlay } from '@/src/dev/DebugOverlay';

type TokenSection = 'colors' | 'typography' | 'spacing' | 'radii' | 'theme';

const SECTIONS: { id: TokenSection; label: string; icon: React.ComponentProps<typeof Ionicons>['name'] }[] = [
  { id: 'colors', label: 'Colors', icon: 'color-palette-outline' },
  { id: 'typography', label: 'Typography', icon: 'text-outline' },
  { id: 'spacing', label: 'Spacing', icon: 'resize-outline' },
  { id: 'radii', label: 'Radii', icon: 'square-outline' },
  { id: 'theme', label: 'Theme', icon: 'moon-outline' },
];

export default function TokensScreen() {
  const { theme, themeId, setThemeId } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeSection, setActiveSection] = useState<TokenSection>('colors');

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : 0;

  return (
    <DebugOverlay>
      <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <View style={[styles.header, { paddingTop: topPad + spacing[3] }]}>
          <FadeIn>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              Design Tokens
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
              The atomic foundation of the system
            </Text>
          </FadeIn>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sectionTabs}
        >
          {SECTIONS.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => setActiveSection(s.id)}
              style={[
                styles.sectionTab,
                {
                  backgroundColor:
                    activeSection === s.id
                      ? theme.colors.brand.primaryMuted
                      : theme.colors.background.secondary,
                  borderColor:
                    activeSection === s.id
                      ? theme.colors.brand.primary
                      : theme.colors.border.primary,
                },
              ]}
            >
              <Ionicons
                name={s.icon}
                size={15}
                color={activeSection === s.id ? theme.colors.brand.primary : theme.colors.text.secondary}
              />
              <Text
                style={[
                  styles.sectionTabLabel,
                  {
                    color:
                      activeSection === s.id
                        ? theme.colors.brand.primary
                        : theme.colors.text.secondary,
                  },
                ]}
              >
                {s.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.content, { paddingBottom: bottomPad + spacing[8] }]}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
          {activeSection === 'colors' && <ColorsSection theme={theme} />}
          {activeSection === 'typography' && <TypographySection theme={theme} />}
          {activeSection === 'spacing' && <SpacingSection theme={theme} />}
          {activeSection === 'radii' && <RadiiSection theme={theme} />}
          {activeSection === 'theme' && (
            <ThemeSection theme={theme} themeId={themeId} setThemeId={setThemeId} />
          )}
        </ScrollView>
      </View>
    </DebugOverlay>
  );
}

function ColorsSection({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  const groups = [
    {
      label: 'Indigo',
      swatches: [
        { label: '50', value: primitive.indigo[50] },
        { label: '100', value: primitive.indigo[100] },
        { label: '200', value: primitive.indigo[200] },
        { label: '300', value: primitive.indigo[300] },
        { label: '400', value: primitive.indigo[400] },
        { label: '500', value: primitive.indigo[500] },
        { label: '600', value: primitive.indigo[600] },
        { label: '700', value: primitive.indigo[700] },
        { label: '800', value: primitive.indigo[800] },
        { label: '900', value: primitive.indigo[900] },
      ],
    },
    {
      label: 'Violet',
      swatches: [
        { label: '400', value: primitive.violet[400] },
        { label: '500', value: primitive.violet[500] },
        { label: '600', value: primitive.violet[600] },
        { label: '700', value: primitive.violet[700] },
        { label: '800', value: primitive.violet[800] },
      ],
    },
    {
      label: 'Cyan',
      swatches: [
        { label: '300', value: primitive.cyan[300] },
        { label: '400', value: primitive.cyan[400] },
        { label: '500', value: primitive.cyan[500] },
        { label: '600', value: primitive.cyan[600] },
      ],
    },
    {
      label: 'Semantic',
      swatches: [
        { label: 'Success', value: theme.colors.status.success },
        { label: 'Warning', value: theme.colors.status.warning },
        { label: 'Error', value: theme.colors.status.error },
        { label: 'Info', value: theme.colors.status.info },
      ],
    },
  ];

  return (
    <View style={styles.section}>
      {groups.map((group) => (
        <FadeIn key={group.label}>
          <Text style={[styles.groupLabel, { color: theme.colors.text.secondary }]}>
            {group.label}
          </Text>
          <View style={styles.swatchRow}>
            {group.swatches.map((s) => (
              <View key={s.label} style={styles.swatchItem}>
                <View
                  style={[
                    styles.swatch,
                    { backgroundColor: s.value, borderColor: theme.colors.border.primary },
                  ]}
                />
                <Text style={[styles.swatchLabel, { color: theme.colors.text.tertiary }]}>
                  {s.label}
                </Text>
              </View>
            ))}
          </View>
        </FadeIn>
      ))}
    </View>
  );
}

function TypographySection({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  const styles2 = {
    headingXL: { fontSize: 36, fontFamily: fontFamily.sansBold, letterSpacing: -1.5, lineHeight: 44 },
    headingLG: { fontSize: 30, fontFamily: fontFamily.sansBold, letterSpacing: -1, lineHeight: 38 },
    headingMD: { fontSize: 24, fontFamily: fontFamily.sansSemibold, letterSpacing: -0.5, lineHeight: 32 },
    headingSM: { fontSize: 20, fontFamily: fontFamily.sansSemibold, letterSpacing: -0.3, lineHeight: 28 },
    bodyLG: { fontSize: 17, fontFamily: fontFamily.sans, letterSpacing: -0.1, lineHeight: 26 },
    bodyMD: { fontSize: 15, fontFamily: fontFamily.sans, lineHeight: 24 },
    bodySM: { fontSize: 13, fontFamily: fontFamily.sans, lineHeight: 20 },
    caption: { fontSize: 11, fontFamily: fontFamily.sansMedium, lineHeight: 16, letterSpacing: 0.3 },
  };

  return (
    <View style={styles.section}>
      {Object.entries(styles2).map(([name, style]) => (
        <FadeIn key={name}>
          <View style={[typoStyles.row, { borderBottomColor: theme.colors.border.primary }]}>
            <Text style={[typoStyles.name, { color: theme.colors.text.tertiary }]}>{name}</Text>
            <Text style={[style, { color: theme.colors.text.primary }]} maxFontSizeMultiplier={1.2}>
              Aa
            </Text>
          </View>
        </FadeIn>
      ))}
    </View>
  );
}

const typoStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
  },
});

function SpacingSection({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  const spacingTokens = [2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
  return (
    <View style={styles.section}>
      {spacingTokens.map((val) => (
        <FadeIn key={val}>
          <View style={[spaceStyles.row, { borderBottomColor: theme.colors.border.primary }]}>
            <Text style={[spaceStyles.label, { color: theme.colors.text.tertiary }]}>
              {val}px
            </Text>
            <View
              style={[
                spaceStyles.bar,
                {
                  width: Math.min(val * 2, 200),
                  backgroundColor: theme.colors.brand.primary,
                  opacity: 0.7 + (val / 64) * 0.3,
                },
              ]}
            />
          </View>
        </FadeIn>
      ))}
    </View>
  );
}

const spaceStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[2.5],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
    width: 40,
  },
  bar: {
    height: 8,
    borderRadius: 4,
  },
});

function RadiiSection({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  const radiiTokens = [
    { label: 'none', value: 0 },
    { label: 'xs', value: 3 },
    { label: 'sm', value: 6 },
    { label: 'md', value: 10 },
    { label: 'lg', value: 14 },
    { label: 'xl', value: 18 },
    { label: '2xl', value: 24 },
    { label: 'full', value: 9999 },
  ];

  return (
    <View style={styles.section}>
      <View style={radiiStyles.grid}>
        {radiiTokens.map((r) => (
          <FadeIn key={r.label}>
            <View style={radiiStyles.item}>
              <View
                style={[
                  radiiStyles.box,
                  {
                    borderRadius: r.value,
                    backgroundColor: theme.colors.brand.primaryMuted,
                    borderColor: theme.colors.brand.primary,
                  },
                ]}
              />
              <Text style={[radiiStyles.label, { color: theme.colors.text.tertiary }]}>
                {r.label}
              </Text>
              <Text style={[radiiStyles.value, { color: theme.colors.text.secondary }]}>
                {r.value === 9999 ? '∞' : `${r.value}px`}
              </Text>
            </View>
          </FadeIn>
        ))}
      </View>
    </View>
  );
}

const radiiStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  item: {
    alignItems: 'center',
    gap: spacing[1],
    width: 72,
  },
  box: {
    width: 56,
    height: 56,
    borderWidth: 1.5,
  },
  label: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
  },
  value: {
    fontSize: 10,
    fontFamily: fontFamily.sans,
  },
});

function ThemeSection({
  theme,
  themeId,
  setThemeId,
}: {
  theme: ReturnType<typeof useTheme>['theme'];
  themeId: string;
  setThemeId: (id: any) => void;
}) {
  const themes = [
    { id: 'system', label: 'System', desc: 'Follows device setting', icon: 'phone-portrait-outline' as const },
    { id: 'light', label: 'Light', desc: 'Clean and bright', icon: 'sunny-outline' as const },
    { id: 'dark', label: 'Dark', desc: 'Easy on the eyes', icon: 'moon-outline' as const },
    { id: 'amoled', label: 'AMOLED', desc: 'Pure black, max contrast', icon: 'moon' as const },
    { id: 'highContrast', label: 'High Contrast', desc: 'WCAG AAA compliant', icon: 'contrast-outline' as const },
  ];

  return (
    <View style={styles.section}>
      <Text style={[styles.groupLabel, { color: theme.colors.text.secondary }]}>
        Active Theme
      </Text>
      <View style={themeStyles.themeList}>
        {themes.map((t) => (
          <FadeIn key={t.id}>
            <Pressable
              onPress={() => setThemeId(t.id)}
              style={[
                themeStyles.themeRow,
                {
                  backgroundColor: theme.colors.surface.primary,
                  borderColor: themeId === t.id ? theme.colors.brand.primary : theme.colors.border.primary,
                  borderWidth: themeId === t.id ? 1.5 : 1,
                },
              ]}
            >
              <View
                style={[
                  themeStyles.themeIcon,
                  { backgroundColor: theme.colors.brand.primaryMuted },
                ]}
              >
                <Ionicons name={t.icon} size={20} color={theme.colors.brand.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[themeStyles.themeName, { color: theme.colors.text.primary }]}>
                  {t.label}
                </Text>
                <Text style={[themeStyles.themeDesc, { color: theme.colors.text.secondary }]}>
                  {t.desc}
                </Text>
              </View>
              {themeId === t.id && (
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.brand.primary} />
              )}
            </Pressable>
          </FadeIn>
        ))}
      </View>

      <View style={[themeStyles.hint, { backgroundColor: theme.colors.brand.primaryMuted, borderRadius: radii.lg }]}>
        <Ionicons name="finger-print-outline" size={16} color={theme.colors.brand.primary} />
        <Text style={[themeStyles.hintText, { color: theme.colors.brand.primary }]}>
          Triple-tap anywhere to open the Debug Overlay with Token Inspector
        </Text>
      </View>
    </View>
  );
}

const themeStyles = StyleSheet.create({
  themeList: {
    gap: spacing[2],
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    borderRadius: radii.xl,
    gap: spacing[3],
  },
  themeIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.sansSemibold,
    letterSpacing: -0.2,
  },
  themeDesc: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
    marginTop: 2,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    padding: spacing[3],
    marginTop: spacing[5],
  },
  hintText: {
    flex: 1,
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
    lineHeight: 18,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[4],
  },
  title: {
    fontSize: fontSize['3xl'],
    fontFamily: fontFamily.sansBold,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sans,
    marginTop: spacing[0.5],
  },
  sectionTabs: {
    flexDirection: 'row',
    gap: spacing[2],
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[4],
  },
  sectionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1.5],
    paddingVertical: spacing[1.5],
    paddingHorizontal: spacing[3],
    borderRadius: radii.full,
    borderWidth: 1,
  },
  sectionTabLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansMedium,
  },
  content: {
    paddingHorizontal: spacing[5],
    gap: spacing[4],
  },
  section: {
    gap: spacing[4],
  },
  groupLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansSemibold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: -spacing[2],
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  swatchItem: {
    alignItems: 'center',
    gap: spacing[1],
  },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    borderWidth: 1,
  },
  swatchLabel: {
    fontSize: 10,
    fontFamily: fontFamily.sans,
  },
});
