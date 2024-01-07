/* prettier-ignore */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';

const FirstLoad = ({navigation}) => {
  // Check the internet Is Connected
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Redirect to the home screen if the internet connection is available
    const delay = setTimeout(() => {
      if (isConnected === true) {
        navigation.navigate('TabNavigator');
      } else {
        Alert.alert(
          'No Internet',
          'Please check your internet connection and try again.',
        );
      }
    }, 3000);

    return () => clearTimeout(delay);
  }, [isConnected, navigation]);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/loadbackimg.jpg')}
        style={styles.backgroundImage}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/comylogo.jpg')}
            style={styles.logo}
          />
        </View>

        {/* Loading Animation */}
        <View style={styles.animationContainer}>
          <LottieView
            style={{ width: 150, height: 150 }}
            source={require('../../assets/Loading.json')}
            autoPlay
            loop
          />
        </View>

        {/* Name */}
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>
            <Text style={styles.jameenText}>जमीन </Text>
            <Text style={styles.bazarText}>bazar</Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoContainer: {
    flex: 1.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Only for Android
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  nameText: {
    fontSize: 24,
    textAlign: 'center',
  },
  jameenText: {
    color: 'white',
  },
  bazarText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default FirstLoad;
