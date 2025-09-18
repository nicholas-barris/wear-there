import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface ChipProps {
  label: string;
  active?: boolean;
  icon?: ReactNode;
  onPress?: () => void;
}

export function Chip({ label, active = false, icon, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      style={[styles.container, active ? styles.active : styles.inactive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={[styles.label, active ? styles.activeLabel : null]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
    paddingVertical: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(3),
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  inactive: {
    backgroundColor: theme.colors.card,
    borderColor: 'rgba(16,19,26,0.06)'
  },
  active: {
    backgroundColor: theme.colors.highlight,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4
  },
  label: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.muted
  },
  activeLabel: {
    color: theme.colors.text
  }
});
