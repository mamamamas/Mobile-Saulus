import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import InitialLoginScreen from '../screens/InitialLoginScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import StudentLoginScreen from '../screens/StudentLoginScreen';
import AdminDrawer from './AdminDrawer'; // Drawer navigator
import StudentHomeScreen from '../screens/StudentHomeScreen';
import addScreen from '../screens/Add'
import retrieveUserData from '../app/retrieveUserData ';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialLogin">
        <Stack.Screen
          name="InitialLogin"
          component={InitialLoginScreen}
          options={{ title: 'Login Options', headerShown: false }}
        />
        <Stack.Screen
          name="AdminLogin"
          component={AdminLoginScreen}
          options={{ title: 'Admin Login', headerShown: false }}
        />
        <Stack.Screen
          name="StudentLogin"
          component={StudentLoginScreen}
          options={{ title: 'Student Login', headerShown: false }}
        />
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
        <Stack.Screen name='Add'
          component={addScreen} options={{ title: 'Student Home', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
