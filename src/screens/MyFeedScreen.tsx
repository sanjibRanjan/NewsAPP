import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchCryptoNews } from '../services/cryptoNewsApi';
import NewsCard from '../components/NewsCard';

const MyFeedScreen = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchCryptoNews('FAVORITE_COINS,PORTFOLIO_NEWS'); // Example categories for personalized feed
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
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error fetching news: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => {
    if (!item || !item.title) {
      console.warn('Skipping rendering of an invalid news item: item or item.title is undefined', item);
      return null; 
    }
    return <NewsCard article={item} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Crypto Feed</Text>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.news_id || index.toString()}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 16,
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
});

export default MyFeedScreen; 