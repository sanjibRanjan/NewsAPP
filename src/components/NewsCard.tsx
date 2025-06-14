import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

interface Article {
  title: string;
  text: string;
  image?: string;
  date: string;
  url: string;
}

interface NewsCardProps {
  article: Article;
  nightMode?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  nightMode = false
}) => {
  const { title, text, image, date, url } = article;

  const handlePress = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, nightMode && styles.cardDark]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={[styles.title, nightMode && styles.textDark]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={[styles.description, nightMode && styles.textDarkSecondary]} numberOfLines={3}>
          {text}
        </Text>
        <Text style={[styles.date, nightMode && styles.textDarkSecondary]}>
          {formatDate(date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardDark: {
    backgroundColor: '#1E1E1E',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  textDark: {
    color: '#fff',
  },
  textDarkSecondary: {
    color: '#aaa',
  },
});

export default NewsCard; 