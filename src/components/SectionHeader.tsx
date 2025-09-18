import { ReactNode, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeDefinition, useAppTheme } from '../theme';

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const createStyles = (theme: ThemeDefinition) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(theme.name === 'retro' ? 2.5 : 2)
    },
    title: {
      ...theme.typography.headline,
      color: theme.colors.text
    },
    action: {
      marginLeft: theme.spacing(2)
    }
  });
