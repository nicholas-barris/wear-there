import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionHeader } from '../components/SectionHeader';
import { RestaurantCard } from '../components/RestaurantCard';
import { OutfitCard } from '../components/OutfitCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { useWearThere } from '../hooks/useWearThere';
import { ThemeDefinition, themeMetadata, useAppTheme } from '../theme';

export function HomeScreen() {
  const { trendingRestaurants, outfitFeed } = useWearThere();
  const { theme, name } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const metadata = themeMetadata[name];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topRow}>
        <ThemeToggle />
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroDecorOne} />
        <View style={styles.heroDecorTwo} />
        <View style={styles.heroDecorThree} />
        <View style={styles.brandRow}>
          <Text style={styles.brandMark}>Wear There</Text>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{metadata.emoji} {metadata.label}</Text>
          </View>
        </View>
        <Text style={styles.heroTitle}>{metadata.heroTitle}</Text>
        <Text style={styles.heroSubtitle}>{metadata.heroSubtitle}</Text>
        <Text style={styles.heroFootnote}>Outfit intel for every reservation on your calendar.</Text>
      </View>

      <SectionHeader title="Trending spots" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {trendingRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </ScrollView>

      <SectionHeader title="Recent fits" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {outfitFeed.map((outfit) => (
          <OutfitCard key={outfit.id} outfit={outfit} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const createStyles = (theme: ThemeDefinition) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing(5),
      gap: theme.spacing(5),
      backgroundColor: theme.colors.background,
      paddingBottom: theme.spacing(10)
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    heroCard: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: theme.name === 'retro' ? theme.colors.cardAlt : theme.colors.card,
      padding: theme.spacing(6),
      borderRadius: theme.radius.xl,
      gap: theme.spacing(2.5),
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.border,
      shadowColor: theme.shadows.pop.shadowColor,
      shadowOpacity: theme.shadows.pop.shadowOpacity,
      shadowRadius: theme.shadows.pop.shadowRadius,
      shadowOffset: theme.shadows.pop.shadowOffset,
      elevation: theme.shadows.pop.elevation
    },
    heroDecorOne: {
      position: 'absolute',
      width: theme.spacing(theme.name === 'retro' ? 30 : 34),
      height: theme.spacing(theme.name === 'retro' ? 30 : 34),
      backgroundColor: theme.colors.heroDecor1,
      borderRadius: theme.radius.xl * 2,
      top: theme.spacing(theme.name === 'retro' ? -8 : -10),
      right: theme.spacing(theme.name === 'retro' ? -6 : -8),
      opacity: theme.name === 'retro' ? 0.55 : 0.45,
      transform: [{ rotate: theme.name === 'retro' ? '26deg' : '36deg' }]
    },
    heroDecorTwo: {
      position: 'absolute',
      width: theme.spacing(theme.name === 'retro' ? 26 : 28),
      height: theme.spacing(theme.name === 'retro' ? 26 : 30),
      backgroundColor: theme.colors.heroDecor2,
      borderRadius: theme.radius.xl * 2,
      bottom: theme.spacing(theme.name === 'retro' ? -10 : -12),
      left: theme.spacing(theme.name === 'retro' ? -8 : -10),
      opacity: theme.name === 'retro' ? 0.5 : 0.35,
      transform: [{ rotate: theme.name === 'retro' ? '-18deg' : '-32deg' }]
    },
    heroDecorThree: {
      position: 'absolute',
      width: theme.spacing(theme.name === 'retro' ? 18 : 20),
      height: theme.spacing(theme.name === 'retro' ? 18 : 20),
      backgroundColor: theme.colors.heroDecor3,
      borderRadius: theme.radius.xl * 2,
      top: theme.spacing(theme.name === 'retro' ? 10 : 6),
      left: theme.spacing(theme.name === 'retro' ? -4 : -6),
      opacity: theme.name === 'retro' ? 0.6 : 0.25,
      transform: [{ rotate: theme.name === 'retro' ? '12deg' : '40deg' }]
    },
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    brandMark: {
      ...theme.typography.label,
      fontSize: theme.name === 'retro' ? 16 : 14,
      letterSpacing: theme.name === 'retro' ? 4 : 2,
      color: theme.colors.muted
    },
    heroBadge: {
      paddingHorizontal: theme.spacing(2.5),
      paddingVertical: theme.spacing(1),
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.pill,
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.border
    },
    heroBadgeText: {
      ...theme.typography.body,
      fontSize: 14,
      color: theme.colors.pillText
    },
    heroTitle: {
      ...theme.typography.title,
      color: theme.colors.text
    },
    heroSubtitle: {
      ...theme.typography.body,
      color: theme.colors.text
    },
    heroFootnote: {
      ...theme.typography.body,
      fontSize: 14,
      color: theme.colors.muted
    },
    horizontalList: {
      gap: theme.spacing(4)
    }
  });
