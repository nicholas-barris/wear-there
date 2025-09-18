import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Chip } from '../components/Chip';
import { SectionHeader } from '../components/SectionHeader';
import { useWearThere } from '../hooks/useWearThere';
import { ThemeDefinition, useAppTheme } from '../theme';
import { DressCode, Restaurant } from '../types';

const dressCodeFilters: Array<{ code: DressCode | 'all'; label: string; emoji: string }> = [
  { code: 'all', label: 'Any vibe', emoji: '✨' },
  { code: 'casual', label: 'Casual', emoji: '👟' },
  { code: 'smart-casual', label: 'Smart casual', emoji: '🧥' },
  { code: 'business-casual', label: 'Business casual', emoji: '💼' },
  { code: 'elevated', label: 'Elevated', emoji: '🥂' },
  { code: 'formal', label: 'Formal', emoji: '🎩' }
];

export function RestaurantListScreen() {
  const { restaurants } = useWearThere();
  const [activeCode, setActiveCode] = useState<DressCode | 'all'>('all');
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const filteredRestaurants = useMemo(() => {
    if (activeCode === 'all') {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.dressCode === activeCode);
  }, [activeCode, restaurants]);

  const renderRestaurant = ({ item }: { item: Restaurant }) => (
    <View style={styles.listCard}>
      <Text style={styles.listLabel}>{item.neighborhood.toUpperCase()}</Text>
      <Text style={styles.listTitle}>{item.name}</Text>
      <Text style={styles.listSubtitle}>{item.tagline}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>{item.cuisine}</Text>
        <Text style={styles.metaDot}>•</Text>
        <Text style={styles.meta}>{item.dressCode.replace('-', ' ')}</Text>
      </View>
      <View style={styles.chipRow}>
        {item.mood.map((mood) => (
          <View key={mood} style={styles.moodChip}>
            <Text style={styles.moodChipText}>{mood}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Where are we dressing for?"
        action={<Text style={styles.resultCount}>{filteredRestaurants.length} spots</Text>}
      />
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderRestaurant}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.filterRow}>
            {dressCodeFilters.map((filter) => (
              <Chip
                key={filter.code}
                label={`${filter.emoji} ${filter.label}`}
                active={activeCode === filter.code}
                onPress={() => setActiveCode(filter.code)}
              />
            ))}
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const createStyles = (theme: ThemeDefinition) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing(5),
      paddingTop: theme.spacing(5)
    },
    listContent: {
      paddingBottom: theme.spacing(10),
      gap: theme.spacing(4)
    },
    filterRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing(2),
      marginBottom: theme.spacing(5)
    },
    listCard: {
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
    listLabel: {
      ...theme.typography.label,
      color: theme.colors.muted
    },
    listTitle: {
      ...theme.typography.headline,
      fontSize: 24,
      color: theme.colors.text
    },
    listSubtitle: {
      ...theme.typography.body,
      color: theme.colors.muted
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1)
    },
    meta: {
      ...theme.typography.body,
      color: theme.colors.muted
    },
    metaDot: {
      color: theme.colors.muted
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing(1.5)
    },
    moodChip: {
      backgroundColor: theme.colors.highlight,
      paddingHorizontal: theme.spacing(2),
      paddingVertical: theme.spacing(1),
      borderRadius: theme.radius.lg,
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.border
    },
    moodChipText: {
      ...theme.typography.body,
      fontSize: 14,
      color: theme.colors.text
    },
    separator: {
      height: theme.spacing(2)
    },
    resultCount: {
      ...theme.typography.body,
      color: theme.colors.muted
    }
  });
