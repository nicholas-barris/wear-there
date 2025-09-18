import { ReactNode, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemeDefinition, useAppTheme } from '../theme';

interface ChipProps {
  label: string;
  active?: boolean;
  icon?: ReactNode;
  onPress?: () => void;
}

export function Chip({ label, active = false, icon, onPress }: ChipProps) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={[styles.container, active ? styles.active : styles.inactive]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {icon}
      <Text style={[styles.label, active ? styles.activeLabel : null]}>{label}</Text>
    </TouchableOpacity>
  );
}

const createStyles = (theme: ThemeDefinition) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1),
      paddingVertical: theme.spacing(theme.name === 'retro' ? 1.5 : 1.25),
      paddingHorizontal: theme.spacing(theme.name === 'retro' ? 3 : 3.5),
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.chipBorder,
      backgroundColor: theme.colors.chipInactiveBackground
    },
    inactive: {
      borderColor: theme.colors.chipBorder
    },
    active: {
      backgroundColor: theme.colors.chipActiveBackground,
      borderColor: theme.colors.accent,
      shadowColor: theme.shadows.card.shadowColor,
      shadowOpacity: theme.shadows.card.shadowOpacity,
      shadowRadius: theme.shadows.card.shadowRadius,
      shadowOffset: theme.shadows.card.shadowOffset,
      elevation: theme.shadows.card.elevation
    },
    label: {
      ...theme.typography.body,
      fontWeight: '600',
      color: theme.colors.chipText
    },
    activeLabel: {
      color: theme.colors.chipActiveText
    }
  });
