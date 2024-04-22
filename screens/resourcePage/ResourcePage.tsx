import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon, { Icons } from '../../assets/Icon/Icons';
import Carousel from 'pinar';

const marginTopvar = StatusBar.currentHeight === undefined ? 0 : StatusBar.currentHeight;
const height = Dimensions.get('window').height;
export default function ResourcePage({ route, navigation }) {

  const [state, setState] = useState({
    ptitle: '',
    pdescription: '',
    address: '',
    imgurl: '',
    favorite: false,
    pid: '',
    userid: ''
  });



  const handleback = () => {
    navigation.pop();
  };

  const handfav = () => {
    console.log('favclick is prass');
  }

  const handleshareother = () => {
    console.log('favclick is prass')
  }

  const [images, setImages] = useState([]);

  useEffect(() => {
    const { ptitle, pdescription, address, imgurl, favorite, pid, userid } = route.params;
    setState({ ptitle, pdescription, address, imgurl, favorite, pid, userid });

    if (imgurl) {
      const imageUrlArray = imgurl.split(',');
      const imagesPromises = imageUrlArray.map((url: string, index: number) => ({
        name: `image${index + 1}`,
        img: url,
      }));
      setImages(imagesPromises);
    }
  }, [route.params]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <TouchableOpacity onPress={handleback} style={styles.iconcontainer}>
            <Icon
              size={34}
              type={Icons.FontAwesome}
              name={'angle-left'}
              style={styles.backbtn}
              color="green"
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity onPress={handfav} style={styles.iconcontainer}>
            <Icon
              size={28}
              type={Icons.MaterialIcons}
              name={'favorite-outline'}
              style={styles.backbtn}
              color="green"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleshareother} style={styles.iconcontainer}>
            <Icon
              size={28}
              type={Icons.AntDesign}
              name={'sharealt'}
              style={styles.backbtn}
              color="green"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          style={styles.carousel}
          showsControls={false}
          dotStyle={styles.dotStyle}
          dotsContainerStyle={styles.dotcontainerstyle}
          autoplay={true}
          autoplayInterval={3000}
          activeDotStyle={[styles.dotStyle, { backgroundColor: 'white' }]} >
          {images.map((img) => (
            <Image
              style={styles.image}
              source={{ uri: img.img || '' }}
              key={img.name} />
          ))}
        </Carousel>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <View style={{ marginTop: 10 }}>
          <Text>{state.ptitle}</Text>
          <Text style={{ fontSize: 30, fontWeight: 700, color: 'black' }}>INR 7.2 Core</Text>
          <Text>{state.address}</Text>
          <Text>{state.pdescription}</Text>
          <Text>{state.pdescription}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconcontainer: {
    backgroundColor: 'white',
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 14,
    marginTop: marginTopvar * 1.4,
    borderRadius: 10,
    zIndex: 1,
  },
  carousel: {
    height: '100%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  carouselContainer:
  {
    marginTop: -(marginTopvar * 3.4),
    height: (height - marginTopvar) / 2.5,
  },
  dotStyle: {
    width: 20,
    height: 6,
    backgroundColor: 'silver',
    marginHorizontal: 4,
    borderRadius: 3,
  },
  dotcontainerstyle: {
    backgroundColor: 'rgba(1,1,1,0.6)',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -30,
    width: 140,
    height: 20,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  }
});