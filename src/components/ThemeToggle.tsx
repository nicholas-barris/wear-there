import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { themeMetadata, ThemeDefinition, ThemeName, useAppTheme } from '../theme';

const THEME_OPTIONS: ThemeName[] = ['retro', 'glass'];

export function ThemeToggle() {
  const { name, setTheme, theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {THEME_OPTIONS.map((option) => {
        const metadata = themeMetadata[option];
        const active = option === name;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.option, active ? styles.optionActive : styles.optionInactive]}
            onPress={() => setTheme(option)}
            activeOpacity={0.92}
          >
            <View style={styles.labelStack}>
              <Text style={[styles.optionText, active ? styles.optionTextActive : null]}>
                {metadata.emoji} {metadata.label}
              </Text>
              <Text style={[styles.optionHint, active ? styles.optionHintActive : null]}>
                {metadata.heroTitle}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const createStyles = (theme: ThemeDefinition) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.name === 'glass' ? theme.colors.card : 'transparent',
      borderRadius: theme.radius.xl,
      padding: theme.spacing(1),
      gap: theme.spacing(1),
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.border,
      shadowColor: theme.name === 'glass' ? theme.shadows.card.shadowColor : 'transparent',
      shadowOpacity: theme.name === 'glass' ? 0.08 : 0,
      shadowRadius: theme.name === 'glass' ? 14 : 0,
      shadowOffset: theme.name === 'glass' ? { width: 0, height: 8 } : { width: 0, height: 0 },
      elevation: theme.name === 'glass' ? 3 : 0
    },
    option: {
      flex: 1,
      paddingVertical: theme.spacing(theme.name === 'retro' ? 1.75 : 1.5),
      paddingHorizontal: theme.spacing(2.5),
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    optionInactive: {
      backgroundColor: theme.colors.chipInactiveBackground,
      borderColor: theme.colors.chipBorder
    },
    optionActive: {
      backgroundColor:
        theme.name === 'retro' ? theme.colors.accent : theme.colors.chipActiveBackground,
      borderColor: theme.name === 'retro' ? theme.colors.accent : theme.colors.navBorder,
      shadowColor: theme.shadows.card.shadowColor,
      shadowOpacity: theme.shadows.card.shadowOpacity,
      shadowRadius: theme.shadows.card.shadowRadius,
      shadowOffset: theme.shadows.card.shadowOffset,
      elevation: theme.shadows.card.elevation
    },
    labelStack: {
      gap: theme.spacing(0.5)
    },
    optionText: {
      ...theme.typography.body,
      fontWeight: '600',
      color: theme.colors.chipText
    },
    optionTextActive: {
      color:
        theme.name === 'retro' ? theme.colors.buttonTextOnAccent : theme.colors.chipActiveText
    },
    optionHint: {
      ...theme.typography.label,
      fontSize: 11,
      letterSpacing: theme.name === 'retro' ? 0.8 : 0.4,
      color: theme.colors.muted
    },
    optionHintActive: {
      color:
        theme.name === 'retro' ? theme.colors.buttonTextOnAccent : theme.colors.chipActiveText
    }
  });
