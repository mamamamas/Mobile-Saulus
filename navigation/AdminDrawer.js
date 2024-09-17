import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabs from './HomeTabs'; // Import tabs navigator
import ServicesScreen from '../screens/TabScreens/ServicesScreen';
import ScheduleScreen from '../screens/TabScreens/ScheduleScreen';
import ArchiveScreen from '../screens/TabScreens/ArchiveScreen';
import EventsScreen from '../screens/TabScreens/EventsScreen';
import HealthTipsScreen from '../screens/TabScreens/HealthTipsScreen';
import RequestFormsScreen from '../screens/TabScreens/RequestFormsScreen';
import TelemedScreen from '../screens/TabScreens/TelemedScreen';
import LogoutScreen from '../screens/TabScreens/LogoutScreen';
import CustomDrawerContent from '../screens/Components/CustomDrawerContent';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import InventoryScreen from '../screens/TabScreens/InventoryScreen';
import StudentRecordScreen from '../screens/TabScreens/StudentRecordScreen';

const Drawer = createDrawerNavigator();
const AdminDrawer = () => {

  return (
    <Drawer.Navigator
      initialRouteName="HomeTabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          width: 250,
        },
        headerShown: true,
        drawerActiveTintColor: '#1f65ff',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={HomeTabs} // Use HomeTabs for tab navigation
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          drawerLabel: 'Services',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          drawerLabel: 'Schedule',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Telemed"
        component={TelemedScreen}
        options={{
          drawerLabel: 'Telemed',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="medkit-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Forms"
        component={RequestFormsScreen}
        options={{
          drawerLabel: 'Forms',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Events"
        component={EventsScreen}
        options={{
          drawerLabel: 'Events',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Health"
        component={HealthTipsScreen}
        options={{
          drawerLabel: 'Health',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Archive"
        component={ArchiveScreen}
        options={{
          drawerLabel: 'Archive',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="archive-outline" size={size} color={color} />
          ),
        }}
      />

      {/* <Drawer.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          drawerLabel: 'Inventory',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="folder-open-outline" size={size} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Student Record"
        component={StudentRecordScreen}
        options={{
          drawerLabel: 'Student Record',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="exit-outline" size={size} color={color} />
          ),
        }}
      />



    </Drawer.Navigator>
  );
};

export default AdminDrawer;
