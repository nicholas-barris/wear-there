export const palette = {
  midnight: '#10131A',
  charcoal: '#1A1F2B',
  steel: '#2C3243',
  lavender: '#C5B4FF',
  blush: '#FF9EC7',
  mint: '#8EE3D2',
  sand: '#F4E6D7',
  cloud: '#F8F8FB',
  white: '#FFFFFF',
  textPrimary: '#0F1115',
  textSecondary: '#505769'
};

export const theme = {
  colors: {
    background: palette.cloud,
    card: palette.white,
    highlight: palette.lavender,
    accent: palette.blush,
    text: palette.textPrimary,
    muted: palette.textSecondary,
    shadow: 'rgba(16, 19, 26, 0.08)',
    cloud: palette.cloud,
    white: palette.white
  },
  spacing(multiplier: number) {
    return 4 * multiplier;
  },
  radius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  typography: {
    title: {
      fontSize: 28,
      fontWeight: '700' as const,
      letterSpacing: -0.5
    },
    headline: {
      fontSize: 22,
      fontWeight: '600' as const,
      letterSpacing: -0.2
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const
    },
    label: {
      fontSize: 13,
      fontWeight: '600' as const,
      letterSpacing: 0.3,
      textTransform: 'uppercase' as const
    }
  }
};
