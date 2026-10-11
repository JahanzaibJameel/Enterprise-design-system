import { primitive, semantic } from '../../tokens/colors';
import { createShadows } from '../../tokens/shadows';
import type { Theme } from './light';

export const amoledTheme: Theme = {
  id: 'amoled' as const,
  name: 'AMOLED',
  isDark: true,
  colors: {
    background: {
      primary: primitive.neutral[1000],
      secondary: primitive.neutral[900],
      tertiary: primitive.neutral[800],
      inverse: primitive.neutral[0],
    },
    surface: {
      primary: primitive.neutral[900],
      secondary: primitive.neutral[800],
      overlay: 'rgba(0,0,0,0.95)',
    },
    border: {
      primary: 'rgba(255,255,255,0.06)',
      secondary: 'rgba(255,255,255,0.03)',
      strong: 'rgba(255,255,255,0.12)',
      brand: primitive.indigo[500],
    },
    text: {
      primary: primitive.neutral[0],
      secondary: 'rgba(255,255,255,0.55)',
      tertiary: 'rgba(255,255,255,0.25)',
      inverse: primitive.neutral[1000],
      brand: primitive.indigo[400],
    },
    brand: {
      primary: primitive.indigo[500],
      secondary: primitive.violet[500],
      primaryMuted: 'rgba(99,102,241,0.12)',
      secondaryMuted: 'rgba(139,92,246,0.12)',
    },
    accent: {
      default: primitive.cyan[400],
      muted: 'rgba(34,211,238,0.12)',
    },
    status: {
      success: primitive.emerald[400],
      successMuted: 'rgba(52,211,153,0.12)',
      warning: primitive.amber[400],
      warningMuted: 'rgba(251,191,36,0.12)',
      error: primitive.rose[400],
      errorMuted: 'rgba(251,113,133,0.12)',
      info: primitive.indigo[400],
      infoMuted: 'rgba(129,140,248,0.12)',
    },
    interactive: {
      default: primitive.indigo[500],
      hovered: primitive.indigo[400],
      pressed: primitive.indigo[300],
      disabled: 'rgba(255,255,255,0.08)',
      disabledText: 'rgba(255,255,255,0.2)',
    },
  },
  shadows: createShadows(true),
};
