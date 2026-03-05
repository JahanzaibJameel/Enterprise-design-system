export type Shadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

export const createShadows = (isDark: boolean) => ({
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as Shadow,
  sm: {
    shadowColor: isDark ? '#000' : '#0A0A0F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: isDark ? 0.4 : 0.06,
    shadowRadius: 3,
    elevation: 2,
  } as Shadow,
  md: {
    shadowColor: isDark ? '#000' : '#0A0A0F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDark ? 0.5 : 0.10,
    shadowRadius: 10,
    elevation: 5,
  } as Shadow,
  lg: {
    shadowColor: isDark ? '#000' : '#0A0A0F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: isDark ? 0.6 : 0.15,
    shadowRadius: 24,
    elevation: 10,
  } as Shadow,
  xl: {
    shadowColor: isDark ? '#000' : '#0A0A0F',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: isDark ? 0.7 : 0.20,
    shadowRadius: 40,
    elevation: 20,
  } as Shadow,
  brand: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  } as Shadow,
});
