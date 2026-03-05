import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Tabs } from 'expo-router';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/ThemeContext';

function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: 'square.grid.2x2', selected: 'square.grid.2x2.fill' }} />
        <Label>Tokens</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="components">
        <Icon sf={{ default: 'square.3.layers.3d', selected: 'square.3.layers.3d.top.filled' }} />
        <Label>Components</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="motion">
        <Icon sf={{ default: 'wand.and.rays', selected: 'wand.and.rays' }} />
        <Label>Motion</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="miniapp">
        <Icon sf={{ default: 'iphone', selected: 'iphone' }} />
        <Label>Mini App</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const { theme } = useTheme();
  const isDark = theme.isDark;
  const isIOS = Platform.OS === 'ios';
  const isWeb = Platform.OS === 'web';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.brand.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isIOS ? 'transparent' : isDark ? '#0D0D14' : '#FFFFFF',
          borderTopWidth: isWeb ? 1 : 0,
          borderTopColor: theme.colors.border.primary,
          elevation: 0,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={95}
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFill}
            />
          ) : isWeb ? (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: isDark ? '#0D0D14' : '#FFFFFF' }]} />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tokens',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="components"
        options={{
          title: 'Components',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="layers-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="motion"
        options={{
          title: 'Motion',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="miniapp"
        options={{
          title: 'Mini App',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="phone-portrait-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="advanced"
        options={{
          title: 'Advanced',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
