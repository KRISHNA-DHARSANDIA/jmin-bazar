import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import RangeSlider from 'rn-range-slider';
import Icon, { Icons } from '../../assets/Icon/Icons';

import Thumb from '../Slider/Thumb';
import Rail from '../Slider/Rail';
import RailSelected from '../Slider/RailSelected';
//import Notch from '../Slider/Notch';
import Label from '../Slider/Label';



export default function Slider({ onAreaChange }: { onAreaChange: Function }) {

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    const handlePriceChange = async (low: number, high: number, byUser: boolean) => {
        if (!byUser) { return; }

        if (low === -1 && high === 101) {
            setMinPrice('');
            setMaxPrice('');
        } else if (low === -1 && high !== 101) {
            setMinPrice('');
            setMaxPrice(high.toString());
        } else if (high === 101 && low !== -1) {
            setMinPrice(low.toString());
            setMaxPrice('');
        } else if (low < high) {
            setMinPrice(low.toString());
            setMaxPrice(high.toString());
        }
    };

    const handleMinPriceChange = (value: any) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue >= 0) {
            setMinPrice(numericValue.toString());
        } else {
            setMinPrice('');
        }
    };

    const handleMaxPriceChange = (value: string) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue >= 0) {
            setMaxPrice(numericValue.toString());
        } else {
            setMaxPrice('');
        }
    };

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback((value: number) => <Label text={value} />, []);
    //const renderNotch = useCallback(() => <Notch />, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.select({ ios: 64, android: 0 })}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View style={styles.infocontainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.iconcontainer}>
                                <Icon type={Icons.AntDesign} name="arrowsalt" size={20} color={'gray'} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 16 }}>Area Range</Text>
                            </View>
                        </View>
                        <View style={styles.rangeContainer}>
                            <View>
                                <TextInput
                                    keyboardType="decimal-pad"
                                    style={styles.rangeInput}
                                    placeholder="0"
                                    value={minPrice}
                                    editable={true}
                                    onChangeText={handleMinPriceChange}
                                />
                            </View>
                            <Text>To</Text>
                            <View>
                                <TextInput
                                    keyboardType="decimal-pad"
                                    style={styles.rangeInput}
                                    placeholder="Any"
                                    value={maxPrice}
                                    editable={true}
                                    onChangeText={handleMaxPriceChange}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ width: Dimensions.get('screen').width - 40, marginLeft: 10 }}>
                        <RangeSlider
                            min={-1}
                            max={101}
                            step={1}
                            low={minPrice === undefined || minPrice === '' || isNaN(parseFloat(minPrice)) ? -1 : parseFloat(minPrice)}
                            high={maxPrice === undefined || maxPrice === '' || isNaN(parseFloat(maxPrice)) ? 101 : parseFloat(maxPrice)}
                            onValueChanged={(low, high, byuser) => handlePriceChange(low, high, byuser)}
                            onSliderTouchEnd={(low, high) => onAreaChange(low, high)}
                            renderThumb={renderThumb}
                            renderRail={renderRail}
                            renderRailSelected={renderRailSelected}
                            renderLabel={renderLabel}
                            style={{ marginTop: -30 }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    infocontainer: {
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 16,
        flexDirection: 'column',
        alignItems: 'flex-start',
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
    rangeContainer: {
        width: Dimensions.get('screen').width - 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'space-between',
    },
    rangeInput: {
        width: 140,
        borderColor: '#686D76',
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        fontWeight: '600',
        lineHeight: 28,
    },
});
