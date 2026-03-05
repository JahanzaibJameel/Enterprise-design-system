import React, { forwardRef, useState, useCallback, ReactNode } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  Pressable,
  AccessibilityProps,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeContext';
import { fontFamily, fontSize, spacing, radii, spring } from '../tokens';

export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<TextInputProps, 'style'>, AccessibilityProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  size?: InputSize;
  className?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ 
    label, 
    error, 
    hint, 
    leftIcon, 
    rightIcon, 
    disabled = false, 
    size = 'md',
    className,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    ...rest 
  }, ref) => {
    const { theme } = useTheme();
    const [focused, setFocused] = useState(false);
    const focusProgress = useSharedValue(0);

    const handleFocus = useCallback(() => {
      setFocused(true);
      focusProgress.value = withSpring(1, spring.gentle);
      rest.onFocus?.({} as never);
    }, []);

    const handleBlur = useCallback(() => {
      setFocused(false);
      focusProgress.value = withSpring(0, spring.gentle);
      rest.onBlur?.({} as never);
    }, []);

    const containerStyle = useAnimatedStyle(() => ({
      borderColor: error
        ? theme.colors.status.error
        : interpolateColor(
            focusProgress.value,
            [0, 1],
            [theme.colors.border.primary, theme.colors.brand.primary]
          ),
      borderWidth: focusProgress.value > 0.5 ? 1.5 : 1,
    }));

    const sizeStyles = getSizeStyles(size);

    return (
      <View style={styles.wrapper}>
        {label && (
          <Text
            style={[styles.label, { color: theme.colors.text.secondary }]}
            maxFontSizeMultiplier={1.3}
          >
            {label}
          </Text>
        )}
        <Animated.View
          style={[
            styles.container,
            sizeStyles.container,
            { backgroundColor: theme.colors.background.secondary },
            containerStyle,
            disabled && styles.disabled,
          ]}
        >
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              sizeStyles.input,
              { color: theme.colors.text.primary },
              leftIcon ? styles.inputWithLeft : null,
              rightIcon ? styles.inputWithRight : null,
            ]}
            placeholderTextColor={theme.colors.text.tertiary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            maxFontSizeMultiplier={1.3}
            accessible
            accessibilityLabel={accessibilityLabel || label}
            accessibilityHint={accessibilityHint}
            accessibilityRole={accessibilityRole as any}
            accessibilityState={{ disabled }}
            {...rest}
          />
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </Animated.View>
        {(error || hint) && (
          <Text
            style={[
              styles.helper,
              { color: error ? theme.colors.status.error : theme.colors.text.tertiary },
            ]}
            maxFontSizeMultiplier={1.3}
          >
            {error || hint}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

function getSizeStyles(size: InputSize) {
  switch (size) {
    case 'sm':
      return {
        container: { minHeight: 36, paddingVertical: spacing[1.5] },
        input: { fontSize: fontSize.sm, paddingHorizontal: spacing[3] },
      };
    case 'lg':
      return {
        container: { minHeight: 56, paddingVertical: spacing[3.5] },
        input: { fontSize: fontSize.lg, paddingHorizontal: spacing[4] },
      };
    default:
      return {
        container: { minHeight: 48, paddingVertical: spacing[2.5] },
        input: { fontSize: fontSize.md, paddingHorizontal: spacing[3.5] },
      };
  }
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing[1.5],
  },
  label: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sansMedium,
    letterSpacing: 0.1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.sans,
  },
  inputWithLeft: {
    paddingLeft: spacing[1.5],
  },
  inputWithRight: {
    paddingRight: spacing[1.5],
  },
  iconLeft: {
    paddingLeft: spacing[3],
  },
  iconRight: {
    paddingRight: spacing[3],
  },
  helper: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.sans,
  },
});
