import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export type ThemeName = 'retro' | 'glass';

type ShadowConfig =
  Pick<ViewStyle, 'shadowColor' | 'shadowOpacity' | 'shadowRadius' | 'shadowOffset'> & {
    elevation: number;
  };

export interface ThemeColors {
  background: string;
  card: string;
  cardAlt: string;
  highlight: string;
  accent: string;
  text: string;
  muted: string;
  overlay: string;
  pill: string;
  pillText: string;
  navBar: string;
  navBorder: string;
  border: string;
  chipBorder: string;
  chipText: string;
  chipActiveText: string;
  chipActiveBackground: string;
  chipInactiveBackground: string;
  inputBackground: string;
  inputBorder: string;
  buttonTextOnAccent: string;
  heroDecor1: string;
  heroDecor2: string;
  heroDecor3: string;
  white: string;
  cloud: string;
}

export interface ThemeDefinition {
  name: ThemeName;
  colors: ThemeColors;
  spacing: (multiplier: number) => number;
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    pill: number;
  };
  typography: {
    title: TextStyle;
    headline: TextStyle;
    body: TextStyle;
    label: TextStyle;
  };
  statusBarStyle: 'light' | 'dark';
  shadows: {
    card: ShadowConfig;
    pop: ShadowConfig;
    input: ShadowConfig;
  };
  icons: {
    home: string;
    restaurants: string;
    closet: string;
  };
}

interface ThemeContextValue {
  name: ThemeName;
  theme: ThemeDefinition;
  setTheme: (name: ThemeName) => void;
}

const createSpacing = (base: number) => (multiplier: number) => base * multiplier;

const retroTheme: ThemeDefinition = {
  name: 'retro',
  colors: {
    background: '#FFF3E2',
    card: '#FFF9F0',
    cardAlt: '#FFE3F8',
    highlight: '#FFD166',
    accent: '#FF5D8F',
    text: '#301253',
    muted: '#7D5C8C',
    overlay: 'rgba(48, 18, 83, 0.45)',
    pill: '#FFE066',
    pillText: '#301253',
    navBar: '#FFE3F5',
    navBorder: 'rgba(48, 18, 83, 0.22)',
    border: 'rgba(48, 18, 83, 0.24)',
    chipBorder: 'rgba(48, 18, 83, 0.24)',
    chipText: '#7D5C8C',
    chipActiveText: '#301253',
    chipActiveBackground: '#FFD166',
    chipInactiveBackground: '#FFF8EC',
    inputBackground: '#FFFFFF',
    inputBorder: 'rgba(48, 18, 83, 0.2)',
    buttonTextOnAccent: '#FFFDF6',
    heroDecor1: '#FF8A5B',
    heroDecor2: '#56CFE1',
    heroDecor3: '#FFBF69',
    white: '#FFFFFF',
    cloud: '#FFF7EF'
  },
  spacing: createSpacing(4),
  radius: {
    sm: 12,
    md: 20,
    lg: 28,
    xl: 36,
    pill: 999
  },
  typography: {
    title: {
      fontSize: 30,
      fontWeight: '800',
      letterSpacing: -0.6,
      lineHeight: 36
    },
    headline: {
      fontSize: 22,
      fontWeight: '700',
      letterSpacing: -0.1,
      lineHeight: 28
    },
    body: {
      fontSize: 16,
      fontWeight: '500',
      letterSpacing: 0.15,
      lineHeight: 22
    },
    label: {
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 1.2,
      textTransform: 'uppercase'
    }
  },
  statusBarStyle: 'dark',
  shadows: {
    card: {
      shadowColor: 'rgba(48, 18, 83, 0.55)',
      shadowOpacity: 0.2,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 14 },
      elevation: 8
    },
    pop: {
      shadowColor: 'rgba(255, 93, 143, 0.55)',
      shadowOpacity: 0.28,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 18 },
      elevation: 12
    },
    input: {
      shadowColor: 'rgba(48, 18, 83, 0.35)',
      shadowOpacity: 0.18,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 10 },
      elevation: 6
    }
  },
  icons: {
    home: '🪩',
    restaurants: '🍸',
    closet: '👗'
  }
};

const glassTheme: ThemeDefinition = {
  name: 'glass',
  colors: {
    background: '#EEF1F8',
    card: 'rgba(255, 255, 255, 0.82)',
    cardAlt: 'rgba(255, 255, 255, 0.65)',
    highlight: 'rgba(255, 255, 255, 0.6)',
    accent: '#0A84FF',
    text: '#0F172A',
    muted: '#5B6B83',
    overlay: 'rgba(15, 23, 42, 0.24)',
    pill: 'rgba(255, 255, 255, 0.75)',
    pillText: '#0F172A',
    navBar: 'rgba(255, 255, 255, 0.78)',
    navBorder: 'rgba(15, 23, 42, 0.08)',
    border: 'rgba(15, 23, 42, 0.12)',
    chipBorder: 'rgba(255, 255, 255, 0.5)',
    chipText: '#334155',
    chipActiveText: '#0F172A',
    chipActiveBackground: 'rgba(255, 255, 255, 0.92)',
    chipInactiveBackground: 'rgba(255, 255, 255, 0.55)',
    inputBackground: 'rgba(255, 255, 255, 0.9)',
    inputBorder: 'rgba(15, 23, 42, 0.08)',
    buttonTextOnAccent: '#F8FAFF',
    heroDecor1: 'rgba(10, 132, 255, 0.35)',
    heroDecor2: 'rgba(255, 255, 255, 0.5)',
    heroDecor3: 'rgba(255, 255, 255, 0.35)',
    white: '#FFFFFF',
    cloud: 'rgba(255, 255, 255, 0.85)'
  },
  spacing: createSpacing(4),
  radius: {
    sm: 10,
    md: 16,
    lg: 22,
    xl: 28,
    pill: 999
  },
  typography: {
    title: {
      fontSize: 28,
      fontWeight: '700',
      letterSpacing: -0.2,
      lineHeight: 34
    },
    headline: {
      fontSize: 20,
      fontWeight: '600',
      letterSpacing: 0,
      lineHeight: 26
    },
    body: {
      fontSize: 15,
      fontWeight: '400',
      letterSpacing: 0.2,
      lineHeight: 21
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: 0.6,
      textTransform: 'uppercase'
    }
  },
  statusBarStyle: 'dark',
  shadows: {
    card: {
      shadowColor: 'rgba(15, 23, 42, 0.25)',
      shadowOpacity: 0.12,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 18 },
      elevation: 6
    },
    pop: {
      shadowColor: 'rgba(15, 23, 42, 0.25)',
      shadowOpacity: 0.16,
      shadowRadius: 32,
      shadowOffset: { width: 0, height: 22 },
      elevation: 10
    },
    input: {
      shadowColor: 'rgba(15, 23, 42, 0.18)',
      shadowOpacity: 0.08,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 12 },
      elevation: 4
    }
  },
  icons: {
    home: '🏠',
    restaurants: '🥢',
    closet: '🧺'
  }
};

export const themes: Record<ThemeName, ThemeDefinition> = {
  retro: retroTheme,
  glass: glassTheme
};

export const themeMetadata: Record<ThemeName, { label: string; emoji: string; heroTitle: string; heroSubtitle: string }>
  = {
    retro: {
      label: 'Retro 70s',
      emoji: '🪩',
      heroTitle: 'Cue the disco lights.',
      heroSubtitle: 'Sequins, sunburst gradients, and statement shades inspired by Partiful-era nights.'
    },
    glass: {
      label: 'Glass minimal',
      emoji: '🪟',
      heroTitle: 'Signal-ready styling for every invite.',
      heroSubtitle: 'Translucent layers and calm blues channeling a clean Apple Glass aesthetic.'
    }
  };

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('retro');

  const value = useMemo(
    () => ({
      name: themeName,
      theme: themes[themeName],
      setTheme: setThemeName
    }),
    [themeName]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}

