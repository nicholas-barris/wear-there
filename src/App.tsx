import 'react-native-gesture-handler';
import { useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { RootNavigator } from './navigation/RootNavigator';
import { WearThereProvider } from './context/WearThereContext';
import { ThemeDefinition, ThemeProvider, useAppTheme } from './theme';

function AppContainer() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={styles.backgroundDecorOne} />
      <View pointerEvents="none" style={styles.backgroundDecorTwo} />
      <WearThereProvider>
        <View style={styles.contentWrapper}>
          <RootNavigator />
        </View>
        <StatusBar style={theme.statusBarStyle} />
      </WearThereProvider>
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContainer />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const createStyles = (theme: ThemeDefinition) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    contentWrapper: {
      flex: 1
    },
    backgroundDecorOne: {
      position: 'absolute',
      width: theme.spacing(theme.name === 'retro' ? 60 : 70),
      height: theme.spacing(theme.name === 'retro' ? 60 : 70),
      backgroundColor: theme.colors.heroDecor1,
      borderRadius: theme.radius.xl * 3,
      opacity: theme.name === 'retro' ? 0.35 : 0.18,
      top: theme.spacing(theme.name === 'retro' ? -12 : -18),
      right: theme.spacing(theme.name === 'retro' ? -8 : -16),
      transform: [
        {
          rotate: theme.name === 'retro' ? '18deg' : '42deg'
        }
      ]
    },
    backgroundDecorTwo: {
      position: 'absolute',
      width: theme.spacing(theme.name === 'retro' ? 50 : 54),
      height: theme.spacing(theme.name === 'retro' ? 50 : 54),
      backgroundColor: theme.colors.heroDecor3,
      borderRadius: theme.radius.xl * 3,
      opacity: theme.name === 'retro' ? 0.28 : 0.16,
      bottom: theme.spacing(theme.name === 'retro' ? -10 : -14),
      left: theme.spacing(theme.name === 'retro' ? -12 : -16),
      transform: [
        {
          rotate: theme.name === 'retro' ? '-26deg' : '-38deg'
        }
      ]
    }
  });
