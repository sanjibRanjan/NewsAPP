import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';
import { RootStackParamList } from '../AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const storage = new MMKV();
const NOTIFICATIONS_ENABLED_KEY = 'notifications_enabled';
const BATTERY_OPTIMIZATION_KEY = 'battery_optimization_enabled';

const NotificationSettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [batteryOptimizationEnabled, setBatteryOptimizationEnabled] = useState(true);

  // Load saved states on mount
  useEffect(() => {
    const savedNotificationsState = storage.getBoolean(NOTIFICATIONS_ENABLED_KEY);
    const savedBatteryState = storage.getBoolean(BATTERY_OPTIMIZATION_KEY);
    
    if (savedNotificationsState !== undefined) {
      setNotificationsEnabled(savedNotificationsState);
    }
    if (savedBatteryState !== undefined) {
      setBatteryOptimizationEnabled(savedBatteryState);
    }
  }, []);

  // Save states whenever they change
  useEffect(() => {
    storage.set(NOTIFICATIONS_ENABLED_KEY, notificationsEnabled);
  }, [notificationsEnabled]);

  useEffect(() => {
    storage.set(BATTERY_OPTIMIZATION_KEY, batteryOptimizationEnabled);
  }, [batteryOptimizationEnabled]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('notifications_setting')}</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Notification Toggle */}
      <View style={styles.row}>
        <Text style={styles.rowIcon}>🔔</Text>
        <Text style={styles.rowLabel}>{t('notifications_setting')}</Text>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>

      {/* Battery Optimization Toggle */}
      <View style={styles.row}>
        <Text style={styles.rowIcon}>🔋</Text>
        <Text style={styles.rowLabel}>{t('battery_optimization', 'Battery Optimization')}</Text>
        <Switch value={batteryOptimizationEnabled} onValueChange={setBatteryOptimizationEnabled} />
      </View>

      {/* Pause Notifications Row */}
      <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('PauseNotificationSettings')}>
        <Text style={styles.rowIcon}>⏸️</Text>
        <Text style={styles.rowLabel}>{t('pause_notifications_setting', 'Pause Notifications')}</Text>
        <Text style={styles.rowValue}>{'>'}</Text>
      </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
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
});

export default NotificationSettingsScreen; 