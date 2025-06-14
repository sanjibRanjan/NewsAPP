import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import CategoryMenu from '../components/CategoryMenu';
import NewsCard from '../components/NewsCard';
import { useSettings } from '../context/SettingsContext';
import { fetchCryptoNews } from '../services/cryptoNewsApi';

const DiscoverScreen = () => {
  const { nightMode } = useSettings();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchCryptoNews('CRYPTO,MARKETS,TECHNOLOGY,DEFI,NFT'); // Example categories for discover screen
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
      <TopBar />
      <SearchBar />
      <CategoryMenu />
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.news_id || index.toString()} // Crypto News API uses 'news_id'
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
  textDark: {
    color: '#ccc',
  },
});

export default DiscoverScreen; 