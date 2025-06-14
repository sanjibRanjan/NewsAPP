import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllInsightsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Insights</Text>
      <View style={styles.centered}>
        <Text style={styles.placeholderText}>All Insights Screen</Text>
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

export default AllInsightsScreen; 