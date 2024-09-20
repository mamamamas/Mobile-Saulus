
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../app/index';
import RegisterScreen from '../app/registration';
import DashboardScreen from '../app/user';
import { View, Text, ActivityIndicator, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminDasboard from '../app/AdminDasboard';
import AdminPostScreen from '../app/PostScreen';
import { AppProvider, RealmProvider, useApp } from '@realm/react';
import resetScreen from '../app/resetScreen'
import AdminDrawer from '../navigation/AdminDrawer';
import InitialLoginScreen from '../screens/InitialLoginScreen';
import StudentHomeScreen from '../screens/StudentHomeScreen';
import addScreen from '../app/Add'
import retrieveUserData from './retrieveUserData ';
import StudentDetails from '../screens/Components/StudentDetails'

const Stack = createNativeStackNavigator();

export default function Main() {
    const [initialRoute, setInitialRoute] = useState(null);
    const [loading, setLoading] = useState(true);
    const app = useApp();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const storedRole = await AsyncStorage.getItem('role');
                const token = await AsyncStorage.getItem('accessToken');
                const names = await AsyncStorage.getItem('firstname');


                if (!token || !storedRole) {
                    setInitialRoute('index');
                    setLoading(false);
                    return;
                }

                if (storedRole) {
                    if (storedRole === 'admin' || storedRole === 'Nurse') {
                        setInitialRoute('AdminDasboard');
                    } else {
                        setInitialRoute('user');
                    }
                } else if (app.currentUser) {
                    const currentUserRole = await AsyncStorage.getItem('role');
                    console.log("Current")
                    if (currentUserRole === 'admin' || currentUserRole === 'Nurse') {
                        setInitialRoute('AdminDasboard');
                    } else {
                        setInitialRoute('user');
                    }
                } else {
                    const url = await Linking.getInitialURL();
                    if (url) {
                        const urlParams = new URLSearchParams(url.split('?')[1]);
                        const token = urlParams.get('token');
                        const roleFromUrl = urlParams.get('role');

                        if (token && roleFromUrl) {
                            await AsyncStorage.setItem('accessToken', token);
                            await AsyncStorage.setItem('role', roleFromUrl);

                            if (roleFromUrl === 'admin' || roleFromUrl === 'Nurse') {
                                setInitialRoute('AdminHome');
                            } else {
                                setInitialRoute('user');
                            }
                        } else {
                            setInitialRoute('user');
                        }
                    } else {
                        setInitialRoute('user');
                    }
                }
            } catch (error) {
                console.error('Error during auto-login:', error);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [app.currentUser]);
    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    return (

        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name="AdminDasboard" component={AdminDrawer} options={{ headerShown: false }} />
            <Stack.Screen name="user" component={DashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="index" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="registration" component={RegisterScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="PostScreen" component={AdminPostScreen} /> */}
            <Stack.Screen name="StudentDetails" component={StudentDetails} options={{ headerShown: false }} />
            <Stack.Screen name='Add'
                component={addScreen} />
            <Stack.Screen
                name="InitialLogin"
                component={InitialLoginScreen}
                options={{ title: 'Login Options', headerShown: false }}
            />
            {/* <Stack.Screen
                        name="AdminLogin"
                        component={AdminLoginScreen}
                        options={{ title: 'Admin Login', headerShown: false }}
                    /> */}
            {/* <Stack.Screen
                            name="StudentLogin"
                            component={StudentLoginScreen}
                            options={{ title: 'Student Login', headerShown: false }}
                        /> */}
            <Stack.Screen
                name="AdminHome"
                component={AdminDrawer} // Use AdminDrawer for admin home
                options={{ title: 'Admin Home', headerShown: false }}
            />
            <Stack.Screen
                name="StudentHome"
                component={StudentHomeScreen}
                options={{ title: 'Student Home', headerShown: false }}
            />

        </Stack.Navigator>

    );
}