import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import Colors from '../../constants/Colors';

// Data structure for telemedicine options
const telemedicineOptions = [
  {
    title: 'Doctor Consultation',
    description: 'Connect with a healthcare professional for telemedicine services. Join the video call for convenient, remote consultation.',
    link: 'https://meet.google.com/doctor-link',
  },
  {
    title: 'Medical Consultation',
    description: 'Get medical advice from a healthcare professional through a video call.',
    link: 'https://meet.google.com/medical-link',
  },
  {
    title: 'Nursing Consultation',
    description: 'Consult with a nurse remotely via a video call for healthcare services.',
    link: 'https://meet.google.com/nursing-link',
  },
  {
    title: 'Mark Consultation',
    description: 'Consult with a nurse remotely via a video call for healthcare services.',
    link: 'https://meet.google.com/nursing-link',
  },
];

const TelemedScreen = () => {
  // Function to handle button press (opens Google Meet link)
  const handleJoinCall = (link) => {
    Linking.openURL(link);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerText}>
        To join various Telemedicine Consultations:
      </Text>

      {telemedicineOptions.map((option, index) => (
        <View key={index} style={[styles.textContainer, {backgroundColor: Colors.white}]}>
          <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 10, fontSize: 20, color: Colors.cobaltblue }]}>
            {option.title}
          </Text>
          <Text style={[styles.text, { color: 'black', marginBottom: 15 }]}>
            {option.description}
          </Text>

          {/* Button to join the call */}
          <Pressable 
            style={({ pressed }) => [
              styles.buttonContainer, 
              { backgroundColor: pressed ? Colors.darkblue : Colors.cobaltblue }
            ]}
            onPress={() => handleJoinCall(option.link)}
          >
            <Text style={styles.buttonText}>
              Join Call
            </Text>
          </Pressable>
        </View>
      ))}
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
    // elevation: 2, // Optional: Add shadow for Android
    // shadowColor: '#000', // Optional: Add shadow for iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
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
  }
});

export default TelemedScreen;
