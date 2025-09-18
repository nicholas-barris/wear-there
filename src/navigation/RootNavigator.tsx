import { useMemo } from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TextStyle } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { RestaurantListScreen } from '../screens/RestaurantListScreen';
import { ClosetScreen } from '../screens/ClosetScreen';
import { LogOutfitScreen } from '../screens/LogOutfitScreen';
import { useAppTheme } from '../theme';
import { ClosetStackParamList, HomeStackParamList, RestaurantsStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const RestaurantStack = createNativeStackNavigator<RestaurantsStackParamList>();
const ClosetStack = createNativeStackNavigator<ClosetStackParamList>();

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
  const { theme } = useAppTheme();

  const navTheme = useMemo<Theme>(
    () => ({
      dark: false,
      colors: {
        primary: theme.colors.accent,
        background: theme.colors.background,
        card: theme.colors.card,
        text: theme.colors.text,
        border: theme.colors.navBorder,
        notification: theme.colors.highlight
      }
    }),
    [theme]
  );

  const tabBarStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      left: theme.spacing(4),
      right: theme.spacing(4),
      bottom: theme.spacing(2),
      paddingTop: theme.spacing(theme.name === 'retro' ? 2.5 : 1.5),
      paddingBottom: theme.spacing(theme.name === 'retro' ? 3 : 2.5),
      height: theme.name === 'retro' ? 82 : 86,
      backgroundColor: theme.colors.navBar,
      borderRadius: theme.radius.xl,
      borderWidth: theme.name === 'glass' ? 1 : 0,
      borderColor: theme.colors.navBorder,
      shadowColor: theme.shadows.pop.shadowColor,
      shadowOpacity: theme.shadows.pop.shadowOpacity,
      shadowRadius: theme.shadows.pop.shadowRadius,
      shadowOffset: theme.shadows.pop.shadowOffset,
      elevation: theme.shadows.pop.elevation
    }),
    [theme]
  );

  const labelStyle = useMemo<TextStyle>(
    () => ({
      fontSize: theme.name === 'retro' ? 12 : 11,
      fontWeight: theme.name === 'retro' ? '700' : '600',
      letterSpacing: theme.name === 'retro' ? 0.6 : 0.4,
      textTransform: theme.name === 'retro' ? 'uppercase' : 'none'
    }),
    [theme]
  );

  const iconStyle = useMemo(
    () => ({
      fontSize: theme.name === 'retro' ? 24 : 18
    }),
    [theme]
  );

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: theme.colors.background }}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.muted,
          tabBarStyle,
          tabBarLabelStyle: labelStyle,
          tabBarItemStyle: {
            paddingVertical: theme.spacing(1.5)
          }
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => <Text style={[iconStyle, { color }]}>{theme.icons.home}</Text>
          }}
        />
        <Tab.Screen
          name="RestaurantsTab"
          component={RestaurantStackNavigator}
          options={{
            tabBarLabel: 'Spots',
            tabBarIcon: ({ color }) => (
              <Text style={[iconStyle, { color }]}>{theme.icons.restaurants}</Text>
            )
          }}
        />
        <Tab.Screen
          name="ClosetTab"
          component={ClosetStackNavigator}
          options={{
            tabBarLabel: 'Closet',
            tabBarIcon: ({ color }) => <Text style={[iconStyle, { color }]}>{theme.icons.closet}</Text>
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
