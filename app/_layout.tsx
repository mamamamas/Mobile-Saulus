import React, { useEffect } from 'react';
import { AppProvider, RealmProvider } from '@realm/react';
import Main from '../app/main'; // This should be your navigation setup
import { NavigationContainer } from '@react-navigation/native';
import retrieveUserData from './retrieveUserData ';
export default function App() {
    const appConfig = {
        id: "saulus-gneeuag",
        baseUrl: "https://services.cloud.mongodb.com",
    };


    return (

        <AppProvider id={appConfig.id} baseUrl={appConfig.baseUrl}>
            <RealmProvider>

                <NavigationContainer independent={true}>
                    <Main />
                </NavigationContainer>

            </RealmProvider>
        </AppProvider>
    );
}