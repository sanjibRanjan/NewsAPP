import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../AppNavigator';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

const SearchBar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { nightMode } = useSettings();

  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResults', { query: searchQuery.trim() });
    }
  };

  return (
    <View style={[styles.container, nightMode && styles.containerDark]}>
      <View style={[styles.inputContainer, nightMode && styles.inputContainerDark]}>
        <Text style={[styles.searchIcon, nightMode && styles.textDark]}>🔍</Text>
        <TextInput
          style={[styles.input, nightMode && styles.textDark]}
          placeholder={t('search_placeholder')}
          placeholderTextColor={nightMode ? '#aaa' : '#888'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>
      <TouchableOpacity style={styles.goButton} onPress={handleSearch}>
        <Text style={styles.goButtonText}>Go</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  containerDark: {
    // No specific dark background needed here if parent provides it
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 24,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  inputContainerDark: {
    backgroundColor: '#2e2e2e',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#888',
  },
  textDark: {
    color: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    paddingVertical: 8,
  },
  goButton: {
    backgroundColor: '#1976D2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchBar; 