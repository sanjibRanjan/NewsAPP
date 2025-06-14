import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const SETTINGS_KEYS = {
  HD_IMAGES: 'hd_images_enabled',
  NIGHT_MODE: 'night_mode_enabled',
  AUTOPLAY: 'autoplay_enabled',
  TEXT_SIZE: 'text_size_preference',
};

interface Settings {
  hdImages: boolean;
  nightMode: boolean;
  autoplay: boolean;
  textSize: 'small' | 'medium' | 'large';
}

interface SettingsContextType extends Settings {
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  saveSettings: () => void;
  // Optional: You might add a loading state if loading from storage is asynchronous or takes time
  // isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state by loading from MMKV, providing default values
  const [settings, setSettings] = useState<Settings>({
    hdImages: storage.getBoolean(SETTINGS_KEYS.HD_IMAGES) ?? true,
    nightMode: storage.getBoolean(SETTINGS_KEYS.NIGHT_MODE) ?? false,
    autoplay: storage.getBoolean(SETTINGS_KEYS.AUTOPLAY) ?? true,
    textSize: (storage.getString(SETTINGS_KEYS.TEXT_SIZE) as 'small' | 'medium' | 'large') ?? 'medium',
  });

  // Although MMKV is synchronous, useEffect can be used for initial load if preferred or for other side effects
  // useEffect(() => {
  //   // Settings are already loaded during state initialization
  // }, []);

  const setSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const saveSettings = () => {
    // Save current settings state to MMKV
    storage.set(SETTINGS_KEYS.HD_IMAGES, settings.hdImages);
    storage.set(SETTINGS_KEYS.NIGHT_MODE, settings.nightMode);
    storage.set(SETTINGS_KEYS.AUTOPLAY, settings.autoplay);
    storage.set(SETTINGS_KEYS.TEXT_SIZE, settings.textSize);
    console.log('Settings saved to MMKV', settings);
  };

  return (
    <SettingsContext.Provider value={{ ...settings, setSetting, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 