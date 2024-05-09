/* eslint-disable prettier/prettier */
import { SafeAreaView, Dimensions, StyleSheet, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { View, ScrollView, YStack, Image, Card, CardProps } from 'tamagui';
import React, { useState, useMemo, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import CustomHeader from '../components/customHeader/CustomHeader';

//APi
import axiosInstance from '../axiosInstance';

//Icon
import Icon, { Icons } from '../assets/Icon/Icons';

const { width } = Dimensions.get('window');

import Colors from '../constants/Colors';
import { Styles } from '../Styles/GetTamaguiStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

//bottom Sheet
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomeBottomSheet from '../components/BottomSheet/BottomSheetModel';


const UserLike = () => {

  const [propertyDataList, setPropertyDataList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLogin, setisLogin] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useFocusEffect(
    React.useCallback(() => {
      // Use setTimeout if needed, but wrap the fetchData call inside the useCallback

      const logincheck = async () => {
        const AysIsLogin = await AsyncStorage.getItem('LoginCheck');
        if (AysIsLogin !== null) {
          const result = JSON.parse(AysIsLogin);
          if (result === true) { setisLogin(true); }
        }
        else {
          setisLogin(false);
          setPropertyDataList([]); // Empty The Old data after logout
          bottomSheetRef.current?.present();
        }
      };

      //make Promise check login or not 
      logincheck().then(() => {
        if (isLogin === true) {
          const fetchDataWithTimeout = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second
            fetchData();
          };
          fetchDataWithTimeout();
        }
        else {
          console.log('currly use is not login ');
        }
      });

    }, [isLogin])
  );

  const fetchData = async () => {
    setRefreshing(true);
    const uuid = await AsyncStorage.getItem('UUID');
    await axiosInstance.post('getusefavoritefarm', {
      'uuid': uuid
    }).then(response => {
      const dataList = response.data;
      if (dataList && dataList.length > 0) {
        setPropertyDataList(dataList);
      } else {
        console.log('Empty data received from the API');
        setPropertyDataList([]);
      }
    })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }

  useMemo(() => {
    if (isLogin) {
      fetchData();
    }
  }, [isLogin]);

  const onRefresh = () => {
    if (isLogin) {
      setRefreshing(true);
      fetchData();
    }
  };

  const favoritePressComplete = () => {
    fetchData();
  };

  return (
    <SafeAreaView style={Styles.container}>
      <CustomHeader title="Shortlists" />
      <ScrollView contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <YStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$2" space>
          {propertyDataList.map((propertyData, index) => (
            <DemoCard
              key={index}
              curruid={`${propertyData.curruserid}`}
              pid={`${propertyData.pid}`}
              description={`${propertyData.pdescription}`}
              farmname={`${propertyData.ptitle}`}
              address={`${propertyData.address}`}
              imgurl={`${propertyData.coverimagepath}`}
              favorite={`${'true'}`}
              onFavoritePressComplete={favoritePressComplete}
            />
          ))}
        </YStack>
      </ScrollView>
      <CustomeBottomSheet ref={bottomSheetRef} />
    </SafeAreaView>
  )
}

export function DemoCard(props: CardProps &
{ farmname: string; description: string; address: string, imgurl: string; favorite: string; pid: string, curruid: string, onFavoritePressComplete: any }) {

  const { farmname, description, address, imgurl, favorite, pid, onFavoritePressComplete, curruid, ...restProps } = props;

  const favoritePress = async (favpid: string) => {
    try {
      const response = await axiosInstance.post('storeuserfavorite', {
        userid: curruid,
        pid: favpid
      });
      if (response.status === 200) {
        console.log('scuesss');
        onFavoritePressComplete();
      } else {
        console.warn('Data is not Saved');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <Card bordered {...restProps} width={width - 20}
      height={260} scale={1}
      // animation="bouncy"
      size="$2" borderRadius={10}>
      <Card.Header padded>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => favoritePress(pid)} style={styles.favconatiner}>
            <Icon style={{ margin: 5 }} type={Icons.FontAwesome}
              name={favorite === 'true' ? 'heart' : 'heart-o'}
              color={favorite === 'true' ? 'gold' : 'white'}
              size={16} />
          </TouchableOpacity>
        </View>
      </Card.Header>
      <Card.Footer margin={6}>
        <View>
          <Text style={Styles.recttittxt}>{farmname}</Text>
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
        <Text style={{ position: 'absolute', bottom: 10, left: 8, fontWeight: '500', color: Colors.white }}>{description}</Text>
      </Card.Background>
    </Card>
  )
}

export default UserLike
const styles = StyleSheet.create({
  cardimgcontainer: {
    width: width - 20,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    // backgroundColor: 'red'
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
    flexGrow: 1,
    paddingVertical: 10,
  },
  favconatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000032',
    borderRadius: 15,
    width: 26,
    height: 26,
  },
});