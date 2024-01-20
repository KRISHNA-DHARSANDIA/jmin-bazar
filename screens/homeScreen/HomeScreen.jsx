/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { Crosshair, Airplay, AirVent, Brain, CloudSunRain } from '@tamagui/lucide-icons'
import { View, ScrollView, Button, XStack, YStack, Image } from 'tamagui';

//Icon
import Icon, { Icons } from '../../assets/Icon/Icons';

//component
import Navbar from '../../components/NavbarTop/Navbar';

const { height, width } = Dimensions.get('window');

const HomeScreen = (props) => {
  // feature use
  // const hendleRegiser = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append('Content-Type', 'application/json');

  //   var raw = JSON.stringify({
  //     'id': 18,
  //     'name': 'krishna',
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch("http://192.168.252.153:7237/api/Registration/registration", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

  const handelSearch = () =>{
    console.log("handelsearch")
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f6fb' }}>
      <View>
        <Navbar />
      </View>
      <View>
        <View marginTop={10}>
          <YStack padding="$4" space="$3" {...props}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              <XStack space="$2" justifyContent="space-between">
                <Button alignSelf="center" icon={Airplay} size="$4">
                  Large
                </Button>
                <Button alignSelf="center" icon={Crosshair} size="$4">
                  Large
                </Button>
                <Button alignSelf="center" icon={AirVent} size="$4">
                  Large
                </Button>
                <Button alignSelf="center" icon={Brain} size="$4">
                  Large
                </Button>
                <Button alignSelf="center" icon={CloudSunRain} size="$3">
                  Large
                </Button>
              </XStack>
            </ScrollView>
          </YStack>
        </View>
        <View justifyContent='center' alignItems='center'>
          <Image
            source={{
              uri: 'https://placekitten.com/200/300',
              width: width - 10,
              height: 220,
            }}
            style={styles.AdsImg}
          />
        </View>
        <View style={styles.HSsearchContainer}>
          <View style={styles.HSsearch} onPress={handelSearch}>
            <View style={{flexDirection:'row'}}>
              <Text marginLeft={10} style={{ fontWeight: '900', fontSize: 14 }}>Search   </Text>
              <Text style={{ fontWeight: '400', fontSize: 14 }}>City, Location, Project, Landmark</Text>
            </View>
            <Icon style={{ marginRight: 10 }} type={Icons.MaterialIcons} name="search" size={30} color={'blue'} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  AdsImg: {
    borderRadius: 15,
  },
  HSsearch: {
    width: width - 40,
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: -30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor:'blue',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  HSsearchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
