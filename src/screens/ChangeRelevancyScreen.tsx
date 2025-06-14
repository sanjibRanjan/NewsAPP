import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  'Politics', 'Education', 'Miscellaneous', 'Business', 'Sports', 'Entertainment', 'Technology', 'Automobile', 'Hatke', 'International', 'Startups', 'Science', 'National', 'Travel'
];

const options = [
  { key: 'all', color: '#4CAF50', label: 'All News' },
  { key: 'major', color: '#FFEB3B', label: 'Major News' },
  { key: 'none', color: '#F44336', label: 'No News' },
];

const initialState = Object.fromEntries(categories.map(cat => [cat, 'all']));

const ChangeRelevancyScreen = () => {
  const navigation = useNavigation();
  const [relevancy, setRelevancy] = useState<{ [key: string]: string }>(initialState);

  const handleSelect = (category: string, option: string) => {
    setRelevancy(prev => ({ ...prev, [category]: option }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Relevancy</Text>
        <View style={{ width: 32 }} />
      </View>
      {/* Legend */}
      <View style={styles.legendRow}>
        {options.map(opt => (
          <View key={opt.key} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: opt.color }]} />
            <Text style={styles.legendLabel}>{opt.label}</Text>
          </View>
        ))}
      </View>
      {/* Category List */}
      <ScrollView>
        {categories.map(cat => (
          <View key={cat} style={styles.catRow}>
            <Text style={styles.catLabel}>{cat}</Text>
            {options.map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={styles.circleBtn}
                onPress={() => handleSelect(cat, opt.key)}
              >
                <View style={[styles.circleOuter, { borderColor: opt.color }]}> 
                  <View style={[styles.circleInner, {
                    backgroundColor: relevancy[cat] === opt.key ? opt.color : 'transparent',
                  }]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  backBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#222',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 13,
    color: '#222',
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  catLabel: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  circleBtn: {
    marginHorizontal: 8,
  },
  circleOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default ChangeRelevancyScreen; 