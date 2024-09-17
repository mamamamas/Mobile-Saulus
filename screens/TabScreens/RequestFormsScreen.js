import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput, Button } from 'react-native';
import Colors from '../../constants/Colors';

const telemedicineOptions = [
  {
    title: 'Student Absence Form',
    description: 'Connect with a healthcare professional for telemedicine services. Join the video call for convenient, remote consultation.',
  },
  {
    title: 'Telemed Request',
    description: 'Get medical advice from a healthcare professional through a video call.',
  },
  {
    title: 'Special Leave Request Form',
    description: 'Consult with a nurse remotely via a video call for healthcare services.',
  },
  {
    title: 'Mark Consultation',
    description: 'Consult with a nurse remotely via a video call for healthcare services.',
  },
];

const RequestFormsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form Submitted:', comment);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const openModal = (form) => {
    setSelectedForm(form);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerText}>
        To join various Request Forms:
      </Text>

      {telemedicineOptions.map((option, index) => (
        <View key={index} style={[styles.textContainer, {backgroundColor: Colors.white}]}>
          <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 10, fontSize: 20, color: Colors.cobaltblue }]}>
            {option.title}
          </Text>
          <Text style={[styles.text, { color: 'black', marginBottom: 15 }]}>
            {option.description}
          </Text>

          {/* Button to open modal */}
          <Pressable 
            style={({ pressed }) => [
              styles.buttonContainer, 
              { backgroundColor: pressed ? Colors.darkblue : Colors.cobaltblue }
            ]}
            onPress={() => openModal(option)}
          >
            <Text style={styles.buttonText}>
              Submit Form
            </Text>
          </Pressable>
        </View>
      ))}

      {/* Modal for form submission */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedForm && (
              <>
                <Text style={styles.modalTitle}>
                  {selectedForm.title}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedForm.description}
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Add additional comments (optional)"
                  value={comment}
                  onChangeText={setComment}
                />
                <View style={styles.buttonRow}>
                  <Pressable style={styles.modalButton} onPress={handleSubmit}>
                    <Text style={styles.modalButtonText}>Submit</Text>
                  </Pressable>
                  <Pressable style={styles.modalButton} onPress={handleCancel}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.lgray,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 15,
    color: Colors.cobaltblue,
    marginBottom: 20,
  },
  textContainer: {
    width: '95%',
    backgroundColor: Colors.white,
    padding: 20,
    paddingBottom: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: Colors.cobaltblue,
    textAlign: 'justify',
  },
  buttonContainer: {
    backgroundColor: Colors.cobaltblue,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.cobaltblue,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: Colors.cobaltblue,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: Colors.cobaltblue,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default RequestFormsScreen;
