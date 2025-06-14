import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { useSettings } from '../context/SettingsContext';
import { fetchCryptoNews } from '../services/cryptoNewsApi';
import NewsCard from '../components/NewsCard';

const { width } = Dimensions.get('window');

type TopStoriesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TopStories'>;

const TopStoriesScreen = () => {
  const navigation = useNavigation<TopStoriesScreenNavigationProp>();
  const { nightMode } = useSettings();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchCryptoNews('BITCOIN,ETHEREUM,TOP_NEWS'); // Example categories for top stories
        setNews(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  if (loading) {
    return (
      <View style={[styles.centered, nightMode && styles.containerDark]}>
        <ActivityIndicator size="large" color={nightMode ? "#fff" : "#0000ff"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, nightMode && styles.containerDark]}>
        <Text style={nightMode && styles.textDark}>Error fetching news: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => {
    if (!item || !item.title) {
      console.warn('Skipping rendering of an invalid news item: item or item.title is undefined', item);
      return null; 
    }
    return <NewsCard article={item} nightMode={nightMode} />;
  };

  return (
    <View style={[styles.container, nightMode && styles.containerDark]}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.news_id || index.toString()} // Crypto News API uses 'news_id'
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ChangeRelevancy')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
  textDark: {
    color: '#ccc',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  fabIcon: {
    fontSize: 28,
    color: '#fff',
  }
});

export default TopStoriesScreen;