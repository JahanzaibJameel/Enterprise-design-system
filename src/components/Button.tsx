import React, { forwardRef, useCallback } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  AccessibilityProps,
  PressableProps,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/ThemeContext';
import { fontFamily, fontSize, spacing, radii, spring } from '../tokens';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends AccessibilityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  label: string;
  onPress?: () => void;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      disabled = false,
      loading = false,
      label,
      onPress,
      fullWidth = false,
      icon,
      accessibilityLabel,
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme();
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePressIn = useCallback(() => {
      scale.value = withSpring(0.96, spring.snappy);
    }, []);

    const handlePressOut = useCallback(() => {
      scale.value = withSpring(1, spring.gentle);
    }, []);

    const handlePress = useCallback(() => {
      if (!disabled && !loading) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
      }
    }, [disabled, loading, onPress]);

    const sizeStyles = getSizeStyles(size);
    const variantStyles = getVariantStyles(variant, theme.colors, disabled);

    return (
      <AnimatedPressable
        ref={ref}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || label}
        accessibilityState={{ disabled: disabled || loading }}
        style={[
          styles.base,
          sizeStyles.container,
          variantStyles.container,
          fullWidth && styles.fullWidth,
          animatedStyle,
        ]}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variantStyles.loadingColor}
          />
        ) : (
          <>
            {icon && <View style={styles.iconWrapper}>{icon}</View>}
            <Text
              style={[styles.label, sizeStyles.label, variantStyles.label]}
              maxFontSizeMultiplier={1.3}
            >
              {label}
            </Text>
          </>
        )}
      </AnimatedPressable>
    );
  }
);

Button.displayName = 'Button';

function getSizeStyles(size: ButtonSize) {
  const map = {
    sm: {
      container: { paddingVertical: spacing[1.5], paddingHorizontal: spacing[3], minHeight: 36 },
      label: { fontSize: fontSize.sm },
    },
    md: {
      container: { paddingVertical: spacing[2.5], paddingHorizontal: spacing[5], minHeight: 44 },
      label: { fontSize: fontSize.md },
    },
    lg: {
      container: { paddingVertical: spacing[3], paddingHorizontal: spacing[6], minHeight: 52 },
      label: { fontSize: fontSize.lg },
    },
  };
  return map[size];
}

function getVariantStyles(
  variant: ButtonVariant,
  colors: ReturnType<typeof useTheme>['theme']['colors'],
  disabled: boolean
) {
  const opacity = disabled ? 0.45 : 1;
  const map = {
    solid: {
      container: {
        backgroundColor: colors.brand.primary,
        opacity,
      },
      label: { color: '#FFFFFF', fontFamily: fontFamily.sansSemibold },
      loadingColor: '#FFFFFF',
    },
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.brand.primary,
        opacity,
      },
      label: { color: colors.brand.primary, fontFamily: fontFamily.sansSemibold },
      loadingColor: colors.brand.primary,
    },
    ghost: {
      container: {
        backgroundColor: 'transparent',
        opacity,
      },
      label: { color: colors.brand.primary, fontFamily: fontFamily.sansSemibold },
      loadingColor: colors.brand.primary,
    },
    destructive: {
      container: {
        backgroundColor: colors.status.error,
        opacity,
      },
      label: { color: '#FFFFFF', fontFamily: fontFamily.sansSemibold },
      loadingColor: '#FFFFFF',
    },
  };
  return map[variant];
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.lg,
    gap: spacing[2],
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  label: {
    letterSpacing: -0.2,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
