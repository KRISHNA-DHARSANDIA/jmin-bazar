
import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'tamagui';

//map
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


import { useNavigation } from '@react-navigation/native';


const MapLocation = ({ route }) => {

    const [lati, setlatitude] = useState(0);
    const [log, setlogitude] = useState(0);

    const { params } = route;

    const latitude = params?.lat;
    const longitude = params?.log;

    const { onSave } = params;

    const [marker, setMarker] = useState(null);

    const handleRegionChange = (region) => {
        setMarker(region);
    };

    const handleRegionChangeComplete = (region) => {
        setlatitude(region.latitude);
        setlogitude(region.longitude);
    };


    const navigation = useNavigation();

    const handleSaveloc = () => {
        // navigation.navigate('AddProperty', {
        //     latitude: lati,
        //     longitude: log,
        // });

        const selectedLocation = {
            latitude: lati,
            longitude: log,
        };

        // //callback function to set the value
        onSave(selectedLocation);
        navigation.goBack();
    };

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
