import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../AppNavigator';
import { useSettings } from '../context/SettingsContext';

type InsightsCarouselProps = {
  articles: any[];
};

const InsightsCarousel = ({ articles }: InsightsCarouselProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { nightMode } = useSettings();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, nightMode && { color: '#fff' }]}>Insights</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllInsights')}>
          <Text style={[styles.viewAll, nightMode && { color: '#64b5f6' }]}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {articles.map((item, idx) => {
          if (!item || !item.title) {
            console.warn('Skipping rendering of an invalid insight item: item or item.title is undefined', item);
            return null; // Skip rendering if item or item.title is undefined
          }
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.card, nightMode && { backgroundColor: '#1e1e1e' }]}
              onPress={() => {
                const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title)}`;
                Linking.openURL(youtubeSearchUrl).catch(err => console.error('An error occurred', err));
              }}
              activeOpacity={0.8}
            >
              {item.image_url ? (
                <Image source={{ uri: item.image_url }} style={styles.cardImage} />
              ) : (
                <View style={[styles.cardImage, { backgroundColor: nightMode ? '#2c2c2c' : '#eee' }]} />
              )}
              <Text style={[styles.cardTitle, nightMode && { color: '#fff' }]}>{item.title}</Text>
              <Text style={[styles.cardDesc, nightMode && { color: '#aaa' }]} numberOfLines={3} ellipsizeMode="tail">{item.description || item.content}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
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
  card: {
    width: 180,
    height: 220,
    borderRadius: 12,
    marginLeft: 16,
    marginRight: 4,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#444',
  },
});

export default InsightsCarousel; 