/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useRef } from 'react';
import { Text, StyleSheet, Switch, Dimensions, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import type { StackProps, TabLayout, TabsTabProps } from 'tamagui'
import React, { Component, useState } from 'react';
import {
    Button,
    Separator,
} from 'tamagui';
import Icon, { Icons } from '../../assets/Icon/Icons';

//component
import PropertyTypesList from '../../components/propertyTypesList/PropertyTypesList';


import SwitchSelector from 'react-native-switch-selector';

//bottom Sheet
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import CustomeBottomSheet from '../../components/BottomSheet/CityBottomSheet';

const SearchUserData = () => {

    const [PurposeType, setPurposeType] = useState('buy');
    const [selectedCity, setSelectedCity] = useState('Ahmedabad');
    const { dismissAll, dismiss } = useBottomSheetModal();

    const CitybottomSheetRef = useRef<BottomSheetModal>(null);

    return (
        <View style={styles.maincontainer}>
            <View style={styles.infocontainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.Feather} name="check-circle" size={20} color={'gray'} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 16 }}>I Want To</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SwitchSelector
                        initial={0}
                        onPress={(value: string) => {
                            setPurposeType(value);
                        }}
                        textColor={'#686D76'}
                        selectedColor={'white'}
                        buttonColor={'green'}
                        borderColor={'#c9ffff'}
                        borderWidth={10}
                        style={styles.togglebtnforpurpose}
                        options={[
                            { label: 'Buy', value: 'buy' },
                            { label: 'Sell', value: 'sell' }
                        ]}
                        testID="Purpose-switch-selector"
                        accessibilityLabel="Purpose-switch-selector"
                    />
                </View>
            </View>
            <Separator borderColor={'#F0EBE3'} borderWidth={1} />
            <TouchableOpacity style={styles.infocontainer}
                onPress={() => CitybottomSheetRef.current?.present()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialCommunityIcons} name="map-marker-outline" size={24} color={'gray'} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 16 }}>City</Text>
                        <Text style={{ fontSize: 16, color: 'green' }}>{selectedCity}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon style={{}} type={Icons.Feather} name="chevron-right" size={24} color={'gray'} />
                </View>
            </TouchableOpacity>
            <Separator borderColor={'#F0EBE3'} borderWidth={1} />
            <View style={[styles.infocontainer, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialCommunityIcons} name="map" size={24} color={'gray'} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 16 }}>Select Locations</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 10 }}>
                    <TextInput
                        style={{ width: 240, backgroundColor: '#F1F1F1', borderColor: '#686D76', borderWidth: 2, borderRadius: 20, height: 50, paddingHorizontal: 20, fontSize: 18, color: '#ffffff' }}
                        placeholder="Search Locations"
                    />
                    <View style={{ marginLeft: -34, marginRight: 20 }}>
                        <Icon style={{}} type={Icons.AntDesign} name="search1" size={18} color={'#686D76'} />
                    </View>
                    <Button alignSelf="center" height={50} borderColor={'green'} marginHorizontal="$2" borderRadius={20} fontWeight={'$10'}>
                        <Icon style={{}} type={Icons.MaterialCommunityIcons} name="map" size={24} color={'green'} />
                        Map
                    </Button>
                </View>
            </View>
            <Separator borderColor={'white'} borderWidth={1} />
            <View style={styles.infocontainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.Feather} name="check-circle" size={20} color={'gray'} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 16 }}>Property Types</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginLeft: 16 }}>
                <PropertyTypesList />
            </View>
            <View>
                <CustomeBottomSheet
                    ref={CitybottomSheetRef}
                    CBSRef={CitybottomSheetRef}
                    setSelectedCity={(city: string) => setSelectedCity(city)}
                />
            </View>
        </View >
    )
}

export default SearchUserData;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        margin: 10,
    },
    infocontainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 16,
    },
    iconcontainer: {
        width: 40,
        height: 40,
        backgroundColor: '#e3e3e3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    togglebtnforpurpose: {
        width: 140,
        alignItems: 'center',
    },
    labelpurpose: {
        fontSize: 20,
        zIndex: 1,
    },
});

