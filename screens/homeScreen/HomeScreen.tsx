/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions, Text, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Crosshair, Airplay, AirVent, Brain, CloudSunRain } from '@tamagui/lucide-icons';
import { View, ScrollView, Button, XStack, YStack, Image, Card, CardProps } from 'tamagui';
import { useFocusEffect } from '@react-navigation/native';

//Icon
import Icon, { Icons } from '../../assets/Icon/Icons';

//component
import Navbar from '../../components/NavbarTop/Navbar';
import SearchUserData from '../searchUserData/SearchUserData';
import Colors from '../../constants/Colors';
import { Styles } from '../../Styles/GetTamaguiStyles';

//APi
import axiosInstance from '../../axiosInstance';

//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddProperty from '../addProperty/AddProperty';

const { width } = Dimensions.get('window');

const HomeScreen = (props: any) => {

  const [propertyDataList, setPropertyDataList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const { navigation } = props;

  useFocusEffect(
    React.useCallback(() => {
      // Use setTimeout if needed, but wrap the fetchData call inside the useCallback
      const fetchDataWithTimeout = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 100 milliseconds timeout
        fetchData();
      };

      fetchDataWithTimeout();
    }, [])
  );


  const fetchData = async () => {
    const phoneNumber = await AsyncStorage.getItem('PhoneNumber');
    setRefreshing(true);
    await axiosInstance.post('GetReactAddedFarms', {
      'phnumber': phoneNumber
    }).then(response => {
      const dataList = response.data;
      if (dataList && dataList.length > 0) {
        setPropertyDataList(dataList);
      } else {
        console.warn('Empty data received from the API');
      }
    })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    setTimeout(() => {
      setRefreshing(false);
    }, 0);
  }

  useMemo(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handelSearch = () => {
    //navigation.navigate(SearchUserData);
    navigation.navigate(AddProperty);
  }

  const favoritePressComplete = () => {
    fetchData();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f6fb', marginHorizontal: 4 }}>
      <ScrollView contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <Navbar />
        </View>
        <View>
          <View marginTop={10}>
            <YStack paddingVertical="$4" paddingHorizontal="$2" space="$3" {...props}>
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
          <View justifyContent="center" alignItems="center">
            <Image
              source={{
                uri: 'https://marketplace.canva.com/EAEz1DG3SN4/1/0/1600w/canva-dark-blue-minimalist-for-sale-real-estate-poster-landscape-KfxlYRJ-jfE.jpg',
                width: width - 10,
                height: 220,
              }}
              style={styles.AdsImg}
            />
          </View>
          {/* Search */}
          <View style={styles.HSsearchContainer}>
            <View style={styles.HSsearch} onPress={handelSearch}>
              <View style={{ flexDirection: 'row' }}>
                <Text marginLeft={10} style={{ fontWeight: '900', fontSize: 14 }}>Search   </Text>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>City, Location, Project, Landmark</Text>
              </View>
              <Icon style={{ marginRight: 10 }} type={Icons.MaterialIcons} name="search" size={30} color={'blue'} />
            </View>
          </View>
          {/* Recommand */}
          <View style={{ marginTop: 10 }}>
            <View style={styles.reacttxtcontainer}>
              <View>
                <Text style={Styles.recttxt}>Recently Added</Text>
                <Text>Latest Properties are Here</Text>
              </View>
              {/* <View>
                <TouchableOpacity>
                  <Text>See All</Text>
                </TouchableOpacity>
              </View> */}
            </View>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <XStack $sm={{ flexDirection: 'row' }} paddingHorizontal="$2" space>
                  {propertyDataList.map((propertyData, index) => (
                    <View key={index}>
                      <DemoCard
                        pid={`${propertyData.pid}`}
                        pdescription={`${propertyData.pdescription}`}
                        ptitle={`${propertyData.ptitle}`}
                        address={`${propertyData.location}`}
                        imgurl={`${propertyData.imagpath}`}
                        favorite={`${propertyData.is_favorite}`}
                        userid={`${propertyData.userid}`}
                        onFavoritePressComplete={favoritePressComplete}
                      />
                    </View>
                  ))}
                </XStack>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


export function DemoCard(props: CardProps &
{ ptitle: string; pdescription: string; address: string, imgurl: string; favorite: string; pid: string, userid: string, onFavoritePressComplete: any }) {

  const { ptitle, pdescription, address, imgurl, favorite, pid, onFavoritePressComplete, userid, ...restProps } = props;

  const favoritePress = async () => {
    try {
      const response = await axiosInstance.post('storeuserfavorite', {
        'pid': pid,
        'userid': userid
      });
      if (response) {
        onFavoritePressComplete();
      } else {
        console.warn('Data is not Saved');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <TouchableOpacity>
      <Card bordered {...restProps} width={250}
        height={200} scale={1}
        // animation="bouncy"
        size="$2" borderRadius={10}>
        <Card.Header padded>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => favoritePress()} style={styles.favconatiner}>
              <Icon style={{ margin: 5 }} type={Icons.FontAwesome}
                name={favorite === 'true' ? 'heart' : 'heart-o'}
                color={favorite === 'true' ? 'gold' : 'white'}
                size={16} />
            </TouchableOpacity>
          </View>
        </Card.Header>
        <Card.Footer margin={6}>
          <View>
            <Text style={Styles.recttittxt}>{ptitle}</Text>
            <Text>{address}</Text>
          </View>
        </Card.Footer>
        <Card.Background style={styles.cardimgcontainer}>
          <Image
            resizeMethod="auto"
            style={styles.image}
            alignSelf="center"
            source={{
              uri: imgurl,
            }}
          />
          <Text style={{ position: 'absolute', bottom: 10, left: 8, fontWeight: '500', color: Colors.white }}>{pdescription}</Text>
        </Card.Background>
      </Card>
    </TouchableOpacity>
  )
}

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
    borderColor: 'blue',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  HSsearchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardimgcontainer: {
    width: 248,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 10,
  },
  reacttxtcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  favconatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000032',
    borderRadius: 15,
    width: 26,
    height: 26
  }
});
