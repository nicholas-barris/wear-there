import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Chip } from '../components/Chip';
import { useWearThere } from '../hooks/useWearThere';
import { theme } from '../theme';
import { ClosetStackParamList } from '../navigation/types';
import { DressCode } from '../types';

type LogOutfitScreenProps = NativeStackScreenProps<ClosetStackParamList, 'LogOutfit'>;

const vibes: Array<{ code: DressCode; label: string; emoji: string }> = [
  { code: 'casual', label: 'Casual', emoji: '☕️' },
  { code: 'smart-casual', label: 'Smart', emoji: '🪩' },
  { code: 'business-casual', label: 'Biz', emoji: '📓' },
  { code: 'elevated', label: 'Elevated', emoji: '🥂' },
  { code: 'formal', label: 'Formal', emoji: '🎻' }
];

export function LogOutfitScreen({ navigation }: LogOutfitScreenProps) {
  const { restaurants, addOutfit, createDraft } = useWearThere();
  const draft = useMemo(createDraft, [createDraft]);
  const [restaurantId, setRestaurantId] = useState(draft.restaurantId || restaurants[0]?.id || '');
  const [vibe, setVibe] = useState<DressCode>(draft.vibe);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [pieces, setPieces] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = () => {
    if (!restaurantId || !title.trim()) {
      Alert.alert('Almost there', 'Pick a restaurant and give the look a title.');
      return;
    }

    const restaurant = restaurants.find((item) => item.id === restaurantId);
    if (!restaurant) {
      Alert.alert('Whoops', 'Restaurant not found.');
      return;
    }

    addOutfit({
      id: `fit-${Date.now()}`,
      restaurantId,
      restaurantName: restaurant.name,
      wornBy: 'You',
      date: draft.date,
      vibe,
      title: title.trim(),
      notes: notes.trim() || 'Documented via Wear There.',
      likes: 0,
      saves: 0,
      image:
        image.trim() ||
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
      pieces: pieces
        .split(',')
        .map((piece) => piece.trim())
        .filter(Boolean)
    });

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Log what you wore</Text>

      <Text style={styles.sectionLabel}>Restaurant</Text>
      <View style={styles.chipGroup}>
        {restaurants.map((restaurant) => (
          <Chip
            key={restaurant.id}
            label={restaurant.name}
            active={restaurant.id === restaurantId}
            onPress={() => setRestaurantId(restaurant.id)}
          />
        ))}
      </View>

      <Text style={styles.sectionLabel}>Vibe check</Text>
      <View style={styles.chipGroup}>
        {vibes.map((option) => (
          <Chip
            key={option.code}
            label={`${option.emoji} ${option.label}`}
            active={vibe === option.code}
            onPress={() => setVibe(option.code)}
          />
        ))}
      </View>

      <Text style={styles.sectionLabel}>Look title</Text>
      <TextInput
        style={styles.input}
        placeholder="Velvet blazer & silver shimmer"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.sectionLabel}>Notes</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        multiline
        numberOfLines={4}
        placeholder="How did it feel? Anything you would remix next time?"
        value={notes}
        onChangeText={setNotes}
      />

      <Text style={styles.sectionLabel}>Pieces (comma separated)</Text>
      <TextInput
        style={styles.input}
        placeholder="Sequin midi dress, Pearl hoops, Strappy heels"
        value={pieces}
        onChangeText={setPieces}
      />

      <Text style={styles.sectionLabel}>Inspo image URL</Text>
      <TextInput
        style={styles.input}
        placeholder="https://"
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing(5),
    gap: theme.spacing(4),
    backgroundColor: theme.colors.background
  },
  screenTitle: {
    ...theme.typography.title,
    color: theme.colors.text
  },
  sectionLabel: {
    ...theme.typography.label,
    color: theme.colors.muted
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(2)
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing(4),
    paddingVertical: theme.spacing(3),
    fontSize: 16,
    color: theme.colors.text,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  inputMultiline: {
    minHeight: 120,
    textAlignVertical: 'top'
  },
  primaryButton: {
    marginTop: theme.spacing(4),
    backgroundColor: theme.colors.text,
    paddingVertical: theme.spacing(4),
    borderRadius: theme.radius.xl,
    alignItems: 'center'
  },
  buttonText: {
    ...theme.typography.headline,
    fontSize: 18,
    color: theme.colors.card
  }
});
