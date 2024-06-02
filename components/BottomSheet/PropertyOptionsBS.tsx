import React, { forwardRef, useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, BackHandler } from 'react-native';
import {
    BottomSheetModal,
    useBottomSheetModal
} from '@gorhom/bottom-sheet';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const PropertyOptionsBS = () => {
    return (
        <View>
            <Text>PropertyOptionsBS</Text>
        </View>
    )
}

export default PropertyOptionsBS

const styles = StyleSheet.create({})