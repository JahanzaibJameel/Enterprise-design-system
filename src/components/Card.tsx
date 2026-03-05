import React, { forwardRef, ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle, AccessibilityProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, radii, fontFamily, fontSize } from '../tokens';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg';

interface CardProps extends AccessibilityProps {
  variant?: CardVariant;
  size?: CardSize;
  disabled?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
}

export const Card = forwardRef<View, CardProps>(
  (
    { 
      variant = 'default', 
      size = 'md', 
      disabled = false, 
      className,
      title, 
      subtitle, 
      children, 
      style, 
      noPadding = false,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole,
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme();
    const variantStyle = getVariantStyle(variant, theme);
    const sizeStyle = getSizeStyle(size);

    return (
      <View
        ref={ref}
        style={[
          styles.base,
          variantStyle,
          sizeStyle,
          !noPadding && styles.padding,
          disabled && styles.disabled,
          style,
        ]}
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole || 'none'}
        accessibilityState={{ disabled }}
        {...rest}
      >
        {(title || subtitle) && (
          <View style={styles.header}>
            {title && (
              <Text
                style={[styles.title, { color: theme.colors.text.primary }]}
                maxFontSizeMultiplier={1.3}
              >
                {title}
              </Text>
            )}
            {subtitle && (
              <Text
                style={[styles.subtitle, { color: theme.colors.text.secondary }]}
                maxFontSizeMultiplier={1.3}
              >
                {subtitle}
              </Text>
            )}
          </View>
        )}
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';

function getSizeStyle(size: CardSize) {
  switch (size) {
    case 'sm':
      return {
        padding: spacing[2],
      };
    case 'lg':
      return {
        padding: spacing[6],
      };
    default:
      return {
        padding: spacing[4],
      };
  }
}

function getVariantStyle(variant: CardVariant, theme: ReturnType<typeof useTheme>['theme']) {
  switch (variant) {
    case 'elevated':
      return {
        backgroundColor: theme.colors.surface.primary,
        ...theme.shadows.md,
      };
    case 'outlined':
      return {
        backgroundColor: theme.colors.surface.primary,
        borderWidth: 1,
        borderColor: theme.colors.border.primary,
      };
    case 'filled':
      return {
        backgroundColor: theme.colors.background.secondary,
      };
    default:
      return {
        backgroundColor: theme.colors.surface.primary,
        ...theme.shadows.sm,
      };
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.xl,
  },
  padding: {
    padding: spacing[4],
  },
  disabled: {
    opacity: 0.5,
  },
  header: {
    marginBottom: spacing[3],
    gap: spacing[0.5],
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.sansSemibold,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sans,
    lineHeight: fontSize.sm * 1.5,
  },
});
