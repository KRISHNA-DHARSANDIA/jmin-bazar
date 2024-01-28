/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions, Text, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
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

const { width } = Dimensions.get('window');

const HomeScreen = (props: any) => {

  const [propertyDataList, setPropertyDataList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const { navigation } = props;

  useFocusEffect(
    React.useCallback(() => {
      // Use setTimeout if needed, but wrap the fetchData call inside the useCallback
      const fetchDataWithTimeout = async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // 100 milliseconds timeout
        fetchData();
      };

      fetchDataWithTimeout();
    }, [])
  );

  const fetchData = async () => {
    setRefreshing(true);
    await axiosInstance.get('GetReactAddedFarms')
      .then(response => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handelSearch = () => {
    navigation.navigate(SearchUserData);
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
                uri: 'https://placekitten.com/200/300',
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
              <View>
                <TouchableOpacity>
                  <Text>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <XStack $sm={{ flexDirection: 'row' }} paddingHorizontal="$2" space>
                  {propertyDataList.map((propertyData, index) => (
                    <View key={index}>
                      <DemoCard
                        farmid={`${propertyData.farmid}`}
                        description={`${propertyData.description}`}
                        farmname={`${propertyData.farmname}`}
                        address={`${propertyData.address}`}
                        imgurl={`${propertyData.imagpath}`}
                        favorite={`${propertyData.favorite}`}
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
{ farmname: string; description: string; address: string, imgurl: string; favorite: string; farmid: string, onFavoritePressComplete: any }) {

  const { farmname, description, address, imgurl, favorite, farmid, onFavoritePressComplete, ...restProps } = props;

  const favoritePress = async (favfarmid: string) => {
    try {
      const response = await axiosInstance.post('storeuserfavorite', {
        farmid: favfarmid,
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
    <Card bordered {...restProps} width={250}
      height={200} scale={1}
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
