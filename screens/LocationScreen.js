import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LocationScreen = () => {
  const pcuRegion = {
    latitude: 14.3006, // Latitude of PCU Dasma
    longitude: 120.9588, // Longitude of PCU Dasma
    latitudeDelta: 0.01, // Zoom level
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={pcuRegion}
      >
        <Marker
          coordinate={{ latitude: 14.3006, longitude: 120.9588 }}
          title="PCU Clinic"
          description="Philippine Christian University Clinic- Dasmariñas"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default LocationScreen;
