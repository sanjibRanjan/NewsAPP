import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SearchResultsScreen = () => {
  const route = useRoute();
  // @ts-ignore
  const query = route.params?.query || '';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Results for "{query}"</Text>
      <View style={styles.centered}>
        <Text style={styles.placeholderText}>Search Results Screen</Text>
      </View>
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
    fontSize: 20,
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

export default SearchResultsScreen; 