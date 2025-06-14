/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import AppNavigator from './src/AppNavigator';
import { LanguageProvider } from './src/contexts/LanguageContext';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // useEffect(() => {
  //   const clearAsyncStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log('AsyncStorage cleared successfully.');
  //     } catch (e) {
  //       console.error('Failed to clear AsyncStorage:', e);
  //     }
  //   };
  //   clearAsyncStorage();
  // }, []); // Empty dependency array means this runs once on mount

  return (
    <LanguageProvider>
      <AppNavigator />
    </LanguageProvider>
  );
};

export default App;
