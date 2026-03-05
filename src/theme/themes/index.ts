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
      primary: 'rgba(0,0,0,0.08)',
      secondary: 'rgba(0,0,0,0.04)',
      strong: 'rgba(0,0,0,0.16)',
      brand: primitive.indigo[400],
    },
    text: {
      primary: '#0A0A0F',
      secondary: 'rgba(10,10,15,0.6)',
      tertiary: 'rgba(10,10,15,0.3)',
      inverse: '#FFFFFF',
      brand: primitive.indigo[400],
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
      successMuted: 'rgba(16,185,129,0.15)',
      warning: semantic.status.warning,
      warningMuted: 'rgba(245,158,11,0.15)',
      error: semantic.status.error,
      errorMuted: 'rgba(251,71,133,0.15)',
      info: primitive.indigo[400],
      infoMuted: 'rgba(165,180,252,0.15)',
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

export const darkTheme = {
  id: 'dark' as const,
  name: 'Dark',
  isDark: true,
  colors: {
    background: {
      primary: '#0D0D14',
      secondary: '#13131E',
      tertiary: '#1A1A28',
      inverse: '#F5F5FA',
    },
    surface: {
      primary: '#13131E',
      secondary: '#1A1A28',
      overlay: 'rgba(13,13,20,0.9)',
    },
    border: {
      primary: 'rgba(255,255,255,0.08)',
      secondary: 'rgba(255,255,255,0.04)',
      strong: 'rgba(255,255,255,0.16)',
      brand: primitive.indigo[400],
    },
    text: {
      primary: '#F0F0FA',
      secondary: 'rgba(240,240,250,0.6)',
      tertiary: 'rgba(240,240,250,0.3)',
      inverse: '#0A0A0F',
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

export const amoledTheme = {
  id: 'amoled' as const,
  name: 'AMOLED',
  isDark: true,
  colors: {
    background: {
      primary: '#000000',
      secondary: '#080808',
      tertiary: '#111111',
      inverse: '#FFFFFF',
    },
    surface: {
      primary: '#0C0C0C',
      secondary: '#141414',
      overlay: 'rgba(0,0,0,0.95)',
    },
    border: {
      primary: 'rgba(255,255,255,0.06)',
      secondary: 'rgba(255,255,255,0.03)',
      strong: 'rgba(255,255,255,0.12)',
      brand: primitive.indigo[500],
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.55)',
      tertiary: 'rgba(255,255,255,0.25)',
      inverse: '#000000',
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

export const highContrastTheme = {
  id: 'highContrast' as const,
  name: 'High Contrast',
  isDark: true,
  colors: {
    background: {
      primary: '#000000',
      secondary: '#1A1A1A',
      tertiary: '#2D2D2D',
      inverse: '#FFFFFF',
    },
    surface: {
      primary: '#1A1A1A',
      secondary: '#2D2D2D',
      overlay: 'rgba(0,0,0,0.95)',
    },
    border: {
      primary: 'rgba(255,255,255,0.2)',
      secondary: 'rgba(255,255,255,0.1)',
      strong: 'rgba(255,255,255,0.4)',
      brand: '#0000CC',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.7)',
      tertiary: 'rgba(255,255,255,0.4)',
      inverse: '#000000',
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
      disabled: 'rgba(255,255,255,0.2)',
      disabledText: 'rgba(255,255,255,0.4)',
    },
  },
  shadows: createShadows(true),
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
