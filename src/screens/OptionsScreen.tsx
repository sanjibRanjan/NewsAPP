import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
// You need to replace 'YOUR_WEB_CLIENT_ID' with your actual Web client ID from Firebase Project Settings -> General -> Your apps -> Web apps
GoogleSignin.configure({
  webClientId: '14291221038-l46qiscv3qte5qhlisvt5ovloguf0c6l.apps.googleusercontent.com', // client ID of type WEB for your server (needed for verifying user ID and access tokens)
});

const OptionsScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { hdImages, nightMode, autoplay, textSize, setSetting, saveSettings } = useSettings();
  const [isTextSizeModalVisible, setIsTextSizeModalVisible] = useState(false);

  // Function to handle Google Sign-In
  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();
      const { user: { idToken } } = userInfo;

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      // Handle errors here, such as displaying a message to the user.
    }
  }

  const getTextStyle = (baseSize: number) => {
    let size = baseSize;
    if (textSize === 'small') {
      size = baseSize * 0.9;
    } else if (textSize === 'large') {
      size = baseSize * 1.1;
    }
    return { fontSize: size };
  };

  const handleTextSizeChange = (size: 'small' | 'medium' | 'large') => {
    setSetting('textSize', size);
    hideTextSizeModal();
  };

  const showTextSizeModal = () => setIsTextSizeModalVisible(true);
  const hideTextSizeModal = () => setIsTextSizeModalVisible(false);

  const textSizeOptions = ['small', 'medium', 'large'];

  const handleSaveSettings = () => {
    saveSettings();
    navigation.navigate('MainTabs', { screen: 'Discover' });
  };

  return (
    <View style={[styles.container, nightMode && styles.containerDark]}>
      <View style={[styles.headerRow, nightMode && styles.headerRowDark]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[styles.backArrow, nightMode && styles.textDark, getTextStyle(22)]}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, nightMode && styles.textDark, getTextStyle(18)]}>{t('options_title')}</Text>
        <TouchableOpacity onPress={handleSaveSettings} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.blueCard}>
          <Text style={[styles.blueCardTitle, getTextStyle(17)]}>{t('save_preferences_title')}</Text>
          <Text style={[styles.blueCardDesc, getTextStyle(13)]}>{t('save_preferences_desc')}</Text>
          <TouchableOpacity style={styles.signInBtn} onPress={onGoogleButtonPress}>
            <Text style={[styles.signInBtnText, getTextStyle(15)]}>{t('sign_in_button')}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.section, nightMode && styles.sectionDark]}>
          <Text style={[styles.sectionLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('battery_optimization')}</Text>
          <Text style={[styles.sectionDesc, nightMode && styles.textDarkSecondary, getTextStyle(12)]}>{t('battery_optimization_desc')}</Text>
        </View>
        <TouchableOpacity style={[styles.row, nightMode && styles.rowDark]} onPress={() => navigation.navigate('LanguageSettings')}>
          <Text style={styles.rowIcon}>Aa</Text>
          <Text style={[styles.rowLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('language_setting')}</Text>
          <Text style={[styles.rowValue, nightMode && styles.textDark, getTextStyle(15)]}>{t('en')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, nightMode && styles.rowDark]} onPress={() => navigation.navigate('NotificationSettings')}>
          <Text style={styles.rowIcon}>🔔</Text>
          <Text style={[styles.rowLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('notifications_setting')}</Text>
          <Text style={[styles.rowValue, nightMode && styles.textDark, getTextStyle(15)]}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, nightMode && styles.rowDark]} onPress={() => navigation.navigate('ChangeRelevancy')}>
          <Text style={styles.rowIcon}>❓</Text>
          <Text style={[styles.rowLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('change_relevancy')}</Text>
        </TouchableOpacity>
        <View style={[styles.row, nightMode && styles.rowDark]}>
          <Text style={styles.rowIcon}>△</Text>
          <Text style={[styles.rowLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('hd_images')}</Text>
          <Switch
            value={hdImages}
            onValueChange={(value) => setSetting('hdImages', value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={hdImages ? '#1976D2' : '#f4f3f4'}
          />
        </View>
        <View style={[styles.row, nightMode && styles.rowDark]}>
          <Text style={styles.rowIcon}>🌙</Text>
          <Text style={[styles.rowLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('night_mode')}</Text>
          <Switch
            value={nightMode}
            onValueChange={(value) => setSetting('nightMode', value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={nightMode ? '#1976D2' : '#f4f3f4'}
          />
        </View>
        <View style={[styles.row, nightMode && styles.rowDark]}>
          <Text style={styles.rowIcon}>▶️</Text>
          <Text style={[styles.rowLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('autoplay_setting')}</Text>
          <Switch
            value={autoplay}
            onValueChange={(value) => setSetting('autoplay', value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={autoplay ? '#1976D2' : '#f4f3f4'}
          />
        </View>
        <TouchableOpacity style={[styles.row, nightMode && styles.rowDark]} onPress={showTextSizeModal}>
          <Text style={styles.rowIcon}>Aᴀ</Text>
          <Text style={[styles.rowLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('text_size_setting')}</Text>
          <Text style={[styles.rowValue, nightMode && styles.textDark]}>{textSize.charAt(0).toUpperCase() + textSize.slice(1)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.section, nightMode && styles.sectionDark]}>
          <Text style={[styles.sectionLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('share_app')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.section, nightMode && styles.sectionDark]}>
          <Text style={[styles.sectionLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('rate_app')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.section, nightMode && styles.sectionDark]}>
          <Text style={[styles.sectionLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('feedback_setting')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.section, nightMode && styles.sectionDark]}>
          <Text style={[styles.sectionLabel, nightMode && styles.textDark, getTextStyle(15)]}>{t('terms_conditions')}</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isTextSizeModalVisible}
        onRequestClose={hideTextSizeModal}
      >
        <Pressable style={styles.centeredView} onPress={hideTextSizeModal}>
          <View style={[styles.modalView, nightMode && styles.modalViewDark]}>
            <Text style={[styles.modalTitle, nightMode && styles.textDark]}>{t('select_text_size') || 'Select Text Size'}</Text>
            {textSizeOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => handleTextSizeChange(option as 'small' | 'medium' | 'large')}
              >
                <Text style={[styles.modalOptionText, nightMode && styles.textDark, getTextStyle(15)]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  headerRowDark: {
    borderBottomColor: '#333',
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
  textDark: {
    color: '#fff',
  },
  textDarkSecondary: {
    color: '#aaa',
  },
  blueCard: {
    backgroundColor: '#2196F3',
    borderRadius: 0,
    padding: 18,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  blueCardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 4,
  },
  blueCardDesc: {
    color: '#e3f2fd',
    fontSize: 13,
    marginBottom: 12,
  },
  signInBtn: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 12,
  },
  signInBtnText: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 15,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  sectionDark: {
    borderBottomColor: '#333',
  },
  sectionLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  sectionDesc: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  rowDark: {
    borderBottomColor: '#333',
  },
  rowIcon: {
    fontSize: 18,
    marginRight: 16,
    width: 28,
    textAlign: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  rowValue: {
    fontSize: 15,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
    modalViewDark: {
    backgroundColor: '#222',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#222',
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#1976D2',
  },
  saveBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#1976D2',
    borderRadius: 4,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default OptionsScreen; 