import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { fontFamily, fontSize, spacing, radii } from '../tokens';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export function Badge({ label, variant = 'default', size = 'md', dot = false }: BadgeProps) {
  const { theme } = useTheme();
  const variantStyle = getVariantStyle(variant, theme.colors);

  return (
    <View
      style={[
        styles.base,
        size === 'sm' ? styles.sm : styles.md,
        { backgroundColor: variantStyle.bg },
      ]}
    >
      {dot && (
        <View style={[styles.dot, { backgroundColor: variantStyle.text }]} />
      )}
      <Text
        style={[
          styles.label,
          size === 'sm' ? styles.labelSm : styles.labelMd,
          { color: variantStyle.text },
        ]}
        maxFontSizeMultiplier={1.2}
      >
        {label}
      </Text>
    </View>
  );
}

function getVariantStyle(
  variant: BadgeVariant,
  colors: ReturnType<typeof useTheme>['theme']['colors']
) {
  switch (variant) {
    case 'success':
      return { bg: colors.status.successMuted, text: colors.status.success };
    case 'warning':
      return { bg: colors.status.warningMuted, text: colors.status.warning };
    case 'error':
      return { bg: colors.status.errorMuted, text: colors.status.error };
    case 'info':
      return { bg: colors.status.infoMuted, text: colors.status.info };
    case 'brand':
      return { bg: colors.brand.primaryMuted, text: colors.brand.primary };
    default:
      return { bg: colors.background.tertiary, text: colors.text.secondary };
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.full,
    gap: spacing[1],
    alignSelf: 'flex-start',
  },
  sm: {
    paddingVertical: spacing[0.5],
    paddingHorizontal: spacing[2],
  },
  md: {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2.5],
  },
  label: {
    fontFamily: fontFamily.sansMedium,
    letterSpacing: 0.2,
  },
  labelSm: {
    fontSize: fontSize['2xs'],
  },
  labelMd: {
    fontSize: fontSize.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
