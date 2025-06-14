import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PauseNotificationSettings = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const pauseOptions = ['1 hour', '2 hours', '4 hours', '1 day'];

  const handleSelectDuration = (duration: string) => {
    setSelectedDuration(duration);
    setIsModalVisible(false);
    setShowSaveButton(true);
    console.log(`Notifications selected to be paused for: ${duration}`);
  };

  const handleSave = () => {
    console.log(`Saving pause duration: ${selectedDuration}`);
    navigation.navigate('Options');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pause Notifications</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Pause Duration:</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.durationButton}>
          <Text style={styles.durationText}>{selectedDuration || 'Select Duration'}</Text>
        </TouchableOpacity>

        {showSaveButton && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Duration Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable style={styles.centeredView} onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalView} onPress={() => {}}>
            <Text style={styles.modalTitle}>Select Pause Duration</Text>
            {pauseOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => handleSelectDuration(option)}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
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
  contentContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
  },
  durationButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  durationText: {
    fontSize: 16,
    color: '#222',
  },
  saveButton: {
    backgroundColor: '#1976D2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#1976D2',
  },
});

export default PauseNotificationSettings; 