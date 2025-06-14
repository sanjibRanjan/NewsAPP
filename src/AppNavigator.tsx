import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverScreen from './screens/DiscoverScreen';
import NewsScreen from './screens/NewsScreen';
import TopStoriesScreen from './screens/TopStoriesScreen';
import ChangeRelevancyScreen from './screens/ChangeRelevancyScreen';
import TrendingScreen from './screens/TrendingScreen';
import MyFeedScreen from './screens/MyFeedScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import AllNotificationsScreen from './screens/AllNotificationsScreen';
import AllInsightsScreen from './screens/AllInsightsScreen';
import OptionsScreen from './screens/OptionsScreen';
import LanguageSettingsScreen from './screens/LanguageSettingsScreen';
import NotificationSettingsScreen from './screens/NotificationSettingsScreen';
import PauseNotificationSettings from './screens/PauseNotificationSettings';
import { Text, View } from 'react-native';
import { SettingsProvider } from './context/SettingsContext';

export type RootStackParamList = {
  MainTabs: undefined;
  News: { article?: any } | undefined;
  TopStories: undefined;
  ChangeRelevancy: undefined;
  Trending: undefined;
  MyFeed: undefined;
  SearchResults: { query: string };
  AllNotifications: undefined;
  AllInsights: undefined;
  Options: undefined;
  LanguageSettings: undefined;
  NotificationSettings: undefined;
  PauseNotificationSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          height: 64,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarActiveTintColor: '#1976D2',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
        tabBarIcon: ({ focused }) => {
          let icon = '';
          if (route.name === 'Discover') icon = '🔍';
          if (route.name === 'MyFeed') icon = '📄';
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 24, color: focused ? '#1976D2' : '#888' }}>{icon}</Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#1976D2' : '#888', fontWeight: focused ? 'bold' : 'normal', textDecorationLine: focused ? 'underline' : 'none' }}>Discover</Text>
          ),
        }}
      />
      <Tab.Screen
        name="MyFeed"
        component={MyFeedScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#1976D2' : '#888', fontWeight: focused ? 'bold' : 'normal', textDecorationLine: focused ? 'underline' : 'none' }}>My Feed</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="News" component={NewsScreen} />
          <Stack.Screen name="TopStories" component={TopStoriesScreen} />
          <Stack.Screen name="ChangeRelevancy" component={ChangeRelevancyScreen} />
          <Stack.Screen name="Trending" component={TrendingScreen} />
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          <Stack.Screen name="AllNotifications" component={AllNotificationsScreen} />
          <Stack.Screen name="AllInsights" component={AllInsightsScreen} />
          <Stack.Screen name="Options" component={OptionsScreen} />
          <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
          <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
          <Stack.Screen name="PauseNotificationSettings" component={PauseNotificationSettings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
};

export default AppNavigator; 