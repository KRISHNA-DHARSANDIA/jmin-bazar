/* eslint-disable prettier/prettier */
import { SafeAreaView, Dimensions, StyleSheet, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { View, ScrollView, YStack, Image, Card, CardProps } from 'tamagui';
import React, { useState,useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import CustomHeader from '../components/customHeader/CustomHeader';

//APi
import axiosInstance from '../axiosInstance';

//Icon
import Icon, { Icons } from '../assets/Icon/Icons';

const { width } = Dimensions.get('window');

import Colors from '../constants/Colors';
import { Styles } from '../Styles/GetTamaguiStyles';

const UserLike = () => {

  const [propertyDataList, setPropertyDataList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

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
    setRefreshing(true);
    await axiosInstance.get('getusefavoritefarm')
      .then(response => {
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
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
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
              farmid={`${propertyData.farmid}`}
              description={`${propertyData.description}`}
              farmname={`${propertyData.farmname}`}
              address={`${propertyData.address}`}
              imgurl={`${propertyData.imagpath}`}
              favorite={`${propertyData.favorite}`}
              onFavoritePressComplete={favoritePressComplete}
            />
          ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

export function DemoCard(props: CardProps &
{ farmname: string; description: string; address: string, imgurl: string; favorite: string; farmid: string, onFavoritePressComplete: any }) {

  const { farmname, description, address, imgurl, favorite, farmid, onFavoritePressComplete, ...restProps } = props;

  const favoritePress = async (favfarmid: string) => {
    try {
      const response = await axiosInstance.post('storeuserfavorite', {
        farmid: favfarmid,
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
          <TouchableOpacity onPress={() => favoritePress(farmid)} style={styles.favconatiner}>
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
    backgroundColor: 'red'
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