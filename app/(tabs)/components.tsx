import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/ThemeContext';
import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Badge } from '@/src/components/Badge';
import { Avatar } from '@/src/components/Avatar';
import { Toggle } from '@/src/components/Toggle';
import { Input } from '@/src/components/Input';
import { Skeleton, SkeletonCard } from '@/src/components/Skeleton';
import { FadeIn } from '@/src/motion/FadeIn';
import { fontFamily, fontSize, spacing, radii } from '@/src/tokens';

export default function ComponentsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(false);
  const [toggleC, setToggleC] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showSkeleton, setShowSkeleton] = useState(false);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.header, { paddingTop: topPad + spacing[3] }]}>
        <FadeIn>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Components
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Token-driven, accessible UI primitives
          </Text>
        </FadeIn>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + spacing[8] }]}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <FadeIn delay={0}>
          <SectionHeader label="Buttons" theme={theme} />
          <Card variant="outlined" noPadding style={{ padding: spacing[4] }}>
            <View style={styles.buttonGrid}>
              <Button label="Solid" variant="solid" size="md" />
              <Button label="Outline" variant="outline" size="md" />
              <Button label="Ghost" variant="ghost" size="md" />
              <Button label="Danger" variant="destructive" size="md" />
            </View>
            <View style={[styles.divider, { borderColor: theme.colors.border.primary }]} />
            <Text style={[styles.subsectionLabel, { color: theme.colors.text.tertiary }]}>Sizes</Text>
            <View style={styles.buttonColumn}>
              <Button label="Small" variant="solid" size="sm" />
              <Button label="Medium" variant="solid" size="md" />
              <Button label="Large" variant="solid" size="lg" />
            </View>
            <View style={[styles.divider, { borderColor: theme.colors.border.primary }]} />
            <Text style={[styles.subsectionLabel, { color: theme.colors.text.tertiary }]}>States</Text>
            <View style={styles.buttonColumn}>
              <Button label="Loading" variant="solid" size="md" loading />
              <Button label="Disabled" variant="solid" size="md" disabled />
              <Button
                label="With Icon"
                variant="solid"
                size="md"
                icon={<Ionicons name="star" size={16} color="#FFFFFF" />}
              />
              <Button label="Full Width" variant="outline" size="md" fullWidth />
            </View>
          </Card>
        </FadeIn>

        <FadeIn delay={60}>
          <SectionHeader label="Cards" theme={theme} />
          <View style={styles.cardGrid}>
            <Card
              variant="default"
              title="Default Card"
              subtitle="Subtle shadow elevation"
            >
              <Text style={[styles.cardBody, { color: theme.colors.text.secondary }]}>
                Card content with default styling and gentle shadow.
              </Text>
            </Card>
            <Card
              variant="elevated"
              title="Elevated Card"
              subtitle="Stronger shadow"
            >
              <Text style={[styles.cardBody, { color: theme.colors.text.secondary }]}>
                More prominent shadow for important content areas.
              </Text>
            </Card>
            <Card
              variant="outlined"
              title="Outlined Card"
              subtitle="Border-only style"
            >
              <Text style={[styles.cardBody, { color: theme.colors.text.secondary }]}>
                Clean border style for structured content grouping.
              </Text>
            </Card>
            <Card
              variant="filled"
              title="Filled Card"
              subtitle="Subtle background"
            >
              <Text style={[styles.cardBody, { color: theme.colors.text.secondary }]}>
                Secondary background fill for low-emphasis content.
              </Text>
            </Card>
          </View>
        </FadeIn>

        <FadeIn delay={120}>
          <SectionHeader label="Badges" theme={theme} />
          <Card variant="outlined" noPadding style={{ padding: spacing[4] }}>
            <View style={styles.badgeRow}>
              <Badge label="Default" />
              <Badge label="Brand" variant="brand" />
              <Badge label="Success" variant="success" dot />
              <Badge label="Warning" variant="warning" dot />
              <Badge label="Error" variant="error" dot />
              <Badge label="Info" variant="info" />
            </View>
            <View style={[styles.divider, { borderColor: theme.colors.border.primary }]} />
            <Text style={[styles.subsectionLabel, { color: theme.colors.text.tertiary }]}>Small</Text>
            <View style={styles.badgeRow}>
              <Badge label="Default" size="sm" />
              <Badge label="Brand" variant="brand" size="sm" />
              <Badge label="Success" variant="success" size="sm" dot />
              <Badge label="Error" variant="error" size="sm" dot />
            </View>
          </Card>
        </FadeIn>

        <FadeIn delay={180}>
          <SectionHeader label="Avatars" theme={theme} />
          <Card variant="outlined" noPadding style={{ padding: spacing[4] }}>
            <View style={styles.avatarRow}>
              <Avatar name="Alice Kim" size="xs" color="#4F46E5" />
              <Avatar name="Bob Chen" size="sm" color="#7C3AED" />
              <Avatar name="Carla Davis" size="md" color="#06B6D4" />
              <Avatar name="Dan Evans" size="lg" color="#10B981" />
              <Avatar name="Eva Fox" size="xl" color="#F43F5E" />
            </View>
            <View style={[styles.divider, { borderColor: theme.colors.border.primary }]} />
            <View style={styles.avatarRow}>
              {['Alice Kim', 'Bob Chen', 'Carla Davis'].map((name, i) => (
                <View key={name} style={styles.avatarWithName}>
                  <Avatar name={name} size="md" color={['#4F46E5', '#7C3AED', '#06B6D4'][i]} />
                  <Text style={[styles.avatarName, { color: theme.colors.text.primary }]}>
                    {name.split(' ')[0]}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </FadeIn>

        <FadeIn delay={240}>
          <SectionHeader label="Toggles" theme={theme} />
          <Card variant="outlined" noPadding>
            {[
              { label: 'Notifications', sub: 'Receive push alerts', value: toggleA, set: setToggleA },
              { label: 'Dark Mode', sub: 'Override system setting', value: toggleB, set: setToggleB },
              { label: 'Analytics', sub: 'Help improve the app', value: toggleC, set: setToggleC },
            ].map((item, index) => (
              <View
                key={item.label}
                style={[
                  styles.toggleRow,
                  index < 2 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.colors.border.primary },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.toggleLabel, { color: theme.colors.text.primary }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.toggleSub, { color: theme.colors.text.secondary }]}>
                    {item.sub}
                  </Text>
                </View>
                <Toggle
                  value={item.value}
                  onValueChange={item.set}
                  accessibilityLabel={item.label}
                />
              </View>
            ))}
          </Card>
        </FadeIn>

        <FadeIn delay={300}>
          <SectionHeader label="Inputs" theme={theme} />
          <Card variant="outlined" noPadding style={{ padding: spacing[4], gap: spacing[3] }}>
            <Input
              label="Email"
              placeholder="you@example.com"
              value={inputValue}
              onChangeText={setInputValue}
              leftIcon={<Ionicons name="mail-outline" size={18} color={theme.colors.text.tertiary} />}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input
              label="Password"
              placeholder="Min 8 characters"
              secureTextEntry
              leftIcon={<Ionicons name="lock-closed-outline" size={18} color={theme.colors.text.tertiary} />}
            />
            <Input
              label="With Error"
              placeholder="Enter value"
              error="This field is required"
              leftIcon={<Ionicons name="warning-outline" size={18} color={theme.colors.status.error} />}
            />
            <Input
              label="With Hint"
              placeholder="Optional field"
              hint="We'll never share your information"
            />
            <Input
              label="Disabled"
              placeholder="Cannot edit"
              disabled
              value="Disabled value"
            />
          </Card>
        </FadeIn>

        <FadeIn delay={360}>
          <SectionHeader label="Skeletons" theme={theme} />
          <View style={{ gap: spacing[2] }}>
            <Button
              label={showSkeleton ? 'Hide Skeletons' : 'Show Skeletons'}
              variant="outline"
              size="sm"
              onPress={() => setShowSkeleton((v) => !v)}
            />
            {showSkeleton && (
              <View style={{ gap: spacing[3] }}>
                <SkeletonCard />
                <SkeletonCard />
                <View style={{ gap: spacing[2] }}>
                  <Skeleton height={16} />
                  <Skeleton width="80%" height={16} />
                  <Skeleton width="60%" height={16} />
                </View>
              </View>
            )}
          </View>
        </FadeIn>
      </ScrollView>
    </View>
  );
}

function SectionHeader({
  label,
  theme,
}: {
  label: string;
  theme: ReturnType<typeof useTheme>['theme'];
}) {
  return (
    <Text
      style={[
        styles.sectionLabel,
        { color: theme.colors.text.tertiary, borderBottomColor: theme.colors.border.primary },
      ]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  content: {
    paddingHorizontal: spacing[5],
    gap: spacing[4],
  },
  sectionLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansSemibold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingBottom: spacing[2],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  subsectionLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
    marginBottom: -spacing[1],
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: spacing[3],
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  buttonColumn: {
    gap: spacing[2],
    alignItems: 'flex-start',
  },
  cardGrid: {
    gap: spacing[3],
  },
  cardBody: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sans,
    lineHeight: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing[3],
  },
  avatarWithName: {
    alignItems: 'center',
    gap: spacing[2],
  },
  avatarName: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansMedium,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    gap: spacing[3],
  },
  toggleLabel: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.sansMedium,
    letterSpacing: -0.2,
  },
  toggleSub: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
    marginTop: 2,
  },
});
