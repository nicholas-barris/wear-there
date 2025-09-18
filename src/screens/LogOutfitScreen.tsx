import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Chip } from '../components/Chip';
import { useWearThere } from '../hooks/useWearThere';
import { ThemeDefinition, useAppTheme } from '../theme';
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
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const placeholderColor = theme.colors.muted;

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
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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
        placeholderTextColor={placeholderColor}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.sectionLabel}>Notes</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        multiline
        numberOfLines={4}
        placeholder="How did it feel? Anything you would remix next time?"
        placeholderTextColor={placeholderColor}
        value={notes}
        onChangeText={setNotes}
      />

      <Text style={styles.sectionLabel}>Pieces (comma separated)</Text>
      <TextInput
        style={styles.input}
        placeholder="Sequin midi dress, Pearl hoops, Strappy heels"
        placeholderTextColor={placeholderColor}
        value={pieces}
        onChangeText={setPieces}
      />

      <Text style={styles.sectionLabel}>Inspo image URL</Text>
      <TextInput
        style={styles.input}
        placeholder="https://"
        placeholderTextColor={placeholderColor}
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const createStyles = (theme: ThemeDefinition) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing(5),
      gap: theme.spacing(4),
      backgroundColor: theme.colors.background,
      paddingBottom: theme.spacing(10)
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
      backgroundColor: theme.colors.inputBackground,
      borderRadius: theme.radius.lg,
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(3),
      fontSize: 16,
      color: theme.colors.text,
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.inputBorder,
      shadowColor: theme.shadows.input.shadowColor,
      shadowOpacity: theme.shadows.input.shadowOpacity,
      shadowRadius: theme.shadows.input.shadowRadius,
      shadowOffset: theme.shadows.input.shadowOffset,
      elevation: theme.shadows.input.elevation
    },
    inputMultiline: {
      minHeight: 120,
      textAlignVertical: 'top'
    },
    primaryButton: {
      marginTop: theme.spacing(4),
      backgroundColor: theme.colors.accent,
      paddingVertical: theme.spacing(4),
      borderRadius: theme.radius.xl,
      alignItems: 'center',
      shadowColor: theme.shadows.pop.shadowColor,
      shadowOpacity: theme.shadows.pop.shadowOpacity,
      shadowRadius: theme.shadows.pop.shadowRadius,
      shadowOffset: theme.shadows.pop.shadowOffset,
      elevation: theme.shadows.pop.elevation
    },
    buttonText: {
      ...theme.typography.headline,
      fontSize: 18,
      color: theme.colors.buttonTextOnAccent
    }
  });
