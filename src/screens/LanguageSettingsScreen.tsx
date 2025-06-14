import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
];

const LanguageSettingsScreen = () => {
  const navigation = useNavigation();
  const { language, setLanguage } = useLanguage();

  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode);
    // You might want to navigate back or perform other actions here
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language Settings</Text>
        <View style={{ width: 32 }} />
      </View>
      <ScrollView style={styles.languageList}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[styles.languageItem, language === lang.code && styles.selectedLanguageItem]}
            onPress={() => handleLanguageSelect(lang.code)}
          >
            <Text style={[styles.languageName, language === lang.code && styles.selectedLanguageName]}>{lang.name}</Text>
            <Text style={[styles.languageCode, language === lang.code && styles.selectedLanguageCode]}>{lang.code.toUpperCase()}</Text>
            {language === lang.code && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

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
  languageList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  selectedLanguageItem: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  languageName: {
    fontSize: 16,
    color: '#222',
  },
  selectedLanguageName: {
    fontWeight: 'bold',
    color: '#1976D2',
  },
  languageCode: {
    fontSize: 14,
    color: '#888',
  },
  selectedLanguageCode: {
    fontWeight: 'bold',
    color: '#1976D2',
  },
  checkmark: {
    fontSize: 18,
    color: '#1976D2',
    marginLeft: 8,
  },
});

export default LanguageSettingsScreen; 