import { primitive, semantic } from '../../tokens/colors';
import { createShadows } from '../../tokens/shadows';
import type { Theme } from './light';

export const darkTheme: Theme = {
  id: 'dark' as const,
  name: 'Dark',
  isDark: true,
  colors: {
    background: {
      primary: primitive.neutral[950],
      secondary: primitive.neutral[900],
      tertiary: primitive.neutral[800],
      inverse: primitive.neutral[50],
    },
    surface: {
      primary: primitive.neutral[900],
      secondary: primitive.neutral[800],
      overlay: 'rgba(13,13,20,0.9)',
    },
    border: {
      primary: 'rgba(255,255,255,0.08)',
      secondary: 'rgba(255,255,255,0.04)',
      strong: 'rgba(255,255,255,0.16)',
      brand: primitive.indigo[400],
    },
    text: {
      primary: primitive.neutral[100],
      secondary: 'rgba(240,240,250,0.6)',
      tertiary: 'rgba(240,240,250,0.3)',
      inverse: primitive.neutral[950],
      brand: primitive.indigo[400],
    },
    brand: {
      primary: primitive.indigo[400],
      secondary: primitive.violet[400],
      primaryMuted: 'rgba(99,102,241,0.15)',
      secondaryMuted: 'rgba(139,92,246,0.15)',
    },
    accent: {
      default: primitive.cyan[400],
      muted: 'rgba(34,211,238,0.15)',
    },
    status: {
      success: primitive.emerald[400],
      successMuted: 'rgba(52,211,153,0.15)',
      warning: primitive.amber[400],
      warningMuted: 'rgba(251,191,36,0.15)',
      error: primitive.rose[400],
      errorMuted: 'rgba(251,113,133,0.15)',
      info: primitive.indigo[300],
      infoMuted: 'rgba(165,180,252,0.15)',
    },
    interactive: {
      default: primitive.indigo[400],
      hovered: primitive.indigo[300],
      pressed: primitive.indigo[200],
      disabled: 'rgba(255,255,255,0.12)',
      disabledText: 'rgba(255,255,255,0.25)',
    },
  },
  shadows: createShadows(true),
};
