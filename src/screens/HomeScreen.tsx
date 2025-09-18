import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionHeader } from '../components/SectionHeader';
import { RestaurantCard } from '../components/RestaurantCard';
import { OutfitCard } from '../components/OutfitCard';
import { useWearThere } from '../hooks/useWearThere';
import { theme } from '../theme';

export function HomeScreen() {
  const { trendingRestaurants, outfitFeed } = useWearThere();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroCard}>
        <Text style={styles.tagline}>Wear There</Text>
        <Text style={styles.heroTitle}>Outfit intel for every reservation on your calendar.</Text>
        <Text style={styles.heroSubtitle}>
          Browse vibes, save looks, and walk into dinner feeling like the main character.
        </Text>
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

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing(5),
    gap: theme.spacing(5),
    backgroundColor: theme.colors.background
  },
  heroCard: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing(6),
    borderRadius: theme.radius.xl,
    gap: theme.spacing(2),
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8
  },
  tagline: {
    ...theme.typography.label,
    color: theme.colors.muted
  },
  heroTitle: {
    ...theme.typography.title,
    color: theme.colors.text
  },
  heroSubtitle: {
    ...theme.typography.body,
    color: theme.colors.muted
  },
  horizontalList: {
    gap: theme.spacing(4)
  }
});
