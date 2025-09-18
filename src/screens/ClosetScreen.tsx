import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OutfitListItem } from '../components/OutfitListItem';
import { SectionHeader } from '../components/SectionHeader';
import { useWearThere } from '../hooks/useWearThere';
import { ThemeDefinition, useAppTheme } from '../theme';
import { ClosetStackParamList } from '../navigation/types';

type ClosetScreenProps = NativeStackScreenProps<ClosetStackParamList, 'ClosetHome'>;

export function ClosetScreen({ navigation }: ClosetScreenProps) {
  const { outfits } = useWearThere();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    },
    listContent: {
      paddingBottom: theme.spacing(10),
      gap: theme.spacing(4)
    },
    separator: {
      height: theme.spacing(4)
    }
  });
