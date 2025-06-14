import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../AppNavigator';
import { useSettings } from '../context/SettingsContext';

const TopBar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { nightMode } = useSettings();

  return (
    <View style={[styles.container, nightMode && styles.containerDark]}>
      <View style={styles.leftIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Options')}>
          <Text style={[styles.icon, nightMode && styles.iconDark]}>⚙️</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer} pointerEvents="none">
        <Image 
          source={require('../assets/logo.png')} 
          style={[styles.logo, nightMode && styles.logoDark]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  containerDark: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  leftIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    color: '#222',
  },
  iconDark: {
    color: '#fff',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 30,
  },
  logoDark: {
    // Styles for dark mode logo if you have one, or adjust tint
  },
});

export default TopBar; 