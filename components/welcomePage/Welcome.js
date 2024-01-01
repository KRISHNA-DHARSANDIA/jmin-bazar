/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

// import { RootStackParamList } from '../../App';

// //navigation
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// type WelcomeProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>

const Welcome = ({navigation}) => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  return (
    <SafeAreaView>
      <View
        style={[styles.container, {height: screenHeight, width: screenWidth}]}
      >
        <View style={styles.imgdiv}>
          <Image
            style={styles.Welcomeimg}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/09/21/04/46/barley-field-1684052_1280.jpg',
            }}
          />
        </View>

        <View>
          <View style={styles.logocontainer}>
            <View style={styles.iconback}>
              <View style={styles.iconsize}>
                <Icon name="leaf" color="#0a2d22" size={30} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerback}>
          <View style={styles.row}>
            <View style={styles.halfsquare} />
            <View style={styles.halfsquare} />
            <View style={styles.halfsquare} />
            <View style={styles.halfsquare} />
            <View style={styles.halfsquare} />
            <View style={styles.halfsquare} />
          </View>
          <View style={styles.row}>
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
          </View>
          <View style={styles.row}>
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
          </View>
          <View style={styles.row}>
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
          </View>
          <View style={styles.row}>
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
            <View style={styles.fullsquare} />
          </View>
          <View style={styles.row}>
            <View style={styles.fullsquare} />
            <View style={styles.Lastsquare} />
            <View style={styles.Lastsquare} />
            <View style={styles.Lastsquare} />
            <View style={styles.Lastsquare} />
            <View style={styles.fullsquare} />
          </View>
        </View>

        <View style={styles.textcontant}>
          <View style={styles.maintxtcontant}>
            <Text style={styles.mainMsg}>Manage Your Selling Farm</Text>
          </View>
          <View style={styles.subcontant}>
            <Text style={styles.subMsg}>
              Thriving farm for sale—your opportunity to own a haven of
              agricultural excellence. Embrace a life of abundance and growth.
            </Text>
          </View>
          <View style={styles.btncontainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('FirstLoad')}
            >
              <Text style={styles.welbtntxt}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#093832',
  },
  imgdiv: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Welcomeimg: {
    height: 420,
    width: 800,
    borderBottomLeftRadius: 360,
    borderBottomRightRadius: 360,
  },
  textcontant: {
    height: 420,
  },
  maintxtcontant: {
    marginHorizontal: 30,
    alignItems: 'center',
    marginTop: 55,
  },
  mainMsg: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subcontant: {
    marginHorizontal: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  subMsg: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
  },
  btncontainer: {
    marginVertical: 40,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#189877',
    width: 340,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  welbtntxt: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1,
  },
  logocontainer: {
    alignItems: 'center',
    marginTop: -36,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  iconsize: {
    backgroundColor: '#c9eb03',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  iconback: {
    backgroundColor: 'rgba(240, 240, 240,0.2)',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  containerback: {
    flex: 1,
    alignItems: 'center',
    zIndex: -1,
  },
  row: {
    flexDirection: 'row',
  },
  fullsquare: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  halfsquare: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderEndWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.02)',
  },
  Lastsquare: {
    width: 70,
    height: 70,
  },
});

export default Welcome;
