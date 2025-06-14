import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../AppNavigator';
import { useSettings } from '../context/SettingsContext';

const categories = [
  { icon: '📄', label: 'My Feed' },
  { icon: '📰', label: 'All News' },
  { icon: '⭐', label: 'Top Stories' },
  { icon: '🔥', label: 'Trending' },
];

const CategoryMenu = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { nightMode, textSize } = useSettings();

  const getTextStyle = (baseSize: number) => {
    let size = baseSize;
    if (textSize === 'small') {
      size = baseSize * 0.9;
    } else if (textSize === 'large') {
      size = baseSize * 1.1;
    }
    return { fontSize: size };
  };

  return (
    <View style={[styles.container, nightMode && styles.containerDark]}>
      {categories.map((cat, idx) => {
        let targetScreen: keyof RootStackParamList | undefined;
        if (cat.label === 'My Feed') targetScreen = 'MyFeed';
        if (cat.label === 'All News') targetScreen = 'News';
        if (cat.label === 'Top Stories') targetScreen = 'TopStories';
        if (cat.label === 'Trending') targetScreen = 'Trending';

        return (
          <TouchableOpacity 
            key={idx} 
            style={[styles.item, nightMode && styles.itemDark]}
            onPress={() => {
              if (targetScreen) {
                switch (targetScreen) {
                  case 'MyFeed':
                    navigation.navigate('MyFeed');
                    break;
                  case 'News':
                    navigation.navigate('News');
                    break;
                  case 'TopStories':
                    navigation.navigate('TopStories');
                    break;
                  case 'Trending':
                    navigation.navigate('Trending');
                    break;
                }
              }
            }}
            disabled={!targetScreen}
          >
            <Text style={[styles.icon, getTextStyle(24)]}>{cat.icon}</Text>
            <Text style={[styles.label, nightMode && styles.textDark, getTextStyle(15)]}>{cat.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
    borderBottomColor: '#333',
  },
  item: {
    alignItems: 'center',
  },
  itemDark: {
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
  },
  textDark: {
    color: '#fff',
  },
});

export default CategoryMenu; 