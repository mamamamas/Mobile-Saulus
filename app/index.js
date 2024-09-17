import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, TextInput, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Realm from 'realm';
import Colors from '../constants/Colors';
import { AppProvider, RealmProvider, useApp } from '@realm/react';
import retrieveUserData from './retrieveUserData ';
const AdminLoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const app = useApp();

    const validationForm = () => {
        let errors = {};
        const emailRegex = /\S+@pcu.edu.ph$/;

        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";
        if (!emailRegex.test(email))
            errors.email = "Invalid email format. Please use your PCU email";

        return Object.keys(errors).length === 0;
    };

    const storeUserData = async (id, accessToken, role, firstname) => {
        try {
            await AsyncStorage.setItem('id', id);
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('role', role);
            await AsyncStorage.setItem('firstname', firstname);

            console.log('User data saved', firstname);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };


    const handleSubmit = async () => {
        if (validationForm()) {
            try {
                // Clear Google login data on manual login
                await AsyncStorage.removeItem('googleId');
                await AsyncStorage.removeItem('name');

                // Send login request to your backend
                const response = await axios.post('http://192.168.1.8:3000/user/login', {
                    email,
                    password,
                });

                if (response.status === 200) {
                    const { id, accessToken, role, firstname } = response.data;
                    console.log('Login successful:', { id, email, role });
                    Alert.alert('Success', 'Login successful!');

                    // Authenticate with Realm
                    const credentials = Realm.Credentials.jwt(accessToken);
                    await app.logIn(credentials);

                    // Store user data in AsyncStorage
                    await storeUserData(id, accessToken, role, firstname);
                    console.log(accessToken);

                    // Navigate to the appropriate screen
                    if (role === 'admin' || role === 'Nurse') {
                        navigation.navigate('AdminDasboard');
                    } else if (role === 'user') {
                        navigation.navigate('user');
                    }

                    setEmail('');
                    setPassword('');
                } else {
                    Alert.alert('Error', 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                const errorMessage = error.response?.data?.message || 'Unable to connect to the server. Please check your internet connection and try again.';
                Alert.alert('Login Error', errorMessage);
                setEmail('');
                setPassword('');
            }
        }
    };



    const handleGoogleLogin = async () => {
        try {
            Linking.openURL('https://9656-103-129-124-2.ngrok-free.app/auth/google'); // Use your local tunnel URL
        } catch (error) {
            console.error('Error during Google login:', error);
            Alert.alert('Google Login Error', 'Unable to start Google login process.');
        }
    };

    useEffect(() => {
        const handleRedirect = async (event) => {
            const url = event.url;
            if (url && url.startsWith('https://9656-103-129-124-2.ngrok-free.app/auth/success')) { // Use your local tunnel URL
                try {
                    const urlParams = new URLSearchParams(url.split('?')[1]);
                    const token = urlParams.get('token');
                    const googleId = urlParams.get('googleId');

                    if (token) {
                        await AsyncStorage.setItem('accessToken', token);
                        if (googleId) {
                            await AsyncStorage.setItem('googleId', googleId);
                        }
                        navigation.navigate('user'); // Or any other screen you want to navigate to
                    } else {
                        Alert.alert('Error', 'Failed to retrieve access token.');
                    }
                } catch (error) {
                    console.error('Error handling redirect:', error);
                    Alert.alert('Redirect Error', 'Failed to handle the redirect.');
                }
            }
        };

        const subscription = Linking.addEventListener('url', handleRedirect);

        return () => {
            subscription.remove();
        };
    }, [navigation]);


    return (
        <View style={styles.loginContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/pcuLogo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.Text}>
                    Philippine Christian University
                </Text>

                <Text style={styles.inputLabel}>Admin</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#ccc"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#ccc"
                    secureTextEntry={true}
                    autoCapitalize="none"
                />

                <Pressable style={[styles.button, { marginTop: 10 }]} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

                <Text style={[styles.buttonText, { color: Colors.white }]}>or</Text>

                <Pressable style={[styles.button, { backgroundColor: Colors.cobaltblue, marginTop: 10 }]} onPress={handleGoogleLogin}>
                    <Text style={[styles.buttonText, { color: Colors.white }]}>Login with Google</Text>
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
        height: '90%',
    },
    button: {
        backgroundColor: Colors.white,
        padding: 10,
        marginHorizontal: 50,
        borderRadius: 10,
        marginBottom: 20,
        width: '60%',
        alignItems: 'center',
    },
    logo: {
        width: '30%', // Adjust this value to make the image smaller
        aspectRatio: 1.5, // Adjust this value if needed to match the image's natural proportions
        height: '30%',
    },
    buttonText: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: 'bold',
    },
    Text: {
        color: Colors.white,
        fontSize: 40,
        fontFamily: 'pcufont',
        textAlign: 'center',
    },
    inputLabel: {
        color: Colors.white,
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginBottom: 5,
    },
    input: {
        backgroundColor: Colors.white,
        color: Colors.black,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '80%',
        marginBottom: 20,
        fontSize: 16,
        alignSelf: 'center',
    },
});

export default AdminLoginScreen;
