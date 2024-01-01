/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Dimensions } from "react-native";
import Colors from '../constants/Colors';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// Get the screen dimensions
const screenWidth = Dimensions.get('window').width; // For Safty Purpose
const screenHeight = Dimensions.get('window').height; // for Safty Purpose

const Styles = StyleSheet.create({
    screenWidth: { width: screenWidth },
    screenHeight: { height: screenHeight },
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

    //User Info Screen Style
    UsIMainView: {
        flex: 1,
    },
    UsIbtnView: {
        width: screenWidth,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    UsILoginbtn: {
        position: 'absolute',
        padding: 10,
        borderRadius: 5,
    },
    UsILoginbtntxt: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
    },
    UsICreateProbtn: {
        backgroundColor: 'red',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: screenWidth - 45,
    },
    UsICreateProViw: {
        width: screenWidth,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    UsICreateProbtntxt:{
        fontSize:16,
        fontWeight:'700',
        color:'white',
        letterSpacing:0.4,
    }
})

export default Styles;