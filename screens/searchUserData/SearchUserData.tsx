import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

import {
    Button,
    Separator,
    Checkbox,
    Switch,
    XStack,
    YStack,
} from 'tamagui';
import Icon, { Icons } from '../../assets/Icon/Icons';

import Colors from '../../constants/Colors';


//component
import PropertyTypesList from '../../components/propertyTypesList/PropertyTypesList';


import SwitchSelector from 'react-native-switch-selector';

//Price Slider
import PriceSlider from '../../components/priceSlider/PriceRange';

//Area Slider
import AreaSlider from '../../components/areaSlider/AreaRange';


//bottom Sheet
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import CustomeBottomSheet from '../../components/BottomSheet/CityBottomSheet';

import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';


const maxWidth = Dimensions.get('screen').width - 20;

type Coordinate = {
    lon: number;
    lat: number;
};


type RootStackParamList = {
    SearchUserData: undefined; // No parameters needed
    MapLocation: { log: number, lat: number, previousScreen: string }
};

type SearchUserDataNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SearchUserData'
>;

type Props = {
    navigation: SearchUserDataNavigationProp;
    route: any;
};



const SearchUserData: React.FC<Props> = ({ navigation, route }) => {

    const { params } = route;

    const [coordinatesdata, setCoordinates] = useState({
        logitude: 0,
        latitude: 0,
    });

    const [purposeType, setPurposeType] = useState('buy');
    const [selectedCity, setSelectedCity] = useState('Ahmedabad');
    const [maxPrice, setMaxPrice] = useState('0');
    const [minPrice, setMinPrice] = useState('100');

    const [minArea, setMinArea] = useState('0');
    const [maxArea, setMaxArea] = useState('100');

    const [isAdsEnable, setisAdsEnable] = useState<boolean>(true);

    type Indeterminate = 'indeterminate';
    const [istermsTrue, setIsTerms] = useState<boolean | Indeterminate>();

    const CitybottomSheetRef = useRef<BottomSheetModal>(null);

    const handlePriceValuesChange = (min: string, max: string) => {
        setMinPrice(min);
        setMaxPrice(max);
    };

    const onAreaValueChange = (min: string, max: string) => {
        setMinArea(min);
        setMaxArea(max);
    };

    const handletermsCheck = (value: boolean | Indeterminate) => {
        setIsTerms(value);
    };

    const handleAdsCheck = (valus: boolean) => {
        setisAdsEnable(valus);
    };


    const prevLocation = useRef(null); // Store previous location


    useEffect(() => {
        if (params?.selectedLocation) {
            const location = params.selectedLocation;
            console.log(location);
            setCoordinates({
                logitude: location.longitude,
                latitude: location.latitude,
            });
        }
    }, [params?.selectedLocation]);

    const handleGetLocation = async () => {
        try {
            const searchText = selectedCity;

            const response = await axios.get(
                `https://api.geoapify.com/v1/geocode/search?text=${searchText},Gujarat,india&apiKey=77133309d92c4352bd8c377cdf243e0c`
            );

            // Extracting latitude and longitude from response data
            if (response && response.data && response.data.features.length > 0) {

                const logitude = response.data.features[0].properties.lon;
                const latitude = response.data.features[0].properties.lat;

                navigation.navigate('MapLocation', {
                    lat: latitude,
                    log: logitude,
                    previousScreen: 'SearchUserData',
                });

            } else {
                console.error('No location data found.');
            }
        } catch (error: any) {
            console.error('Error fetching data in getLocation:', error.message);
        }
    };

    const handlePurposeChange = useCallback((value: string) => {
        setPurposeType(value);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" >
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
                                    initial={purposeType === 'buy' ? 0 : 1}
                                    onPress={handlePurposeChange}
                                    textColor={'#686D76'}
                                    selectedColor={'white'}
                                    buttonColor={Colors.primary}
                                    borderColor={'#c9ffff'}
                                    animationDuration={200}
                                    style={styles.togglebtnforpurpose}
                                    options={[
                                        { label: 'Buy', value: 'buy' },
                                        { label: 'Sell', value: 'sell' },
                                    ]}
                                    testID="Purpose-switch-selector"
                                    accessibilityLabel="Purpose-switch-selector"
                                />
                            </View>
                        </View>
                        <Separator />
                        <TouchableOpacity style={styles.infocontainer}
                            onPress={() => CitybottomSheetRef.current?.present()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.iconcontainer}>
                                    <Icon style={{}} type={Icons.MaterialCommunityIcons} name="map-marker-outline" size={24} color={'gray'} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16 }}>City</Text>
                                    <Text style={{ fontSize: 16, color: Colors.primary }}>{selectedCity}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{}} type={Icons.Feather} name="chevron-right" size={24} color={'gray'} />
                            </View>
                        </TouchableOpacity>
                        <Separator />
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
                                    editable={false}
                                />
                                <View style={{ marginLeft: -34, marginRight: 20 }}>
                                    <Icon style={{}} type={Icons.AntDesign} name="search1" size={18} color={'#686D76'} />
                                </View>
                                <Button alignSelf="center" height={50} borderColor={'green'} marginHorizontal="$2" borderRadius={20} onPress={handleGetLocation}>
                                    <Icon style={{}} type={Icons.MaterialCommunityIcons} name="map" size={24} color={'green'} />
                                    Map
                                </Button>
                            </View>
                        </View>
                        <Separator />
                        <View style={[styles.infocontainer, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.iconcontainer}>
                                    <Icon style={{}} type={Icons.Feather} name="check-circle" size={20} color={'gray'} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16 }}>Property Types</Text>
                                </View>
                            </View>
                            <View>
                                <PropertyTypesList />
                            </View>
                        </View>
                        <Separator />
                        <View style={{ width: Dimensions.get('screen').width - 20, marginVertical: 16 }}>
                            <PriceSlider onPriceChange={handlePriceValuesChange} />
                        </View>
                        <Separator />
                        <View style={{ width: Dimensions.get('screen').width - 20, marginVertical: 16 }}>
                            <AreaSlider onAreaChange={onAreaValueChange} />
                        </View>
                        <Separator />
                        <View style={styles.innerContainer}>
                            <YStack flexDirection="row" width={maxWidth} justifyContent="space-between" alignItems="center">
                                <XStack alignItems="center">
                                    <Checkbox
                                        onCheckedChange={handletermsCheck}
                                        defaultChecked={true}
                                        width={30} height={30} backgroundColor={'white'} borderRadius={10}>
                                        <Checkbox.Indicator>
                                            <Icon type={Icons.Feather} name={'check'} size={20} color={Colors.primary} />
                                        </Checkbox.Indicator>
                                    </Checkbox>
                                    <Text style={{ fontSize: 16, fontWeight: '800', marginLeft: 8 }}>Show Verifired Ads Only</Text>
                                </XStack>
                                <Switch height={20} width={20} onCheckedChange={handleAdsCheck} defaultChecked={isAdsEnable} marginRight={10}>
                                    <Switch.Thumb animation="quicker" backgroundColor={isAdsEnable ? Colors.primary : Colors.gray}
                                    />
                                </Switch>
                            </YStack>
                            <Text>
                                JaminBazer.com verifies the location, size and
                                advertiser information of these listings.
                                T&Cs apply.
                            </Text>
                        </View>
                        <Separator />
                        <View style={styles.innerContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                {/* bedroom */}
                                <View style={styles.iconcontainer}>
                                    <Icon type={Icons.Ionicons} name="bed-outline" size={20} color={'gray'} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Bedrooms</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 16 }}>
                                <XStack space={10} position="relative" flexWrap="wrap" >
                                    <Button onPress={() => console.log('buy')} alignSelf="center"
                                        size={'$2'} height={40} backgroundColor={'$bglight_2'}>
                                        Studio
                                    </Button>
                                    <Button onPress={() => console.log('buy')} alignSelf="center"
                                        size={'$2'} height={40} backgroundColor={'$bglight_2'}>
                                        1
                                    </Button>
                                    <Button onPress={() => console.log('Rent')} height={40} alignSelf="center" size="$2"
                                        backgroundColor={'$bglight_2'}>
                                        2
                                    </Button>
                                    <Button onPress={() => console.log('Plot / Land')} height={40} alignSelf="center" size="$2" backgroundColor={'$bglight_2'}>
                                        3
                                    </Button>
                                    <Button onPress={() => console.log('Co-working Spaces')} height={40} alignSelf="center" size="$2" backgroundColor={'$bglight_2'}>
                                        4
                                    </Button>
                                    <Button onPress={() => console.log('Buy Commercial')} height={40} alignSelf="center" size="$2" backgroundColor={'$bglight_2'} mt={20} >
                                        6
                                    </Button>
                                    <Button onPress={() => console.log('Buy Commercial')} height={40} alignSelf="center" size="$2" backgroundColor={'$bglight_2'} mt={20} >
                                        7
                                    </Button>
                                    <Button onPress={() => console.log('Buy Commercial')} height={40} alignSelf="center" size="$2" backgroundColor={'$bglight_2'} mt={20} >
                                        8
                                    </Button>
                                    <Button onPress={() => console.log('Buy Commercial')} height={40} alignSelf="center" size="$2" backgroundColor={'$bglight_2'} mt={20} >
                                        9
                                    </Button>
                                    <Button onPress={() => console.log('Buy Commercial')} height={40} alignSelf="center" size="$2" backgroundColor={'$bglight_2'} mt={20} >
                                        10+
                                    </Button>
                                </XStack>
                            </View>
                        </View>
                        <Separator />
                        {/* Bathrooms */}
                        <View style={styles.innerContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <View style={styles.iconcontainer}>
                                    <Icon type={Icons.FontAwesome} name="bathtub" size={20} color={'gray'} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Bathrooms</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 16 }}>
                                <XStack space={10} position="relative" flexWrap="wrap" >
                                    <Button onPress={() => console.log('buy')} alignSelf="center"
                                        size={'$2'} height={40} backgroundColor={'$bglight_2'}>
                                        1
                                    </Button>
                                    <Button onPress={() => console.log('Rent')} height={40} alignSelf="center" size="$2"
                                        backgroundColor={'$bglight_2'}>
                                        2
                                    </Button>
                                    <Button onPress={() => console.log('Plot / Land')} height={40} alignSelf="center" size="$2" backgroundColor={'$bglight_2'}>
                                        3
                                    </Button>
                                    <Button onPress={() => console.log('Co-working Spaces')} height={40} alignSelf="center" size="$2" backgroundColor={'$bglight_2'}>
                                        4
                                    </Button>
                                    <Button onPress={() => console.log('Buy Commercial')} height={40} alignSelf="center" size="$2" backgroundColor={'$bglight_2'} marginTop={20} >
                                        6+
                                    </Button>
                                </XStack>
                            </View>
                        </View>
                        <Separator />
                        <View style={styles.innerContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <View style={styles.iconcontainer}>
                                    <Icon type={Icons.MaterialCommunityIcons} name="format-letter-matches" size={20} color={'gray'} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Add Keyword</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 10 }}>
                                <TextInput
                                    style={{ width: 280, backgroundColor: '#F1F1F1', borderColor: '#686D76', borderWidth: 2, borderRadius: 10, height: 50, paddingHorizontal: 20, fontSize: 16, color: '#ffffff' }}
                                    placeholder='Try "furnished", "low price" etc.'
                                />
                                <Button alignSelf="center" height={50} marginHorizontal={10} borderRadius={10}>
                                    <Icon style={{}} type={Icons.Ionicons} name="add" size={24} color={'green'} />
                                </Button>
                            </View>
                        </View>
                        <View>
                            <CustomeBottomSheet
                                ref={CitybottomSheetRef}
                                CBSRef={CitybottomSheetRef}
                                setSelectedCity={(city: string) => setSelectedCity(city)}
                            />
                        </View>
                    </View>
                    <View style={styles.endFill} />
                </ScrollView>
                <View style={styles.bottomConatiner}>
                    <Button style={[styles.buttombtnfind, { backgroundColor: 'transparent' }]} color={'white'}>
                        Reset
                    </Button>
                    <Button style={styles.buttombtnfind} color={'white'}>
                        Save
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SearchUserData;


const styles = StyleSheet.create({
    maincontainer: {
        margin: 8,
        backgroundColor: '$background'
    },
    infocontainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 16,
    },
    innerContainer: {
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
        borderColor: 'transparent',
    },
    togglebtnforpurpose: {
        width: 140,
        alignItems: 'center',
    },
    labelpurpose: {
        fontSize: 20,
        zIndex: 1,
    },
    test1: {
        backgroundColor: Colors.white,
    },
    endFill: {
        height: 50, // Adjust height as needed
        backgroundColor: Colors.white,
    },
    bottomConatiner: {
        width: Dimensions.get('screen').width,
        height: 60,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#ffffffd0',
    },
    buttombtnfind: {
        width: 180,
        height: 45,
        backgroundColor: '#00aa54',
        borderRadius: 10,
    }
});

