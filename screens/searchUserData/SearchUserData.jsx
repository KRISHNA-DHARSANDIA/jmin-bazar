/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Text, StyleSheet, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { View, ScrollView, Button, XStack, YStack, Image } from 'tamagui';
import { Crosshair, Airplay, AirVent, Brain, CloudSunRain } from '@tamagui/lucide-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon, { Icons } from '../../assets/Icon/Icons';
const { height, width } = Dimensions.get('window');



export default class SearchUserData extends Component {
    render() {
        return (
            <View style={styles.maincontainer}>
                <View style={styles.topview}>
                    <View>
                        <Text style={{ fontSize: 19, fontWeight: '600' }} >Looking To</Text>
                    </View>
                    <View marginTop={10}>
                        <YStack padding="$4" space="$3" >
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                <XStack space="$2" justifyContent="space-between">
                                    <TouchableOpacity alignSelf="center" size="$4" style={styles.headerbtn}>
                                        <Text>Buy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity alignSelf="center" size="$4" style={styles.headerbtn}>
                                        <Text>Sell</Text>

                                    </TouchableOpacity>
                                </XStack>
                            </ScrollView>
                        </YStack>
                    </View>
                    <View style={styles.SUsearch}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text marginLeft={10} style={{ fontWeight: '900', fontSize: 14 }}>Search   </Text>
                            <Text style={{ fontWeight: '400', fontSize: 14 }}>City, Location, Project, Landmark</Text>
                        </View>
                        <Icon style={{ marginRight: 10 }} type={Icons.MaterialIcons} name="search" size={30} color={'blue'} />
                    </View>
                </View>
                <View style={styles.SUbottom}>
                    <View>
                        <Text style={{ fontSize: 19, fontWeight: '600' }} >Budget</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        margin: 10,
    },
    topview: {
        marginVertical:10,
        backgroundColor: 'red',
    },
    headerbtn: {
        borderRadius: 20,
        backgroundColor: 'white',
        width: 60,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 1,
    },
    SUsearch: {
        width: width - 22,
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'blue',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    SUbottom: {
        width:100,
        height:200,
        backgroundColor: 'green',
        marginTop:10,
    }
})