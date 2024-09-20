import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudentDetails = ({ route }) => {
    const { userId } = route.params;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = await AsyncStorage.getItem('accessToken');
            try {
                const response = await axios.get(`http://192.168.1.8:3000/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data);
            } catch (err) {
                setError('Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Personal Info</Text>
            <Text style={styles.infoText}>
                Name: {userData.personal.firstName} {userData.personal.lastName}
            </Text>
            <Text style={styles.infoText}>
                Year Level: {userData.education.yearlvl}
            </Text>
            <Text style={styles.infoText}>
                Section: {userData.education.section}
            </Text>
            <Text style={styles.infoText}>
                Address: {userData.personal.address}
            </Text>
            <Text style={styles.infoText}>
                Date of Birth: {new Date(userData.personal.dateOfBirth).toLocaleDateString()}
            </Text>

            <Text style={styles.title}>Medical Info</Text>
            <Text style={styles.infoText}>
                Chest: {userData.medical.chest}
            </Text>
            <Text style={styles.infoText}>
                Weight: {userData.medical.weight}
            </Text>
            <Text style={styles.infoText}>
                Height: {userData.medical.height}
            </Text>

            <Text style={styles.title}>Assessment</Text>
            {userData.assessment.map((assess, index) => (
                <View key={index} style={styles.assessmentContainer}>
                    <Text style={styles.infoText}>
                        Actions: {assess.actions}
                    </Text>
                    <Text style={styles.infoText}>
                        Complaints: {assess.complaints}
                    </Text>
                </View>
            ))}

            <Text style={styles.title}>Immunization</Text>
            {userData.immunization.map((immun, index) => (
                <View key={index} style={styles.immunizationContainer}>
                    <Text style={styles.infoText}>
                        Vaccine: {immun.vaccine}
                    </Text>
                    <Text style={styles.infoText}>
                        Remarks: {immun.remarks}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    infoText: {
        fontSize: 16,
        marginVertical: 5,
    },
    loadingText: {
        fontSize: 18,
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#ff5252',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default StudentDetails;
