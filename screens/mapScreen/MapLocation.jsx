/* eslint-disable prettier/prettier */
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { Button, View as tView } from 'tamagui';

//map
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

//Api
// import axios from 'axios';

// const axiosInstance = axios.get({
//     baseURL: 'http://192.168.201.153:7237/api/',
// });

const MapLocation = ({ route }) => {

    const [lati, setlatitude] = useState(0);
    const [log, setlogitude] = useState(0);

    const { params } = route;

    const latitude = params?.lat;
    const longitude = params?.log;

    const [marker, setMarker] = useState(null);
    //const mapViewRef = useRef(null);

    const handleRegionChange = (region) => {
        setMarker(region);
    };

    const handleRegionChangeComplete = (region) => {
        console.log('Current Location - Latitude:', region.latitude, 'Longitude:', region.longitude);
        setlatitude(region.latitude);
        setlogitude(region.longitude);
    };

    const navigation = useNavigation();

    const handleSaveloc = () => {
        navigation.navigate('AddProperty', {
            latitude: lati,
            longitude: log,
        });
    };

    //const customMarkerIcon = require('./path/to/customMarkerIcon.png');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapcontainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    onRegionChange={handleRegionChange}
                    onRegionChangeComplete={handleRegionChangeComplete}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                >
                    {marker && (
                        <Marker.Animated
                            draggable
                            coordinate={marker}
                            title={'Marker'}
                        />
                    )}
                </MapView>
            </View>
            <View style={styles.bottombar}>
                <Button size="$3" width={180} height={45} backgroundColor={"$backgroundTransparent"}>
                    Skip
                </Button>
                <Button onPress={handleSaveloc} size="$3" width={180} height={45} backgroundColor={"#00aa54"} color={'white'}>
                    Save
                </Button>
            </View>
        </SafeAreaView>

    )
}

export default MapLocation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    mapcontainer: {
        ...StyleSheet.absoluteFillObject, // Fills the parent container
        borderRadius: 10,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bottombar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#ffffffd0',
    },
});
