import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, amoledTheme, highContrastTheme, type Theme } from './themes/index';

export type ThemeId = 'light' | 'dark' | 'amoled' | 'highContrast' | 'system';

export const allThemes: Record<Exclude<ThemeId, 'system'>, Theme> = {
  light: lightTheme,
  dark: darkTheme,
  amoled: amoledTheme,
  highContrast: highContrastTheme,
};

const THEME_KEY = '@ds_playground_theme';
const ACCENT_KEY = '@ds_playground_accent';

interface ThemeContextValue {
  theme: Theme;
  themeId: ThemeId;
  accentColor: string;
  setThemeId: (id: ThemeId) => void;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [themeId, setThemeIdState] = useState<ThemeId>('system');
  const [accentColor, setAccentColorState] = useState<string>('#6366F1');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [savedTheme, savedAccent] = await Promise.all([
          AsyncStorage.getItem(THEME_KEY),
          AsyncStorage.getItem(ACCENT_KEY),
        ]);
        if (savedTheme) setThemeIdState(savedTheme as ThemeId);
        if (savedAccent) setAccentColorState(savedAccent);
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const setThemeId = useCallback(async (id: ThemeId) => {
    setThemeIdState(id);
    try {
      await AsyncStorage.setItem(THEME_KEY, id);
    } catch {}
  }, []);

  const setAccentColor = useCallback(async (color: string) => {
    setAccentColorState(color);
    try {
      await AsyncStorage.setItem(ACCENT_KEY, color);
    } catch {}
  }, []);

  const theme = useMemo((): Theme => {
    if (themeId === 'system') {
      return systemScheme === 'dark' ? darkTheme : lightTheme;
    }
    return allThemes[themeId];
  }, [themeId, systemScheme]);

  const value = useMemo(
    () => ({ theme, themeId, accentColor, setThemeId, setAccentColor }),
    [theme, themeId, accentColor, setThemeId, setAccentColor]
  );

  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
