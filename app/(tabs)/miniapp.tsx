import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/src/theme/ThemeContext';
import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Badge } from '@/src/components/Badge';
import { Avatar } from '@/src/components/Avatar';
import { Input } from '@/src/components/Input';
import { Toggle } from '@/src/components/Toggle';
import { FadeIn } from '@/src/motion/FadeIn';
import { SlideUp } from '@/src/motion/SlideUp';
import { fontFamily, fontSize, spacing, radii } from '@/src/tokens';

type Screen = 'login' | 'dashboard' | 'settings';

const METRICS = [
  { label: 'Component count', value: '10', unit: 'components', icon: 'layers-outline' as const },
  { label: 'Token categories', value: '6', unit: 'categories', icon: 'grid-outline' as const },
  { label: 'Theme variants', value: '4', unit: 'themes', icon: 'color-palette-outline' as const },
  { label: 'Motion presets', value: '3', unit: 'primitives', icon: 'sparkles-outline' as const },
  { label: 'Spring configs', value: '4', unit: 'presets', icon: 'pulse-outline' as const },
];

export default function MiniAppScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [screen, setScreen] = useState<Screen>('login');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background.primary }]}>
      {screen === 'login' && (
        <LoginScreen theme={theme} onLogin={() => setScreen('dashboard')} topPad={topPad} />
      )}
      {screen === 'dashboard' && (
        <DashboardScreen
          theme={theme}
          onSettings={() => setScreen('settings')}
          onLogout={() => setScreen('login')}
          topPad={topPad}
          insets={insets}
        />
      )}
      {screen === 'settings' && (
        <SettingsScreen
          theme={theme}
          onBack={() => setScreen('dashboard')}
          topPad={topPad}
          insets={insets}
        />
      )}
    </View>
  );
}

function LoginScreen({
  theme,
  onLogin,
  topPad,
}: {
  theme: any;
  onLogin: () => void;
  topPad: number;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    onLogin();
  }, [email, password, onLogin]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.loginContainer,
          { paddingTop: topPad + spacing[8] },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FadeIn delay={0}>
          <View
            style={[
              styles.loginLogo,
              { backgroundColor: theme.colors.brand.primaryMuted },
            ]}
          >
            <Ionicons name="grid" size={32} color={theme.colors.brand.primary} />
          </View>
        </FadeIn>

        <FadeIn delay={80}>
          <Text style={[styles.loginTitle, { color: theme.colors.text.primary }]}>
            DS Playground
          </Text>
          <Text style={[styles.loginSubtitle, { color: theme.colors.text.secondary }]}>
            Sign in to your workspace
          </Text>
        </FadeIn>

        <SlideUp delay={160} distance={20}>
          <View style={styles.loginForm}>
            <Input
              label="Email"
              placeholder="you@company.com"
              value={email}
              onChangeText={setEmail}
              leftIcon={<Ionicons name="mail-outline" size={18} color={theme.colors.text.tertiary} />}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
            <Input
              label="Password"
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Ionicons name="lock-closed-outline" size={18} color={theme.colors.text.tertiary} />}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              error={error}
            />

            <Button
              label="Sign In"
              variant="solid"
              size="lg"
              fullWidth
              loading={loading}
              onPress={handleLogin}
            />

            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: theme.colors.border.primary }]} />
              <Text style={[styles.dividerText, { color: theme.colors.text.tertiary }]}>or</Text>
              <View style={[styles.dividerLine, { backgroundColor: theme.colors.border.primary }]} />
            </View>

            <Button
              label="Continue with SSO"
              variant="outline"
              size="lg"
              fullWidth
              icon={<Ionicons name="business-outline" size={18} color={theme.colors.brand.primary} />}
            />
          </View>
        </SlideUp>

        <FadeIn delay={300}>
          <Text style={[styles.loginFooter, { color: theme.colors.text.tertiary }]}>
            Use any credentials to continue
          </Text>
        </FadeIn>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function DashboardScreen({
  theme,
  onSettings,
  onLogout,
  topPad,
  insets,
}: {
  theme: any;
  onSettings: () => void;
  onLogout: () => void;
  topPad: number;
  insets: any;
}) {
  const bottomPad = Platform.OS === 'web' ? 34 : 0;

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.dashHeader, { paddingTop: topPad + spacing[3], borderBottomColor: theme.colors.border.primary }]}>
        <FadeIn>
          <View style={styles.dashHeaderRow}>
            <View>
              <Text style={[styles.dashWelcome, { color: theme.colors.text.secondary }]}>
                Welcome back
              </Text>
              <Text style={[styles.dashUser, { color: theme.colors.text.primary }]}>
                Design System
              </Text>
            </View>
            <View style={styles.dashHeaderActions}>
              <Pressable
                onPress={onSettings}
                style={[styles.iconBtn, { backgroundColor: theme.colors.background.secondary }]}
                accessibilityLabel="Settings"
              >
                <Ionicons name="settings-outline" size={20} color={theme.colors.text.primary} />
              </Pressable>
              <Pressable
                onPress={onLogout}
                style={[styles.iconBtn, { backgroundColor: theme.colors.background.secondary }]}
                accessibilityLabel="Sign out"
              >
                <Ionicons name="log-out-outline" size={20} color={theme.colors.text.primary} />
              </Pressable>
            </View>
          </View>
        </FadeIn>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: spacing[5], paddingBottom: bottomPad + spacing[8], gap: spacing[4], paddingTop: spacing[4] }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <FadeIn delay={0}>
          <Text style={[styles.dashSectionLabel, { color: theme.colors.text.tertiary }]}>
            System Metrics
          </Text>
          <View style={styles.metricsGrid}>
            {METRICS.map((m) => (
              <Card
                key={m.label}
                variant="outlined"
                noPadding
                style={styles.metricCard}
              >
                <View style={[styles.metricIcon, { backgroundColor: theme.colors.brand.primaryMuted }]}>
                  <Ionicons name={m.icon} size={18} color={theme.colors.brand.primary} />
                </View>
                <Text style={[styles.metricValue, { color: theme.colors.text.primary }]}>
                  {m.value}
                </Text>
                <Text style={[styles.metricUnit, { color: theme.colors.text.tertiary }]}>
                  {m.unit}
                </Text>
              </Card>
            ))}
          </View>
        </FadeIn>

        <FadeIn delay={80}>
          <Text style={[styles.dashSectionLabel, { color: theme.colors.text.tertiary }]}>
            Token Health
          </Text>
          <Card variant="elevated" noPadding style={{ overflow: 'hidden' }}>
            {[
              { label: 'Color tokens', count: 42, status: 'success', pct: 100 },
              { label: 'Typography tokens', count: 12, status: 'success', pct: 100 },
              { label: 'Spacing tokens', count: 20, status: 'success', pct: 100 },
              { label: 'Motion tokens', count: 8, status: 'success', pct: 100 },
              { label: 'Radii tokens', count: 8, status: 'success', pct: 100 },
            ].map((item, i) => (
              <View
                key={item.label}
                style={[
                  styles.healthRow,
                  i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border.primary },
                ]}
              >
                <View style={{ flex: 1, gap: spacing[1] }}>
                  <View style={styles.healthRowHeader}>
                    <Text style={[styles.healthLabel, { color: theme.colors.text.primary }]}>
                      {item.label}
                    </Text>
                    <Badge label={`${item.count}`} variant="brand" size="sm" />
                  </View>
                  <View style={[styles.healthTrack, { backgroundColor: theme.colors.background.tertiary }]}>
                    <View
                      style={[
                        styles.healthFill,
                        { width: `${item.pct}%`, backgroundColor: theme.colors.status.success },
                      ]}
                    />
                  </View>
                </View>
                <Badge label="100%" variant="success" size="sm" />
              </View>
            ))}
          </Card>
        </FadeIn>

        <FadeIn delay={160}>
          <Text style={[styles.dashSectionLabel, { color: theme.colors.text.tertiary }]}>
            Recent Activity
          </Text>
          <Card variant="outlined" noPadding>
            {[
              { icon: 'color-palette-outline' as const, title: 'Color system updated', sub: '5 new semantic tokens added', time: '2m ago', color: '#6366F1' },
              { icon: 'text-outline' as const, title: 'Typography refined', sub: 'Line heights adjusted', time: '1h ago', color: '#8B5CF6' },
              { icon: 'sparkles-outline' as const, title: 'Motion presets added', sub: 'Spring configs documented', time: '3h ago', color: '#06B6D4' },
              { icon: 'checkmark-circle-outline' as const, title: 'WCAG AA verified', sub: 'All contrast ratios pass', time: 'Yesterday', color: '#10B981' },
            ].map((item, i) => (
              <View
                key={item.title}
                style={[
                  styles.activityRow,
                  i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border.primary },
                ]}
              >
                <View style={[styles.activityIcon, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon} size={16} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.activityTitle, { color: theme.colors.text.primary }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.activitySub, { color: theme.colors.text.secondary }]}>
                    {item.sub}
                  </Text>
                </View>
                <Text style={[styles.activityTime, { color: theme.colors.text.tertiary }]}>
                  {item.time}
                </Text>
              </View>
            ))}
          </Card>
        </FadeIn>
      </ScrollView>
    </View>
  );
}

function SettingsScreen({
  theme,
  onBack,
  topPad,
  insets,
}: {
  theme: any;
  onBack: () => void;
  topPad: number;
  insets: any;
}) {
  const { setThemeId, themeId } = useTheme();
  const [notifs, setNotifs] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [compact, setCompact] = useState(false);
  const bottomPad = Platform.OS === 'web' ? 34 : 0;

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.settingsHeader, { paddingTop: topPad + spacing[3], borderBottomColor: theme.colors.border.primary }]}>
        <FadeIn>
          <View style={styles.settingsHeaderRow}>
            <Pressable
              onPress={onBack}
              style={styles.backBtn}
              accessibilityLabel="Back to dashboard"
            >
              <Ionicons name="chevron-back" size={22} color={theme.colors.brand.primary} />
            </Pressable>
            <Text style={[styles.settingsTitle, { color: theme.colors.text.primary }]}>
              Settings
            </Text>
            <View style={{ width: 36 }} />
          </View>
        </FadeIn>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: spacing[5], paddingBottom: bottomPad + spacing[8], gap: spacing[4], paddingTop: spacing[4] }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <FadeIn delay={0}>
          <View style={styles.settingsProfile}>
            <Avatar name="Design System" size="xl" color={theme.colors.brand.primary} />
            <View style={{ gap: 4 }}>
              <Text style={[styles.profileName, { color: theme.colors.text.primary }]}>
                Design System
              </Text>
              <Text style={[styles.profileEmail, { color: theme.colors.text.secondary }]}>
                workspace@dsplayground.app
              </Text>
              <Badge label="Pro Plan" variant="brand" size="sm" />
            </View>
          </View>
        </FadeIn>

        <FadeIn delay={60}>
          <Text style={[styles.settingsSectionLabel, { color: theme.colors.text.tertiary }]}>
            Appearance
          </Text>
          <Card variant="outlined" noPadding>
            {[
              { id: 'system', label: 'System', icon: 'phone-portrait-outline' as const },
              { id: 'light', label: 'Light', icon: 'sunny-outline' as const },
              { id: 'dark', label: 'Dark', icon: 'moon-outline' as const },
              { id: 'amoled', label: 'AMOLED', icon: 'moon' as const },
              { id: 'highContrast', label: 'High Contrast', icon: 'contrast-outline' as const },
            ].map((t, i) => (
              <Pressable
                key={t.id}
                onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setThemeId(t.id as any); }}
                style={[
                  styles.settingsRow,
                  i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border.primary },
                ]}
              >
                <Ionicons name={t.icon} size={18} color={theme.colors.text.secondary} />
                <Text style={[styles.settingsRowLabel, { color: theme.colors.text.primary }]}>
                  {t.label}
                </Text>
                {themeId === t.id && (
                  <Ionicons name="checkmark" size={18} color={theme.colors.brand.primary} />
                )}
              </Pressable>
            ))}
          </Card>
        </FadeIn>

        <FadeIn delay={120}>
          <Text style={[styles.settingsSectionLabel, { color: theme.colors.text.tertiary }]}>
            Preferences
          </Text>
          <Card variant="outlined" noPadding>
            {[
              { label: 'Push Notifications', sub: 'Design system alerts', value: notifs, set: setNotifs },
              { label: 'Compact Mode', sub: 'Denser layouts', value: compact, set: setCompact },
              { label: 'Analytics', sub: 'Help us improve', value: analytics, set: setAnalytics },
            ].map((item, i) => (
              <View
                key={item.label}
                style={[
                  styles.settingsRow,
                  i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border.primary },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.settingsRowLabel, { color: theme.colors.text.primary }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.settingsRowSub, { color: theme.colors.text.secondary }]}>
                    {item.sub}
                  </Text>
                </View>
                <Toggle value={item.value} onValueChange={item.set} />
              </View>
            ))}
          </Card>
        </FadeIn>

        <FadeIn delay={180}>
          <Button
            label="Sign Out"
            variant="destructive"
            size="md"
            fullWidth
            icon={<Ionicons name="log-out-outline" size={18} color="#FFFFFF" />}
            onPress={onBack}
          />
        </FadeIn>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  loginContainer: {
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[8],
    alignItems: 'center',
    gap: spacing[6],
    flexGrow: 1,
    justifyContent: 'center',
  },
  loginLogo: {
    width: 72,
    height: 72,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTitle: {
    fontSize: fontSize['3xl'],
    fontFamily: fontFamily.sansBold,
    letterSpacing: -1,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.sans,
    textAlign: 'center',
    marginTop: spacing[1],
  },
  loginForm: {
    width: '100%',
    gap: spacing[3],
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  dividerText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sans,
  },
  loginFooter: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
    textAlign: 'center',
  },
  dashHeader: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[4],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dashHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dashWelcome: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sans,
  },
  dashUser: {
    fontSize: fontSize['2xl'],
    fontFamily: fontFamily.sansBold,
    letterSpacing: -0.5,
  },
  dashHeaderActions: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashSectionLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansSemibold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: -spacing[2],
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  metricCard: {
    width: '47%',
    padding: spacing[3],
    gap: spacing[2],
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    fontSize: fontSize['3xl'],
    fontFamily: fontFamily.sansBold,
    letterSpacing: -1,
  },
  metricUnit: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    gap: spacing[3],
  },
  healthRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  healthLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansMedium,
  },
  healthTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 2,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    gap: spacing[3],
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansMedium,
    letterSpacing: -0.1,
  },
  activitySub: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
    marginTop: 2,
  },
  activityTime: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
  },
  settingsHeader: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[4],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.sansBold,
    letterSpacing: -0.3,
  },
  settingsProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    paddingVertical: spacing[2],
  },
  profileName: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.sansBold,
    letterSpacing: -0.3,
  },
  profileEmail: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sans,
  },
  settingsSectionLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sansSemibold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: -spacing[2],
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  settingsRowLabel: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.sansMedium,
    flex: 1,
  },
  settingsRowSub: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
    marginTop: 2,
  },
});
