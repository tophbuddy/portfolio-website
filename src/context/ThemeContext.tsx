import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ThemeMode, ThemeColors, defaultTheme, lightTheme, darkTheme } from '@/styles/theme';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    // Check for saved theme preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
      if (saved) return saved;
    }
    return 'system';
  });

  const [colors, setColors] = useState<ThemeColors>(defaultTheme.colors);

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateTheme(theme: ThemeMode, isDark: boolean) {
      if (theme === 'system') {
        setColors(isDark ? darkTheme : lightTheme);
        document.documentElement.classList.toggle('dark', isDark);
      } else {
        const isDarkTheme = theme === 'dark';
        setColors(isDarkTheme ? darkTheme : lightTheme);
        document.documentElement.classList.toggle('dark', isDarkTheme);
      }
    }

    function handleChange(e: MediaQueryListEvent) {
      if (theme === 'system') {
        updateTheme('system', e.matches);
      }
    }

    // Initial setup
    updateTheme(theme, mediaQuery.matches);

    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
