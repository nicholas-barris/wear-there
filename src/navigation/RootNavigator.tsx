import { NavigationContainer, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { RestaurantListScreen } from '../screens/RestaurantListScreen';
import { ClosetScreen } from '../screens/ClosetScreen';
import { LogOutfitScreen } from '../screens/LogOutfitScreen';
import { theme } from '../theme';
import { ClosetStackParamList, HomeStackParamList, RestaurantsStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const RestaurantStack = createNativeStackNavigator<RestaurantsStackParamList>();
const ClosetStack = createNativeStackNavigator<ClosetStackParamList>();

const navTheme: Theme = {
  dark: false,
  colors: {
    primary: theme.colors.accent,
    background: theme.colors.background,
    card: theme.colors.card,
    text: theme.colors.text,
    border: 'rgba(16,19,26,0.1)',
    notification: theme.colors.highlight
  }
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function RestaurantStackNavigator() {
  return (
    <RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
      <RestaurantStack.Screen name="RestaurantList" component={RestaurantListScreen} />
    </RestaurantStack.Navigator>
  );
}

function ClosetStackNavigator() {
  return (
    <ClosetStack.Navigator>
      <ClosetStack.Screen
        name="ClosetHome"
        component={ClosetScreen}
        options={{ headerShown: false }}
      />
      <ClosetStack.Screen
        name="LogOutfit"
        component={LogOutfitScreen}
        options={{
          headerTitle: 'New outfit log',
          headerBackTitle: 'Back'
        }}
      />
    </ClosetStack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.muted,
          tabBarStyle: {
            paddingTop: 8,
            paddingBottom: 12,
            height: 70,
            backgroundColor: theme.colors.card,
            borderTopLeftRadius: theme.radius.xl,
            borderTopRightRadius: theme.radius.xl,
            position: 'absolute'
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600'
          }
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{ tabBarLabel: 'Home', tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text> }}
        />
        <Tab.Screen
          name="RestaurantsTab"
          component={RestaurantStackNavigator}
          options={{ tabBarLabel: 'Spots', tabBarIcon: () => <Text style={{ fontSize: 20 }}>🍽️</Text> }}
        />
        <Tab.Screen
          name="ClosetTab"
          component={ClosetStackNavigator}
          options={{ tabBarLabel: 'Closet', tabBarIcon: () => <Text style={{ fontSize: 20 }}>🧥</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
