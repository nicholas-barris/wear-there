import { useMemo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { OutfitEntry } from '../types';
import { ThemeDefinition, useAppTheme } from '../theme';

interface OutfitCardProps {
  outfit: OutfitEntry;
}

export function OutfitCard({ outfit }: OutfitCardProps) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: outfit.image }} style={styles.image} imageStyle={styles.imageInner}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{outfit.vibe.replace('-', ' ')}</Text>
        </View>
      </ImageBackground>
      <View style={styles.meta}>
        <Text style={styles.restaurant}>{outfit.restaurantName}</Text>
        <Text style={styles.title}>{outfit.title}</Text>
        <Text style={styles.byline}>Styled by {outfit.wornBy}</Text>
        <Text style={styles.notes} numberOfLines={2}>
          {outfit.notes}
        </Text>
        <View style={styles.captionRow}>
          <Text style={styles.caption}>{outfit.likes} likes</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.caption}>{outfit.saves} saves</Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: ThemeDefinition) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.name === 'retro' ? theme.colors.cardAlt : theme.colors.card,
      borderRadius: theme.radius.xl,
      overflow: 'hidden',
      marginRight: theme.spacing(4),
      width: 260,
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.border,
      shadowColor: theme.shadows.card.shadowColor,
      shadowOpacity: theme.shadows.card.shadowOpacity,
      shadowRadius: theme.shadows.card.shadowRadius,
      shadowOffset: theme.shadows.card.shadowOffset,
      elevation: theme.shadows.card.elevation
    },
    image: {
      height: 200,
      justifyContent: 'flex-start'
    },
    imageInner: {
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl
    },
    pill: {
      alignSelf: 'flex-start',
      margin: theme.spacing(4),
      paddingVertical: theme.spacing(1),
      paddingHorizontal: theme.spacing(2.5),
      backgroundColor: theme.colors.pill,
      borderRadius: theme.radius.pill,
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.border
    },
    pillText: {
      ...theme.typography.label,
      color: theme.colors.pillText
    },
    meta: {
      padding: theme.spacing(4),
      gap: theme.spacing(1.5),
      backgroundColor: theme.name === 'glass' ? 'transparent' : theme.colors.card
    },
    restaurant: {
      ...theme.typography.label,
      color: theme.colors.muted
    },
    title: {
      ...theme.typography.headline,
      fontSize: 20,
      color: theme.colors.text
    },
    byline: {
      ...theme.typography.body,
      color: theme.colors.muted
    },
    notes: {
      ...theme.typography.body,
      color: theme.colors.text
    },
    captionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1)
    },
    caption: {
      ...theme.typography.body,
      fontSize: 14,
      color: theme.colors.muted
    },
    separator: {
      color: theme.colors.muted
    }
  });
