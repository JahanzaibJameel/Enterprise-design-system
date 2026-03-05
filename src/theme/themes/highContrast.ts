import { createShadows } from '../../tokens/shadows';
import type { Theme } from './light';

export const highContrastTheme: Theme = {
  id: 'highContrast' as const,
  name: 'High Contrast',
  isDark: false,
  colors: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F0F0F0',
      tertiary: '#E0E0E0',
      inverse: '#000000',
    },
    surface: {
      primary: '#FFFFFF',
      secondary: '#F0F0F0',
      overlay: 'rgba(255,255,255,0.98)',
    },
    border: {
      primary: 'rgba(0,0,0,0.6)',
      secondary: 'rgba(0,0,0,0.4)',
      strong: '#000000',
      brand: '#0000CC',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
      tertiary: '#555555',
      inverse: '#FFFFFF',
      brand: '#0000CC',
    },
    brand: {
      primary: '#0000CC',
      secondary: '#5500CC',
      primaryMuted: '#CCCCFF',
      secondaryMuted: '#DDCCFF',
    },
    accent: {
      default: '#06B6D4',
      muted: '#CFFAFE',
    },
    status: {
      success: '#10B981',
      successMuted: '#CCFFCC',
      warning: '#F59E0B',
      warningMuted: '#FFE5CC',
      error: '#F43F5E',
      errorMuted: '#FFCCCC',
      info: '#818CF8',
      infoMuted: '#E0E7FF',
    },
    interactive: {
      default: '#0000CC',
      hovered: '#0000AA',
      pressed: '#000088',
      disabled: '#AAAAAA',
      disabledText: '#666666',
    },
  },
  shadows: createShadows(false),
};
