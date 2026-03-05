import { primitive, semantic } from '../../tokens/colors';
import { createShadows } from '../../tokens/shadows';

export const lightTheme = {
  id: 'light' as const,
  name: 'Light',
  isDark: false,
  colors: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F5FA',
      tertiary: '#EBEBF2',
      inverse: '#0A0A0F',
    },
    surface: {
      primary: '#FFFFFF',
      secondary: '#F5F5FA',
      overlay: 'rgba(255,255,255,0.85)',
    },
    border: {
      primary: 'rgba(10,10,15,0.08)',
      secondary: 'rgba(10,10,15,0.05)',
      strong: 'rgba(10,10,15,0.16)',
      brand: primitive.indigo[500],
    },
    text: {
      primary: '#0A0A0F',
      secondary: 'rgba(10,10,15,0.6)',
      tertiary: 'rgba(10,10,15,0.35)',
      inverse: '#FFFFFF',
      brand: primitive.indigo[600],
    },
    brand: {
      primary: primitive.indigo[600],
      secondary: primitive.violet[600],
      primaryMuted: primitive.indigo[100],
      secondaryMuted: primitive.violet[100],
    },
    accent: {
      default: primitive.cyan[500],
      muted: primitive.cyan[100],
    },
    status: {
      success: semantic.status.success,
      successMuted: '#D1FAE5',
      warning: semantic.status.warning,
      warningMuted: '#FEF3C7',
      error: semantic.status.error,
      errorMuted: '#FFE4E6',
      info: semantic.status.info,
      infoMuted: primitive.indigo[100],
    },
    interactive: {
      default: primitive.indigo[600],
      hovered: primitive.indigo[700],
      pressed: primitive.indigo[800],
      disabled: 'rgba(10,10,15,0.16)',
      disabledText: 'rgba(10,10,15,0.3)',
    },
  },
  shadows: createShadows(false),
};

export interface Theme {
  id: string;
  name: string;
  isDark: boolean;
  colors: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    surface: {
      primary: string;
      secondary: string;
      overlay: string;
    };
    border: {
      primary: string;
      secondary: string;
      strong: string;
      brand: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      brand: string;
    };
    brand: {
      primary: string;
      secondary: string;
      primaryMuted: string;
      secondaryMuted: string;
    };
    accent: {
      default: string;
      muted: string;
    };
    status: {
      success: string;
      successMuted: string;
      warning: string;
      warningMuted: string;
      error: string;
      errorMuted: string;
      info: string;
      infoMuted: string;
    };
    interactive: {
      default: string;
      hovered: string;
      pressed: string;
      disabled: string;
      disabledText: string;
    };
  };
  shadows: Record<string, any>;
}
