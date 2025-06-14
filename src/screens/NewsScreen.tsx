import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { fetchCryptoNews } from '../services/cryptoNewsApi';
import NewsCard from '../components/NewsCard';

const { width, height } = Dimensions.get('window');

const NewsScreen = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchCryptoNews('BTC,ETH,XRP,LTC,BCH,ADA,DOT,LINK,BNB,XLM,UNI,DOGE,SOL,VET,TRX,EOS,XMR,ETC,NEO,DASH,ZEC,XTZ,ATOM,ONT,IOTA,THETA,DOGE,SHIB'); // Fetching a broad range of crypto news
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#444',
  },
});

export default NewsScreen; 