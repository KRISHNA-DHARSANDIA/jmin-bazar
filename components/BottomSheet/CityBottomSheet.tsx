/* eslint-disable prettier/prettier */
import React, { forwardRef, useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, BackHandler, FlatList } from 'react-native';
import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import Icon, { Icons } from '../../assets/Icon/Icons';

export type Ref = BottomSheetModal;

type PCityData = {
    title: string;
    key: string;
    ICName: string;
};

type NCitytype = {
    title: string;
    id: number;
}

type PCityProps = {
    city: PCityData;
    selectitm: (item: PCityData) => void;
};


const popularCities: PCityData[] = [
    { title: 'Ahmedabad', ICName: 'chrome', key: '1' },
    { title: 'Rajkot', ICName: 'github', key: '2' },
    { title: 'Vadodara', ICName: 'gitlab', key: '3' },
    { title: 'Surat', ICName: 'bluetooth', key: '4' },
    { title: 'Junagadh', ICName: 'linkedin', key: '5' },
];

const PopularCity = ({ city, selectitm }: PCityProps) => (
    <TouchableOpacity onPress={() => selectitm(city)} style={styles.PCity}>
        <View style={{ backgroundColor: '#F6F5F2', width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 35 }}>
            <Icon style={{}} type={Icons.Feather} name={city.ICName} size={40} color={'gray'} />
        </View>
        <Text style={styles.Poptitle}> {city.title} </Text>
    </TouchableOpacity>
);

const cities = [
    { title: 'Ahmedabad', id: 1 },
    { title: 'Rajkot', id: 2 },
    { title: 'Morbi', id: 3 },
    { title: 'Ahmedabad', id: 4 },
    { title: 'Ahmedabad', id: 5 },
    { title: 'Ahmedabad', id: 6 },
    { title: 'Ahmedabad', id: 7 },
    { title: 'Ahmedabad', id: 9 },
    { title: 'Ahmedabad', id: 10 },
    { title: 'Ahmedabad', id: 11 },
    { title: 'Ahmedabad', id: 12 },
];

const CityBottomSheet = forwardRef<Ref>((props, ref) => {

    const snapPoints = useMemo(() => ['90%'], []);

    const [data, setData] = useState(cities);
    const [isSearch, setIsSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedCity, setSelectedCity] = useState(cities[0].id);
    const [selectedCityName, setSelectedCityName] = useState(cities[0].title);

    useEffect(() => {
        setData(data);
    }, [data]);

    // setTimeout(() => {
    //     setData(props.setBtData);
    //     languages = props.setBtData;
    // }, 0);

    const searchFunction = (text: string) => {

        if (text.length === 0) {
            setIsSearch(false);
        }

        setSearchText(text);
        text = text.toLowerCase();
        if (text === '') {
            setData(cities);
        }
        else {
            let filteredLanguages = (cities).filter(city => (city.title.toLowerCase().startsWith(text)));
            setData(filteredLanguages);
        }
    }

    const renderCity = ({ item }: { item: NCitytype }) => (
        <TouchableOpacity onPress={() => selectitm(item)} style={styles.box}>
            <Text style={[styles.title, { color: item.id === selectedCity ? 'green' : 'black' }]}> {item.title} </Text>
        </TouchableOpacity >
    );

    const selectitm = (item: any) => {
        setSelectedCity(item.id);
        setSelectedCityName(item.title);
        props.setSelectedCity(item.title);
        props.CBSRef.current.close();
    };

    const renderBackdrop = useCallback((propsrd: any) => (
        <BottomSheetBackdrop
            {...propsrd}
            disappearsOnIndex={-1}
            appearsOnIndex={1}
        />
    ), []);

    const renderHandle = () => (
        <View style={styles.handleContainer}>
            <Text style={styles.handleTitle}>Select City</Text>
            <Text style={styles.handleSubtitle}>Current: {selectedCityName}</Text>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholderTextColor="black"
                    onKeyPress={() => setIsSearch(true)}
                    placeholder="Search City"
                    value={searchText}
                    onChangeText={searchFunction}
                />
            </View>
        </View>
    );

    const renderPopularCity = ({ item }: { item: PCityData }) => (
        <PopularCity
            city={item}
            selectitm={selectitm}
        />
    );

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
            enableOverDrag={false}
            handleComponent={renderHandle}
        >
            <BottomSheetFlatList
                data={[1, 1]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: '100%', marginHorizontal: 16 }}>
                            {index === 0 && (!isSearch) &&
                                <View>
                                    <View style={{ marginVertical: 4 }}>
                                        <Text style={{ fontSize: 22, fontWeight: '600' }}>Popular Cities</Text>
                                    </View>
                                    <BottomSheetFlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        data={popularCities}
                                        renderItem={renderPopularCity}
                                        keyExtractor={itm => itm.key}
                                        contentContainerStyle={{ marginTop: 5, paddingRight: 20 }}
                                    />
                                </View>
                            }
                            {index === 1 &&
                                <View>
                                    <View style={{ marginVertical: 12 }}>
                                        <Text style={{ fontSize: 22, fontWeight: '600' }}>All Cities</Text>
                                    </View>
                                    <FlatList
                                        data={data}
                                        renderItem={renderCity}
                                        keyExtractor={(itm, idx) => idx.toString()}
                                        contentContainerStyle={{ marginBottom: 20 }}
                                    />
                                </View>
                            }
                        </View>
                    );
                }}
            />
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginVertical: 2,
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
        marginHorizontal: 20,
    },
    bottomSheetView: {
        margin: 16,
    },
    searchBarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },
    horizontalList: {
        paddingLeft: 16,
        paddingBottom: 20,
        height: 150,
        borderBottomWidth: 1,
    },
    verticalList: {
        paddingBottom: 16,
    },
    CBScontainer: {
        flex: 1,
        padding: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    CBScontentContainer: {
        flex: 1,
        marginHorizontal: 16,
    },
    searchBar: {
        width: 370,
        height: 50,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#999999',
        backgroundColor: '#ffffff',
        marginTop: 10,
        paddingLeft: 16,
        fontSize: 18,
        color: 'black',
    },
    listDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    box: {
        width: 120,
        height: 50,
        // borderWidth: 1,
        // borderColor: 'red',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 1,
    },
    title: {
        fontSize: 15,
        color: 'black',
    },
    handleTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    handleSubtitle: {
        fontSize: 14,
        color: 'green',
    },
    handleContainer: {
        marginHorizontal: 16,
        marginVertical: 20,
        backgroundColor: 'white',
    },
    PCity: {
        width: 100,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    Poptitle: {
        top: 10,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CityBottomSheet;
