/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Dimensions } from "react-native";
import Colors from '../constants/Colors';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// Get the screen dimensions
const { width, height } = Dimensions.get('window');

const Styles = StyleSheet.create({
    screenWidth: { width: width },
    screenHeight: { height: height },
    container: {
        flex: 1,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        height: 0.3,
        width: '100%',
        backgroundColor: Colors.gray,
        opacity: 0.8,
    },
    boldText: {
        fontWeight: 'bold',
    },
    contentContainerStyle: {
        paddingBottom: 200,
    },
    contentContainerStyle2: {
        paddingBottom: 100,
    },

    //User info
    UsIMainView: {
        flex: 1,
    },
    UsiTopcontaner: {
        flex: 5,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    UsiBtnregister: {
        textAlign: 'center',
    },
    Usimainbnttxt: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'blue',
    },
    UsimainbnttxtConatiner: {
        marginVertical: 10,
    },
    UsiSubbnttxt: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: width * 0.1,
    },
    UsiDownContainer: {
        flex: 5,
        backgroundColor: 'blue',
    },
    USiListCollection: {
        width: width,
        borderRadius:0,
    },
    USiListIcon: {
        width:10,
    },
    Usilogin:{
        marginTop:0,
    }

});

export default Styles;