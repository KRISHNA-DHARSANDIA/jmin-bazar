/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useMemo, useCallback, useState, Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Separator, ToggleGroup, View, YStack, XStack, Button, ScrollView } from 'tamagui';
import Icon, { Icons } from '../../assets/Icon/Icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import SelectDropdown from 'react-native-select-dropdown';
import { Camera, Option, Image as img } from '@tamagui/lucide-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

//LottieView
import LottieView from 'lottie-react-native';

//ImagePicker
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

//ImageView
import ImageView from 'react-native-image-viewing';

//Firebase
import { utils } from '@react-native-firebase/app';
import storage, { firebase } from '@react-native-firebase/storage';


//APi
import axiosInstance from '../../axiosInstance';
//for log and let
import axios from 'axios';


const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const countries = ['Sq.Ft.', 'Sq.Meter', 'Acres', 'Hectares'];
const countrycode = ['+91', '+92'];

class AddProperty extends Component {

  bottomSheetRef = React.createRef();

  constructor(props) {
    super(props);

    this.StoreData = this.StoreData.bind(this);
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      isBottomSheetOpen: false,
      selectedCity: 'Rajkot',
      latitude: '0',
      longitude: '0',
      selectedLocation: 'Aji Dem',
      purpose: 'Sell',
      propertyTy: 'Residential Plot',
      areaSize: '',
      selectedUnit: 'Sq.Ft.',
      TotalPrice: '',
      title: '',
      desciption: '',
      email: '',
      phoneOne: '',
      phoneTwo: '',
      countrycodeph1: '+91',
      countrycodeph2: '+90',

      imgpathmobi: '',
      imgvisiblemobi: false,
      imgarrayPath: [],
      selectedImageIndex: 0,

      //other
      uploading: false,
      setTransferredImg: 0,
      dbImgStoreArr: []

    };
  }

  componentDidUpdate(prevProps) {
    const { route } = this.props;
    if (route !== prevProps.route && route.params) {
      const { params } = route;
      this.setState({ longitude: params.longitude.toString(), latitude: params.latitude.toString() });
    }
  }

  renderCustomDropdownIcon = () => {
    return (
      <Icon
        size={14}
        type={Icons.AntDesign}
        name={'caretdown'}
        style={styles.dropdownicon}
        color="green"
      />
    );
  };

  handlePurposeChnage = (value) => {
    this.setState({ purpose: value });
  };

  handlepropertyTychange = (value) => {
    this.setState({ propertyTy: value });
  };

  handleCitychange = () => {
    this.bottomSheetRef.current.expand();
    this.setState({ isBottomSheetOpen: true });
  };

  handleAreaSizeChange = (value) => {
    this.setState({ areaSize: value });
  };

  handleUnitChange = (unit) => {
    this.setState({ selectedUnit: unit });
  };

  handleTotalPriceChange = (price) => {
    this.setState({ TotalPrice: price });
  };

  handleTitleChange = (newtitle) => {
    this.setState({ title: newtitle });
  };

  handleDesciptionChange = (des) => {
    this.setState({ desciption: des });
  }

  handleEmailChnage = (value) => {
    this.setState({ email: value });
  };

  handlephoneoneChnage = (value) => {
    this.setState({ phoneOne: value });
  };

  handlephonetwoChnage = (value) => {
    this.setState({ phoneTwo: value });
  };

  handleph1countrycodeChnage = (value) => {
    this.setState({ countrycodeph1: value });
  };

  handleph2countrycodeChnage = (value) => {
    this.setState({ countrycodeph2: value });
  };

  //get location lat and log
  getLocation = async () => {
    try {
      const searchText = this.state.selectedCity;
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${searchText},Gujarat,india&apiKey=77133309d92c4352bd8c377cdf243e0c`
      );

      // Extracting latitude and longitude from response data
      if (response && response.data && response.data.features.length > 0) {
        const latitude = response.data.features[0].properties.lat;
        const longitude = response.data.features[0].properties.lon;
        return { latitude, longitude };
      } else {
        console.error('No location data found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }
  };

  handleMapClick = async () => {
    const { navigation } = this.props;
    try {
      const location = await this.getLocation();
      if (location) {
        const { latitude, longitude } = location;
        console.log(latitude, longitude);
        navigation.navigate('MapLocation', {
          lat: latitude,
          log: longitude,
        });
      } else {
        console.error('Location data is null.');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  handleRemoveImage = (indexToRemove) => {
    this.setState((prevState) => ({
      imgarrayPath: prevState.imgarrayPath.filter((_, index) => index !== indexToRemove),
    }));
  };

  handleImgfromGallery = async () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, (response) => {
      if (!response.didCancel) {
        const newImages = response.assets.map((asset) => ({ uri: asset.uri }));
        this.setState((prevState) => ({
          imgarrayPath: [...prevState.imgarrayPath, ...newImages],
        }));
      }
    });
  };

  handleimgFromCamera = async () => {
    launchCamera({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      if (!response.didCancel) {
        const newImages = response.assets.map((asset) => ({ uri: asset.uri }));
        this.setState((prevState) => ({
          imgarrayPath: [...prevState.imgarrayPath, ...newImages],
        }));
      }
    });
  };

  generateUniqueFileName = () => {
    const timestamp = new Date().getTime();
    return `image_${timestamp}`;
  };


  imageUpload = async () => {
    try {
      this.setState({ uploading: true });
      this.setState({ setTransferredImg: 0 });

      const { imgarrayPath } = this.state;
      const filepathinside = 'Images';

      await Promise.all(imgarrayPath.map(async (image) => {
        const UploadUri = image.uri;

        // Add TimeStamp to file Name for uniqueness
        let filename = UploadUri.substring(UploadUri.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        const storageRef = firebase.storage().ref(filepathinside).child(filename);
        const task = storageRef.putFile(UploadUri);

        task.on('state_changed', taskSnapshot => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        }, error => {
          console.error('Error uploading image:', error);
        });

        await task;
        const downloadURL = await storageRef.getDownloadURL();
        this.state.dbImgStoreArr.push(downloadURL);
      }));

      this.setState({ uploading: false });
    } catch (error) {
      console.log('Error uploading image:', error);
      this.setState({ uploading: false });
    }
  };

  StoreData = async () => {

    const { navigation } = this.props;

    //Upload the Images in FireBase
    await this.imageUpload();

    const imagepathAll = this.state.dbImgStoreArr.join(',');

    console.log(imagepathAll);

    // const phoneNumber = AsyncStorage.getItem('PhoneNumber');
    const uuid = await AsyncStorage.getItem('UUID');

    const propertyData = {
      'uuid': uuid,
      'purpose': this.state.purpose,
      'ptype': this.state.propertyTy,
      'city': this.state.selectedCity,
      'location': this.state.selectedLocation,
      'areasize': this.state.areaSize,
      'totalprice': this.state.TotalPrice,
      'possession': 'true',
      'ptitle': this.state.title,
      'pdescription': this.state.desciption,
      'email': this.state.email,
      'contectone': this.state.countrycodeph1 + this.state.phoneOne,
      'contecttwo': this.state.countrycodeph2 + this.state.phoneTwo,
      'logitude': this.state.longitude,
      'latitude': this.state.latitude,
      'coverimagepath': this.state.dbImgStoreArr[0],
      'imagePath': imagepathAll.toString(),
    };

    axiosInstance.post('storeproperty', propertyData)
      .then(response => {
        if (response.data === 'saved') {
          console.log('New Property added successfully');
        } else {
          console.warn('Data is not stored');
        }
        this.setState({ uploading: false });
        this.setState({ imgarrayPath: [] });
        console.log('all Done ⭐⭐⭐⭐');

        navigation.navigate('HomeScreen', {
        });
      })
      .catch(error => {
        console.error('Error when Data Store:', error);
      });
  };

  render() {

    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
      <>
        <View style={styles.fill}>
          {/* <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor="rgba(0, 0, 0, 0.251)"
          /> */}
          <Animated.ScrollView
            style={styles.fill}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true },
            )}
            contentInset={{
              top: HEADER_MAX_HEIGHT,
            }}
            contentOffset={{
              y: -HEADER_MAX_HEIGHT,
            }}
          >
            {/* <PropertyData /> */}
            <View style={[styles.scrollViewContent]}>
              <View style={styles.maincontainer}>
                <View>
                  <View style={styles.Togglecontainer}>
                    <View style={styles.infocontainer}>
                      <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialIcons} name="search" size={26} color={'gray'} />
                      </View>
                      <View>
                        <Text>Purpose</Text>
                      </View>
                    </View>
                    <View>
                      <ToggleGroup
                        type="single"
                        value={this.state.purpose}
                        onValueChange={this.handlePurposeChnage}
                        style={styles.ToggleGroup}
                      >
                        <YStack flexDirection="row" alignItems="center" space="$3">
                          <ToggleGroup.Item active={true} style={{}} value="Sell"><Text>Sell</Text></ToggleGroup.Item>
                          <ToggleGroup.Item style={{}} value="Rent Out"><Text>Rent Out</Text></ToggleGroup.Item>
                        </YStack>
                      </ToggleGroup>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.bigTogglecontainer}>
                    <View style={styles.infocontainer}>
                      <View style={styles.iconcontainer}>
                        <Icon style={styles.icon} type={Icons.MaterialIcons} name="search" size={26} color={'gray'} />
                      </View>
                      <View>
                        <Text>Select Property Type</Text>
                      </View>
                    </View>
                    <View>
                      <ToggleGroup
                        type="single"
                        style={styles.ToggleGroup}
                        value={this.state.propertyTy}
                        onValueChange={this.handlepropertyTychange}
                      >
                        <YStack flexDirection="column" space="$3">
                          <YStack flexDirection="row" alignItems="center" space="$3">
                            <ToggleGroup.Item value="Residential Plot"><Text>Residential Plot</Text></ToggleGroup.Item>
                            <ToggleGroup.Item value="Commercial Plot"><Text>Commercial Plot</Text></ToggleGroup.Item>
                          </YStack>
                          <YStack flexDirection="row" alignItems="center" space="$3">
                            <ToggleGroup.Item value="Agriculture Land"><Text>Agriculture Land</Text></ToggleGroup.Item>
                            <ToggleGroup.Item value="Industrial Land"><Text>Industrial Land</Text></ToggleGroup.Item>
                          </YStack>
                        </YStack>
                      </ToggleGroup>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.smallTogglecontainer}>
                    <View style={styles.infocontainer}>
                      <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialCommunityIcons} name="map-marker" size={22} color={'gray'} />
                      </View>
                      <TouchableOpacity style={styles.subcontainer} onPress={this.handleCitychange}>
                        <View>
                          <View>
                            <Text>City</Text>
                          </View>
                          <View>
                            <Text>{this.state.selectedCity}</Text>
                          </View>
                        </View>
                        <View>
                          <Icon style={{}} type={Icons.Entypo} name="chevron-right" size={16} color={'black'} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.largeTogglecontainer}>
                    <View>
                      <View style={styles.infocontainer}>
                        <View style={styles.iconcontainer}>
                          <Icon style={{}} type={Icons.MaterialCommunityIcons} name="map-marker" size={22} color={'gray'} />
                        </View>
                        <TouchableOpacity style={styles.subcontainer} onPress={this.handleCitychange}>
                          <View>
                            <View>
                              <Text>Location</Text>
                            </View>
                            <View>
                              <Text>{this.state.selectedLocation}</Text>
                            </View>
                          </View>
                          <View>
                            <Icon style={{}} type={Icons.Entypo} name="chevron-right" size={16} color={'black'} />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity onPress={this.handleMapClick}>
                          <Image
                            source={require('../../images/locationstatic.png')}
                            style={styles.staticimage}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.Togglecontainer}>
                    <View style={styles.infocontainer}>
                      <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialIcons} name="search" size={26} color={'gray'} />
                      </View>
                      <View>
                        <Text>Area Size</Text>
                      </View>
                    </View>
                    <View>
                      <XStack ai="center" flexDirection="row" justifyContent="space-between">
                        <View style={styles.inputtxtcontaienr}>
                          <TextInput
                            style={styles.inputtxtsize}
                            value={this.state.areaSize}
                            onChangeText={this.handleAreaSizeChange}
                            placeholder="Enter area size"
                            keyboardType="number-pad" />
                        </View>
                        <View>
                          <SelectDropdown
                            data={countries}
                            onSelect={(selectedItem, index) => {
                              this.handleUnitChange(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              return selectedItem;
                            }}
                            dropdownStyle={styles.dropdownstylmin}
                            buttonStyle={styles.dropdownbtn}
                            buttonTextStyle={styles.dropdownbtntxt}
                            defaultButtonText={this.state.selectedUnit}
                            renderDropdownIcon={this.renderCustomDropdownIcon}
                            dropdownIconPosition="right"
                            defaultValue={0}
                          />
                        </View>
                      </XStack>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.Togglecontainer}>
                    <View style={styles.infocontainer}>
                      <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialIcons} name="search" size={26} color={'gray'} />
                      </View>
                      <View>
                        <Text>Total Price</Text>
                      </View>
                    </View>
                    <View>
                      <XStack ai="center" flexDirection="row" justifyContent='space-between'>
                        <View style={styles.inputtxtcontaienr}>
                          <TextInput
                            style={styles.inputtxtprice}
                            onChangeText={this.handleTotalPriceChange}
                            value={this.state.TotalPrice}
                            placeholder="Enter amount"
                            keyboardType="number-pad"
                          />
                        </View>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginRight: 10, padding: 6 }}>
                          <Text style={{ fontSize: 16 }}>INR</Text>
                        </View>
                      </XStack>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.Togglecontainer}>
                    <View style={styles.infocontainer}>
                      <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialIcons} name="search" size={26} color={'gray'} />
                      </View>
                      <View>
                        <Text>Property Title</Text>
                      </View>
                    </View>
                    <View>
                      <XStack ai="center" flexDirection="row" justifyContent='space-between'>
                        <View style={styles.inputtxtcontaienr}>
                          <TextInput
                            style={styles.inputtxtnorm}
                            onChangeText={this.handleTitleChange}
                            value={this.state.Title}
                            placeholder="Enter Title eg. Beautiful new farm" />
                        </View>
                      </XStack>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.Togglecontainer}>
                    <View style={styles.infocontainer}>
                      <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialIcons} name="search" size={26} color={'gray'} />
                      </View>
                      <View>
                        <Text>Property Description</Text>
                      </View>
                    </View>
                    <View>
                      <XStack ai="center" flexDirection="row" justifyContent='space-between'>
                        <View style={styles.inputtxtcontaienr}>
                          <TextInput
                            style={styles.inputtxtnorm}
                            value={this.state.desciption}
                            onChangeText={this.handleDesciptionChange}
                            placeholder="Describe your property in detail" />
                        </View>
                      </XStack>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.Togglecontainerimg}>
                    <View style={styles.infocontainer}>
                      <View>
                        <View style={styles.iconcontainer}>
                          <Icon style={{}} type={Icons.MaterialIcons} name="search" size={26} color={'gray'} />
                        </View>
                      </View>
                      <View>
                        <View>
                          <Text>Upload images of Your property</Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <View marginLeft={45}>
                        <View>
                          <Text>Ads with pictures get 5x more views and leads</Text>
                          <Text>Upload good quailty picture with proper lighting</Text>
                          <Text>Cover all areas of your property</Text>
                        </View>
                        <YStack ai="center" flexDirection="column" space="$3" justifyContent="space-between" alignItems="center" borderStyle="dotted" borderWidth="$1" borderColor={'lightgreen'} padding="$2.5" width={300}>
                          <Button alignSelf="center" fontSize={15} color={'white'} icon={img} size="$4" width={"54%"} backgroundColor={'lightgreen'} onPress={this.handleImgfromGallery}>
                            From Gallery
                          </Button>
                          <Button alignSelf="center" fontSize={15} color={'lightgreen'} icon={Camera} size="$4" width={"54%"} variant="outlined" onPress={this.handleimgFromCamera}>
                            From Camera
                          </Button>
                        </YStack>
                        {/*  */}
                        <ScrollView horizontal>
                          <XStack flexDirection='row'>
                            {this.state.imgarrayPath.map((image, index) => (
                              <View>
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => this.setState({ imgvisiblemobi: true, selectedImageIndex: index })}
                                >
                                  <Image source={image} style={{ width: 100, height: 100, margin: 10 }} />
                                  <TouchableOpacity onPress={() => this.handleRemoveImage(index)} style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#e6eae7', width: 20, height: 20, borderRadius: 11, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon style={{}} type={Icons.AntDesign} name="close" size={14} color={'balck'} />
                                  </TouchableOpacity>
                                </TouchableOpacity>
                                {this.state.uploading &&
                                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>{this.state.setTransferredImg} % complited</Text>
                                    <ActivityIndicator size="large" color={'#0000ff'} />
                                  </View>
                                }
                              </View>
                            ))}
                          </XStack>
                        </ScrollView>
                        <ImageView
                          images={this.state.imgarrayPath}
                          visible={this.state.imgvisiblemobi}
                          imageIndex={this.state.selectedImageIndex}
                          onRequestClose={() => this.setState({ imgvisiblemobi: false })}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.Togglecontainer}>
                    <View style={styles.infocontainer}>
                      <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialIcons} name="search" size={26} color={'gray'} />
                      </View>
                      <View>
                        <Text>Email Address</Text>
                      </View>
                    </View>
                    <View>
                      <XStack ai="center" flexDirection="row" justifyContent='space-between'>
                        <View style={styles.inputtxtcontaienr}>
                          <TextInput
                            style={styles.inputtxtnorm}
                            value={this.state.email}
                            onChangeText={this.handleEmailChnage}
                            placeholder="Prediffent Email address" />
                        </View>
                      </XStack>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.Togglecontainer}>
                    <View style={styles.infocontainer}>
                      <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialIcons} name="search" size={26} color={'gray'} />
                      </View>
                      <View>
                        <Text>Contact Number</Text>
                      </View>
                    </View>
                    <View>
                      <YStack ai="center" flexDirection="column" justifyContent='space-between' >
                        <XStack ai="center" flexDirection="row" justifyContent='space-between' marginLeft={45}>
                          <SelectDropdown
                            data={countrycode}
                            onSelect={(selectedItem, index) => {
                              this.handleph1countrycodeChnage(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              return selectedItem;
                            }}
                            buttonStyle={styles.dropdownbtn}
                            buttonTextStyle={styles.dropdownbtntxt}
                            defaultButtonText={this.state.countrycodeph1}
                            renderDropdownIcon={this.renderCustomDropdownIcon}
                            dropdownIconPosition="right"
                            defaultValue={0}
                          />
                          <View>
                            <TextInput
                              style={styles.inputtxtph}
                              value={this.state.phoneOne}
                              onChangeText={this.handlephoneoneChnage}
                              placeholder="0xx xxx xxxx"
                              keyboardType="number-pad"
                            />
                          </View>
                        </XStack>
                        <XStack ai="center" flexDirection="row" justifyContent='space-between' marginLeft={45}>
                          <SelectDropdown
                            data={countrycode}
                            onSelect={(selectedItem, index) => {
                              this.handleph2countrycodeChnage(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              return selectedItem;
                            }}
                            buttonStyle={[styles.dropdownbtn]}
                            buttonTextStyle={styles.dropdownbtntxt}
                            defaultButtonText={this.state.countrycodeph2}
                            renderDropdownIcon={this.renderCustomDropdownIcon}
                            dropdownIconPosition="right"
                            defaultValue={0}
                          />
                          <View>
                            <TextInput
                              style={styles.inputtxtph}
                              value={this.state.phoneTwo}
                              onChangeText={this.handlephonetwoChnage}
                              placeholder="0xx xxx xxxx"
                              keyboardType="number-pad" />
                          </View>
                        </XStack>
                      </YStack>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Animated.ScrollView>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.header,
              { transform: [{ translateY: headerTranslate }] },
            ]}
          >
            <Animated.Image
              style={[
                styles.backgroundImage,
                {
                  opacity: imageOpacity,
                  transform: [{ translateY: imageTranslate }],
                },
              ]}
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMtNKejJpOzz_mev1tZEwXHT3Of54lEC-PiwoIsNIag&s' }}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.bar,
              {
                transform: [
                  { scale: titleScale },
                  { translateY: titleTranslate },
                ],
              },
            ]}
          >
            <Text style={styles.maintitle}>Post Property</Text>
            {/* <View style={{ width: 200 }}>
            <Text style={styles.subtitle}>Reach thousands of buyers and tenants in few steps.</Text>
          </View> */}
          </Animated.View>
          <View style={styles.bottombar}>
            <View flexDirection='row' justifyContent='space-between'>
              <Button size="$3" width={180} height={45} backgroundColor={"$backgroundTransparent"}>
                Save as Draft
              </Button>
              <Button size="$3" width={180} height={45} backgroundColor={"#00aa54"} color={'white'} onPress={this.StoreData}>
                Post Ad
              </Button>
            </View>
          </View>
        </View>
        <BScity
          bottomSheetRef={this.bottomSheetRef}
          setIsBottomSheetOpen={(value) => this.setState({ isBottomSheetOpen: value })}
          setSelectedCity={(city) => this.setState({ selectedCity: city })}
        />
        {/* Loading Animation */}
        {this.state.uploading &&
          <View style={styles.animationContainer}>
            <LottieView
              style={{ width: 150, height: 150 }}
              source={require('../../assets/Loading.json')}
              autoPlay
              loop
            />
          </View>
        }
      </>
    );
  }
};

const BScity = ({ bottomSheetRef, setIsBottomSheetOpen, setSelectedCity }) => {

  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const languages = [
    {
      id: 1,
      title: 'Patan',
    },
    {
      id: 2,
      title: 'Ahmedabad',
    },
    {
      id: 3,
      title: 'Surat',
    },
    {
      id: 4,
      title: 'JavaScript',
    },
    {
      id: 5,
      title: 'Rajkot',
    },
    {
      id: 6,
      title: 'Vadodara',
    },
    {
      id: 7,
      title: 'jamnagar',
    },
    {
      id: 8,
      title: 'junagadh',
    },
    {
      id: 9,
      title: 'jamnagar',
    },
    {
      id: 10,
      title: 'Morbi',
    },
  ];

  const [data, setData] = useState(languages);
  const [searchText, setSearchText] = useState('');

  const searchFunction = (text) => {
    setSearchText(text);
    text = text.toLowerCase();
    if (text === '') {
      setData(languages);
    }
    else {
      let filteredLanguages = languages.filter(language => (language.title.toLowerCase().startsWith(text)))
      setData(filteredLanguages);
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectCity(item)} style={styles.box}>
      <Text style={styles.title}> {item.title} </Text>
    </TouchableOpacity>
  );

  const selectCity = (item) => {
    setSelectedCity(item.title);
    bottomSheetRef.current.close();
    setIsBottomSheetOpen(false);
  }

  const renderBackdrop = useCallback((props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={1}
    />
  ), []);

  return (

    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <Text style={styles.Ctitlelist}> Programming Languages </Text>
      <View style={styles.CBScontentContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholderTextColor="black"
            placeholder="Search available languages"
            value={searchText}
            onChangeText={text => searchFunction(text)} />
        </View>
        <BottomSheetFlatList
          data={data}
          extraData={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </BottomSheet>
  )
}

export default AddProperty;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  maincontainer: {
    backgroundColor: '#ffffff',
  },
  leftContent: {
    flex: 1,
  },
  maintitle: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollViewContainer: {
    overflow: 'hidden',
  },
  subtitle: {
    color: '#ffff',
    fontWeight: 'bold',
  },
  rightImage: {
    resizeMode: 'cover',
  },
  Togglecontainer: {
    margin: 16,
    height: 'auto',
  },
  bigTogglecontainer: {
    margin: 16,
    height: 'auto',
  },
  largeTogglecontainer: {
    margin: 16,
    height: 'auto',
  },
  smallTogglecontainer: {
    margin: 16,
    height: 'auto',
  },
  Togglecontainerimg: {
    margin: 16,
    height: 'auto',
  },
  iconcontainer: {
    width: 40,
    height: 40,
    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 20,
  },
  infocontainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  ToggleGroup: {
    marginLeft: 45,
    backgroundColor: '#ffffff',
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
  },
  CBScontainer: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  CBScontentContainer: {
    flex: 1,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
    marginHorizontal: 20,
  },
  searchBarContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: 350,
    height: 50,
    borderWidth: 0.2,
    borderRadius: 3,
    borderColor: '#999999',
    backgroundColor: '#ffffff',
    marginTop: 10,
    paddingLeft: 4.5,
    fontSize: 18,
    color: 'black',
  },
  listDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  box: {
    width: 300,
    height: 50,
    borderWidth: 0.2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
  staticimage: {
    width: 300,
    height: 100,
    marginLeft: 45,
    borderRadius: 10,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 18,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputtxtcontaienr: {
    marginLeft: 45,
  },
  inputtxtsize: {
    width: 198,
    height: 45,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: 'black',
    marginBottom: 5,
  },
  dropdownbtn: {
    width: 100,
    height: 40,
    backgroundColor: 'transparent',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  dropdownbtntxt: {
    fontSize: 14,
  },
  inputtxtprice: {
    width: 287,
    height: 45,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  inputtxtnorm: {
    width: 325,
    height: 45,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  inputtxtph: {
    width: 200,
    height: 45,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: 'black',
    marginBottom: 5,
  },
  bottombar: {
    height: 'auto',
    justifyContent: 'center',
    padding: 10,
  },
  animationContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  }
});
