import { useMemo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Restaurant } from '../types';
import { ThemeDefinition, useAppTheme } from '../theme';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ImageBackground
      source={{ uri: restaurant.heroImage }}
      style={styles.hero}
      imageStyle={styles.heroImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.label}>{restaurant.neighborhood.toUpperCase()}</Text>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.tagline}>{restaurant.tagline}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{restaurant.cuisine}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.meta}>{restaurant.dressCode.replace('-', ' ')}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const createStyles = (theme: ThemeDefinition) =>
  StyleSheet.create({
    hero: {
      height: 220,
      justifyContent: 'flex-end',
      marginRight: theme.spacing(4),
      borderRadius: theme.radius.xl,
      overflow: 'hidden',
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.border
    },
    heroImage: {
      borderRadius: theme.radius.xl
    },
    overlay: {
      backgroundColor: theme.colors.overlay,
      padding: theme.spacing(4),
      borderBottomLeftRadius: theme.radius.xl,
      borderBottomRightRadius: theme.radius.xl
    },
    label: {
      ...theme.typography.label,
      color: theme.colors.cloud,
      marginBottom: theme.spacing(1),
      letterSpacing: theme.name === 'retro' ? 1.4 : theme.typography.label.letterSpacing
    },
    name: {
      ...theme.typography.headline,
      fontSize: 24,
      color: theme.colors.white,
      marginBottom: theme.spacing(1)
    },
    tagline: {
      ...theme.typography.body,
      color: theme.colors.cloud,
      marginBottom: theme.spacing(2)
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1)
    },
    meta: {
      ...theme.typography.body,
      color: theme.colors.cloud
    },
    dot: {
      color: theme.colors.cloud
    }
  });
