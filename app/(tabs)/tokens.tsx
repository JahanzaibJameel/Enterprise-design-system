import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useTheme } from '@/src/theme/ThemeContext';
import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Input } from '@/src/components/Input';
import { Badge } from '@/src/components/Badge';
import { Avatar } from '@/src/components/Avatar';
import { Toggle } from '@/src/components/Toggle';
import { FadeIn } from '@/src/motion/FadeIn';
import { SlideUp } from '@/src/motion/SlideUp';
import { ScalePress } from '@/src/motion/ScalePress';
import { 
  primitive, 
  semantic, 
  fontFamily, 
  fontSize, 
  lineHeight, 
  letterSpacing, 
  fontWeight,
  spacing,
  radii,
  duration,
  easing,
  spring
} from '@/src/tokens';

export default function TokensPlaygroundScreen() {
  const { theme, setThemeId, themeId } = useTheme();
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Design System Tokens
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Comprehensive token showcase
        </Text>
      </View>

      {/* Theme Switcher */}
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Theme Switcher
        </Text>
        <View style={styles.themeGrid}>
          {(['light', 'dark', 'amoled', 'highContrast'] as const).map((t) => (
            <Button
              key={t}
              label={t.charAt(0).toUpperCase() + t.slice(1)}
              variant={themeId === t ? 'solid' : 'outline'}
              size="sm"
              onPress={() => setThemeId(t)}
            />
          ))}
        </View>
      </Card>

      {/* Colors */}
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Color Tokens
        </Text>
        
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.secondary }]}>
          Primitive Colors
        </Text>
        <View style={styles.colorGrid}>
          {Object.entries(primitive).map(([colorName, shades]) => (
            <View key={colorName} style={styles.colorFamily}>
              <Text style={[styles.colorName, { color: theme.colors.text.primary }]}>
                {colorName}
              </Text>
              <View style={styles.shadesRow}>
                {Object.entries(shades).map(([shade, value]) => (
                  <Pressable
                    key={shade}
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: value },
                      selectedColor === `${colorName}.${shade}` && styles.selectedSwatch
                    ]}
                    onPress={() => setSelectedColor(`${colorName}.${shade}`)}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        <Text style={[styles.subsectionTitle, { color: theme.colors.text.secondary }]}>
          Semantic Colors
        </Text>
        <View style={styles.semanticColors}>
          {Object.entries(semantic).map(([category, colors]) => (
            <View key={category} style={styles.semanticCategory}>
              <Text style={[styles.categoryName, { color: theme.colors.text.primary }]}>
                {category}
              </Text>
              <View style={styles.semanticRow}>
                {Object.entries(colors).map(([name, value]) => (
                  <View key={name} style={styles.semanticItem}>
                    <View
                      style={[
                        styles.semanticSwatch,
                        { backgroundColor: typeof value === 'string' ? value : value }
                      ]}
                    />
                    <Text style={[styles.semanticLabel, { color: theme.colors.text.tertiary }]}>
                      {name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* Typography */}
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Typography Tokens
        </Text>
        
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.secondary }]}>
          Font Families
        </Text>
        <View style={styles.typoGrid}>
          {Object.entries(fontFamily).map(([name, family]) => (
            <Text key={name} style={[styles.typoSample, { fontFamily: family, color: theme.colors.text.primary }]}>
              {name}: The quick brown fox
            </Text>
          ))}
        </View>

        <Text style={[styles.subsectionTitle, { color: theme.colors.text.secondary }]}>
          Font Sizes
        </Text>
        <View style={styles.typoGrid}>
          {Object.entries(fontSize).map(([name, size]) => (
            <Text key={name} style={[styles.typoSample, { fontSize: size, color: theme.colors.text.primary }]}>
              {name}: Text at {size}px
            </Text>
          ))}
        </View>

        <Text style={[styles.subsectionTitle, { color: theme.colors.text.secondary }]}>
          Font Weights
        </Text>
        <View style={styles.typoGrid}>
          {Object.entries(fontWeight).map(([name, weight]) => (
            <Text key={name} style={[styles.typoSample, { fontWeight: weight as any, color: theme.colors.text.primary }]}>
              {name}: Weight {weight}
            </Text>
          ))}
        </View>
      </Card>

      {/* Spacing */}
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Spacing Tokens
        </Text>
        <View style={styles.spacingGrid}>
          {Object.entries(spacing).map(([name, value]) => (
            <View key={name} style={styles.spacingItem}>
              <View
                style={[
                  styles.spacingBox,
                  {
                    width: value,
                    height: value,
                    backgroundColor: theme.colors.brand.primary,
                  }
                ]}
              />
              <Text style={[styles.spacingLabel, { color: theme.colors.text.secondary }]}>
                {name}: {value}px
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Radii */}
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Border Radius Tokens
        </Text>
        <View style={styles.radiiGrid}>
          {Object.entries(radii).map(([name, value]) => (
            <View key={name} style={styles.radiiItem}>
              <View
                style={[
                  styles.radiiBox,
                  {
                    borderRadius: value,
                    backgroundColor: theme.colors.brand.primary,
                  }
                ]}
              />
              <Text style={[styles.radiiLabel, { color: theme.colors.text.secondary }]}>
                {name}: {value}px
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Motion */}
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Motion Tokens
        </Text>
        
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.secondary }]}>
          Durations
        </Text>
        <View style={styles.motionGrid}>
          {Object.entries(duration).map(([name, value]) => (
            <FadeIn key={name} delay={0} duration={value}>
              <View style={styles.motionItem}>
                <Text style={[styles.motionLabel, { color: theme.colors.text.primary }]}>
                  {name}: {value}ms
                </Text>
              </View>
            </FadeIn>
          ))}
        </View>

        <Text style={[styles.subsectionTitle, { color: theme.colors.text.secondary }]}>
          Spring Configurations
        </Text>
        <View style={styles.springGrid}>
          {Object.entries(spring).map(([name, config]) => (
            <ScalePress key={name} scale={0.95}>
              <View style={[styles.springItem, { backgroundColor: theme.colors.brand.primary }]}>
                <Text style={[styles.springLabel, { color: '#FFFFFF' }]}>
                  {name}
                </Text>
              </View>
            </ScalePress>
          ))}
        </View>
      </Card>

      {/* Component Showcase */}
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Component Showcase
        </Text>
        
        <View style={styles.componentGrid}>
          <Button label="Primary" variant="solid" />
          <Button label="Secondary" variant="outline" />
          <Button label="Ghost" variant="ghost" />
          <Button label="Destructive" variant="destructive" disabled />
        </View>

        <View style={styles.componentRow}>
          <Input label="Email" placeholder="Enter email" />
          <Input label="Disabled" disabled placeholder="Disabled input" />
        </View>

        <View style={styles.badgeRow}>
          <Badge label="Default" />
          <Badge label="Success" variant="success" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Error" variant="error" />
        </View>

        <View style={styles.avatarRow}>
          <Avatar name="John Doe" size="sm" />
          <Avatar name="Jane Smith" size="md" />
          <Avatar name="Bob Wilson" size="lg" />
          <Avatar name="Alice Brown" size="xl" />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing[5],
    paddingBottom: spacing[3],
  },
  title: {
    fontSize: fontSize['3xl'],
    fontFamily: fontFamily.sansBold,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.sans,
    marginTop: spacing[1],
  },
  section: {
    margin: spacing[4],
    marginHorizontal: spacing[4],
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.sansSemibold,
    marginBottom: spacing[4],
  },
  subsectionTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.sansSemibold,
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  colorGrid: {
    gap: spacing[4],
  },
  colorFamily: {
    gap: spacing[2],
  },
  colorName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.sansSemibold,
  },
  shadesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[1],
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  selectedSwatch: {
    borderWidth: 3,
    borderColor: '#000',
  },
  semanticColors: {
    gap: spacing[3],
  },
  semanticCategory: {
    gap: spacing[2],
  },
  categoryName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.sansSemibold,
  },
  semanticRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  semanticItem: {
    alignItems: 'center',
    gap: spacing[1],
  },
  semanticSwatch: {
    width: 24,
    height: 24,
    borderRadius: radii.sm,
  },
  semanticLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
  },
  typoGrid: {
    gap: spacing[2],
  },
  typoSample: {
    paddingVertical: spacing[1],
  },
  spacingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  spacingItem: {
    alignItems: 'center',
    gap: spacing[1],
  },
  spacingBox: {
    borderRadius: radii.sm,
  },
  spacingLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
  },
  radiiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  radiiItem: {
    alignItems: 'center',
    gap: spacing[1],
  },
  radiiBox: {
    width: 40,
    height: 40,
  },
  radiiLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
  },
  motionGrid: {
    gap: spacing[2],
  },
  motionItem: {
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  motionLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sans,
  },
  springGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  springItem: {
    padding: spacing[3],
    borderRadius: radii.md,
    minWidth: 80,
    alignItems: 'center',
  },
  springLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansSemibold,
  },
  componentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  componentRow: {
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
});
