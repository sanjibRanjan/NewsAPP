import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../AppNavigator';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

// Import keys from where they are defined
//import { NOTIFICATIONS_ENABLED_KEY } from '../screens/NotificationSettingsScreen';

type NotificationListProps = {
  articles: any[];
};

const NotificationList = ({ articles }: NotificationListProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation(); // Use translation hook
  const { nightMode } = useSettings();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Load saved notifications enabled state on mount
  // useEffect(() => {
  //   const loadNotificationsEnabled = async () => {
  //     try {
  //       const savedState = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
  //       if (savedState !== null) {
  //         setNotificationsEnabled(JSON.parse(savedState));
  //       }
  //     } catch (e) {
  //       console.error('Failed to load notifications enabled state:', e);
  //     }
  //   };

  //   loadNotificationsEnabled();
  // }, []); // Empty dependency array means this runs once on mount

  // Filter articles based on notification settings (only the main toggle)
  const filteredArticles = articles.filter(item => {
    // If notifications are globally disabled, hide all
    if (!notificationsEnabled) return false;

    // If notifications are enabled, show all (since pause is removed)
    return true;
  });

  const renderNotification = ({ item }: { item: any }) => {
    if (!item || !item.title) {
      console.warn('Skipping rendering of an invalid notification item: item or item.title is undefined', item);
      return null; // Skip rendering if item or item.title is undefined
    }
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title)}`;
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.itemRow, nightMode && { borderBottomColor: '#333' }]}
        onPress={() => {
          Linking.openURL(youtubeSearchUrl).catch(err => console.error('An error occurred', err));
        }}
      >
        <Text style={[styles.itemText, nightMode && { color: '#fff' }]}>{item.title}</Text>
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={styles.imagePlaceholder} />
        ) : (
          <View style={[styles.imagePlaceholder, nightMode && { backgroundColor: '#2c2c2c' }]} />
        )}
      </TouchableOpacity>
    );
  };

  // Use t function for the header title
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, nightMode && { color: '#fff' }]}>{t('notifications_setting')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllNotifications')}>
          <Text style={[styles.viewAll, nightMode && { color: '#64b5f6' }]}>{t('view_all')}</Text>
        </TouchableOpacity>
      </View>
      {filteredArticles.map(renderNotification)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  viewAll: {
    color: '#1a73e8',
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: '#222',
    marginRight: 8,
  },
  imagePlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#cce0ff',
    borderRadius: 8,
  },
});

export default NotificationList; 