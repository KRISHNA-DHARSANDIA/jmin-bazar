/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';

//component
import Navbar from '../../components/NavbarTop/Navbar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  return (
    <View style={{ width: screenWidth, height: screenHeight }}>
      <View>
        <Navbar />
      </View>
      <View style={[styles.container]}>
        <Text style={[styles.textnew]}>Home screen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyname: {

  },
  textnew: {
    color: 'red',
  }
});
