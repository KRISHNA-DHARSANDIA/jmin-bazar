/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useRef } from 'react';
import { StyleSheet, Dimensions, Text, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { Crosshair, Airplay, AirVent, Brain, CloudSunRain } from '@tamagui/lucide-icons';
import { View, ScrollView, Button, XStack, YStack, Image, Card, CardProps } from 'tamagui';
import { useFocusEffect } from '@react-navigation/native';

//Icon
import Icon, { Icons } from '../../assets/Icon/Icons';

//component
import Navbar from '../../components/NavbarTop/Navbar';
// import SearchUserData from '../searchUserData/SearchUserData';
import Colors from '../../constants/Colors';
import { Styles } from '../../Styles/GetTamaguiStyles';

//APi
import axiosInstance from '../../axiosInstance';

//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
//import AddProperty from '../addProperty/AddProperty';
import SearchUserData from '../searchUserData/SearchUserData';

//RecentAdd Card
import RecentCard from './RecentCard';

//bottom Sheet
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import CustomeBottomSheet from '../../components/BottomSheet/BottomSheetModel';

const { width } = Dimensions.get('window');

const HomeScreen = (props: any) => {

  const [propertyDataList, setPropertyDataList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const { navigation } = props;

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isFavPress, setIsFavPress] = useState<boolean>(false);

  const { dismissAll, dismiss } = useBottomSheetModal();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedLoginCheck = await AsyncStorage.getItem('LoginCheck');
        console.log(storedLoginCheck + ' Login value');
        if (storedLoginCheck !== null) {
          const result = JSON.parse(storedLoginCheck);
          if (result === true) {
            setIsLogin(result);
          } else {
            setIsLogin(false);
          }
        } else {
          setIsLogin(false);
        }

        fetchData();
      } catch (error) {
        console.error('Error checking login status: ', error);
        setIsLogin(false);
      }
    };

    checkLoginStatus();
  }, []);

  // useFocusEffect(() => {
  //   const fetchFavPressValue = async () => {
  //     const savedFavPress = await AsyncStorage.getItem('FavPrass');
  //     if (savedFavPress === 'true') {
  //       setIsFavPress(true);
  //     } else {
  //       setIsFavPress(false);
  //     }
  //   };
  //   fetchFavPressValue();
  // });


  const fetchData = async () => {
    const phoneNumber = await AsyncStorage.getItem('PhoneNumber');
    if (phoneNumber !== undefined) {
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
      }).catch(error => {
        console.error('Error fetching data:', error);
      }).finally(() => {
        setRefreshing(false);
      }
      );
    }
  };

  useMemo(() => {
    if (isFavPress) {
      fetchData();
    }
  }, [isFavPress]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handelSearch = () => {
    navigation.navigate(SearchUserData);
  };

  const favoritePressComplete = () => {
    fetchData();
  };

  const handelBuybtn = () => {
    console.log('buy button is clicked');
    bottomSheetRef.current?.present();
  }

  const handleType = (type: string) => {
    switch (type) {
      case 'buy':
        handelBuybtn();
        break;
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,255)', marginHorizontal: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <Navbar />
        </View>
        <View>
          <View>
            <YStack paddingVertical={12} paddingHorizontal={12} space="$3" {...props}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <XStack space={10} justifyContent="space-between">
                  <Button onPress={() => handleType('buy')} alignSelf="center"
                    icon={Airplay} size={'$3'} height={40} backgroundColor={'$bglight_2'}>
                    Buy
                  </Button>
                  <Button onPress={() => handleType('Rent')} height={40} alignSelf="center" icon={Crosshair} size="$3"
                    backgroundColor={'$bglight_2'}>
                    Rent
                  </Button>
                  <Button onPress={() => handleType('Plot / Land')} height={40} alignSelf="center" icon={AirVent} size="$3" backgroundColor={'$bglight_2'}>
                    Plot / Land
                  </Button>
                  <Button onPress={() => handleType('Co-working Spaces')} height={40} alignSelf="center" icon={Brain} size="$3" backgroundColor={'$bglight_2'}>
                    Co-working Spaces
                  </Button>
                  <Button onPress={() => handleType('Buy Commercial')} height={40} alignSelf="center" icon={CloudSunRain} size="$3" backgroundColor={'$bglight_2'}>
                    Buy Commercial
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
                <Text style={{ marginLeft: 10, fontWeight: '900', fontSize: 14 }}>Search   </Text>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>City, Location, Project, Landmark</Text>
              </View>
              <Icon style={{ marginRight: 10 }} type={Icons.MaterialIcons} name="search" size={30} color={Colors.primary} />
            </View>
          </View>
          {/* Recently */}
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
                      <RecentCard
                        propertyData={propertyData}
                        onFavoritePressComplete={favoritePressComplete}
                        navigation={navigation}
                        isLogin={isLogin}
                      />
                    </View>
                  ))}
                </XStack>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <CustomeBottomSheet ref={bottomSheetRef} />
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
    backgroundColor: 'rgba(246,247,252,255)',
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
