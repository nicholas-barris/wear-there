import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OutfitEntry } from '../types';
import { ThemeDefinition, useAppTheme } from '../theme';

interface OutfitListItemProps {
  outfit: OutfitEntry;
}

export function OutfitListItem({ outfit }: OutfitListItemProps) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{outfit.title}</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{outfit.vibe.replace('-', ' ')}</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>{outfit.restaurantName}</Text>
      <Text style={styles.meta}>Logged on {new Date(outfit.date).toLocaleDateString()}</Text>
      <Text style={styles.notes}>{outfit.notes}</Text>
      <View style={styles.piecesRow}>
        {outfit.pieces.map((piece) => (
          <View key={piece} style={styles.pieceChip}>
            <Text style={styles.pieceText}>{piece}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: ThemeDefinition) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.name === 'retro' ? theme.colors.cardAlt : theme.colors.card,
      padding: theme.spacing(5),
      borderRadius: theme.radius.xl,
      gap: theme.spacing(2),
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.border,
      shadowColor: theme.shadows.card.shadowColor,
      shadowOpacity: theme.shadows.card.shadowOpacity,
      shadowRadius: theme.shadows.card.shadowRadius,
      shadowOffset: theme.shadows.card.shadowOffset,
      elevation: theme.shadows.card.elevation
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      ...theme.typography.headline,
      fontSize: 20,
      color: theme.colors.text,
      flex: 1,
      marginRight: theme.spacing(3)
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.muted
    },
    meta: {
      ...theme.typography.body,
      fontSize: 14,
      color: theme.colors.muted
    },
    notes: {
      ...theme.typography.body,
      color: theme.colors.text
    },
    piecesRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing(1.5)
    },
    pieceChip: {
      backgroundColor: theme.colors.highlight,
      paddingHorizontal: theme.spacing(2),
      paddingVertical: theme.spacing(1),
      borderRadius: theme.radius.lg,
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.border
    },
    pieceText: {
      ...theme.typography.body,
      fontSize: 14,
      color: theme.colors.text
    },
    pill: {
      backgroundColor: theme.colors.pill,
      paddingHorizontal: theme.spacing(2.5),
      paddingVertical: theme.spacing(1),
      borderRadius: theme.radius.pill,
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.border
    },
    pillText: {
      ...theme.typography.label,
      color: theme.colors.pillText
    }
  });
