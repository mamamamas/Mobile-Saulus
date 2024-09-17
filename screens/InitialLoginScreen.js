import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../constants/Colors'; 

const InitialLoginScreen = ({ navigation }) => {
  return (
    <View style={styles.loginContainer}>
      <View style={styles.container}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={[styles.title, {fontWeight: 'bold',}]}>Saulus</Text>
        </View>
        
        <Pressable
          style={[styles.button, {backgroundColor: Colors.white}]}
          onPress={() => navigation.navigate('StudentLogin')}
        >
          <Text style={[styles.buttonText, {color: 'black'}]}>login as Student</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('AdminLogin')}
        >
          <Text style={styles.buttonText}>login as Admin</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: Colors.cobaltblue, // Use the correct color from Colors
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    borderTopLeftRadius: 70, // Top-left corner radius
    borderTopRightRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(64, 64, 64, 0.7)',
    width: '100%',
    height: '60%'
  },
  title: {
    fontSize: 60,
    color: Colors.white,
    width: '100%',

  },
  button: {
    backgroundColor: Colors.cobaltblue, 
    padding: 10,
    marginHorizontal: 50,
    borderRadius: 20,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white, 
    fontSize: 18,
    fontWeight: 'bold',

  },
  titleContainer: {
    marginBottom: 40,
  }
});

export default InitialLoginScreen;
