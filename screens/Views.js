/* eslint-disable prettier/prettier */
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomHeader from '../components/customHeader/CustomHeader';

const Views = () => {
  return (
    <SafeAreaView>
      <CustomHeader title="Activity"/>
      <View>
        {/* <Text>Views</Text> */}
      </View>
    </SafeAreaView>
  )
}

export default Views;

const styles = StyleSheet.create({})