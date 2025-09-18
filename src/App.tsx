import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './navigation/RootNavigator';
import { WearThereProvider } from './context/WearThereContext';
import { theme } from './theme';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaProvider>
        <WearThereProvider>
          <RootNavigator />
          <StatusBar style="dark" />
        </WearThereProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
