import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OutfitListItem } from '../components/OutfitListItem';
import { SectionHeader } from '../components/SectionHeader';
import { useWearThere } from '../hooks/useWearThere';
import { theme } from '../theme';
import { ClosetStackParamList } from '../navigation/types';

type ClosetScreenProps = NativeStackScreenProps<ClosetStackParamList, 'ClosetHome'>;

export function ClosetScreen({ navigation }: ClosetScreenProps) {
  const { outfits } = useWearThere();

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Your saved fits"
        action={<Text style={styles.caption}>{outfits.length} entries</Text>}
      />
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('LogOutfit')}>
        <Text style={styles.buttonText}>＋ Log what you wore</Text>
      </TouchableOpacity>
      <FlatList
        data={outfits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OutfitListItem outfit={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing(4) }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing(5),
    paddingTop: theme.spacing(5)
  },
  caption: {
    ...theme.typography.body,
    color: theme.colors.muted
  },
  primaryButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing(4),
    borderRadius: theme.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(5),
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8
  },
  buttonText: {
    ...theme.typography.headline,
    fontSize: 18,
    color: theme.colors.text
  },
  listContent: {
    paddingBottom: theme.spacing(10),
    gap: theme.spacing(4)
  }
});
