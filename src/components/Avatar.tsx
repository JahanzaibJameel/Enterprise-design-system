import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { fontFamily, fontSize, radii } from '../tokens';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  name?: string;
  size?: AvatarSize;
  color?: string;
}

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const fontSizeMap = {
  xs: fontSize.xs,
  sm: fontSize.sm,
  md: fontSize.md,
  lg: fontSize.xl,
  xl: fontSize['2xl'],
};

export function Avatar({ name = '', size = 'md', color }: AvatarProps) {
  const { theme } = useTheme();
  const dim = sizeMap[size];
  const initials = getInitials(name);
  const bg = color || theme.colors.brand.primary;

  return (
    <View
      style={[
        styles.base,
        {
          width: dim,
          height: dim,
          borderRadius: radii.full,
          backgroundColor: bg,
        },
      ]}
      accessible
      accessibilityLabel={name || 'Avatar'}
    >
      <Text
        style={[
          styles.initials,
          { fontSize: fontSizeMap[size], color: '#FFFFFF' },
        ]}
        maxFontSizeMultiplier={1}
      >
        {initials}
      </Text>
    </View>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === '') return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: fontFamily.sansSemibold,
    letterSpacing: 0.5,
  },
});
