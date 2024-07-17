/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useMemo, useCallback, useState, Component, forwardRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Dimensions,
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

import { styled } from 'tamagui';

//get current with of device
const { width } = Dimensions.get('window');

//LottieView
import LottieView from 'lottie-react-native';

//ImagePicker
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

//ImageView
import ImageView from 'react-native-image-viewing';

//Firebase
import { firebase } from '@react-native-firebase/storage';

//Custom ToogleGropItem
import { MyToggleGroupItem } from '../../components/customComponent/CustomComponent';

//APi
import axiosInstance from '../../axiosInstance';

//for log and let
import axios from 'axios';


const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const countries = ['Sq.Ft.', 'Sq.Meter', 'Acres', 'Hectares'];
const countrycode = ['+91', '+92'];

// const MyToggleGroupItem = styled(ToggleGroup.Item,
//   {
//     backgroundColor: 'rgb(245, 245, 245)',
//     paddingVertical: 14,
//     paddingHorizontal: 22,
//     variants: {
//       active: {
//         true: {
//           backgroundColor: 'rgb(231, 243, 239)',
//           borderColor: 'rgb(23, 162, 96)',
//           borderWidth: 1.7,
//         },
//       },
//     },
//   });

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
      pid: 0,
      selectedCity: 'Rajkot',
      latitude: '0',
      longitude: '0',
      selectedLocation: '',
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
      dbImgStoreArr: [],

      min_lat: 70.6428377,
      max_lat: 22.1453263,
      min_lon: 70.9628377,
      max_lon: 22.4653263,

      latitude_min: 22.3053263,
      logitude_min: 70.8028377,

      AreaName: [],
      btdata: [],
      currdttype: 'city',

      issubmit: false,
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const params = route.params;

    if (params !== undefined) {
      const pdata = params[0];
      if (pdata) {

        //make fromatted image path
        const imagePathString = pdata.imagpath;

        let imagePathArray, copeimagePathArray;

        if (imagePathString) {
          if (imagePathString.includes(',')) {
            imagePathArray = imagePathString.split(',').map(path => path.trim());
            copeimagePathArray = imagePathArray; //crete cope of normal array which is used in feature check 
            imagePathArray = imagePathArray.map(url => ({ uri: url }));
          } else {
            // If there's only one path, put it into an array
            imagePathArray = [{ uri: imagePathString }];
            copeimagePathArray = [imagePathString];
          }
        } else {
          // Handle the case where imagePathString is undefined or null
          console.error('imagePathString is undefined or null');
          imagePathArray = [];
          copeimagePathArray = [];
        }

        const formattedUrls = imagePathArray;

        this.setState({
          pid: pdata.pid,
          purpose: pdata.purpose,
          propertyTy: pdata.ptype,
          selectedCity: pdata.city,
          selectedLocation: pdata.location,
          areaSize: pdata.areasize.toString(),
          TotalPrice: pdata.totalprice.toString(),
          title: pdata.ptitle,
          desciption: pdata.pdescription,
          imgarrayPath: formattedUrls,//array
          email: pdata.email,
          phoneOne: pdata.contectone.slice(3),
          phoneTwo: pdata.contecttwo.slice(3),
          logitude_min: pdata.longitude,
          latitude_min: pdata.latitude,
          dbImgStoreArr: copeimagePathArray,
        });
      }
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


  componentDidUpdate(prevProps) {
    const { route } = this.props;
    if (prevProps.route.params?.selectedLocation !== route.params?.selectedLocation) {
      const location = route.params.selectedLocation;
      if (location) {
        console.log(this.props);
        this.setState({ longitude: location.longitude.toString(), latitude: location.latitude.toString() });
      }
    }
  }

  handlePurposeChnage = (value) => {
    this.setState({ purpose: value });
    console.log(value);
  };

  handlepropertyTychange = (value) => {
    this.setState({ propertyTy: value });
  };

  handleCitychange = async () => {
    const languages = [
      'Patan',
      'Ahmedabad',
      'Surat',
      'Rajkot',
      'Vadodara',
      'jamnagar',
      'junagadh',
      'jamnagar',
      'Morbi',
    ];

    this.setState({ btdata: languages });
    this.setState({ currdttype: 'city' });

    this.bottomSheetRef.current.expand();
    this.setState({ isBottomSheetOpen: true });
  };

  handleAreachange = async () => {
    await this.handleAreaLocation();
    this.setState({ currdttype: 'Area' });
    this.setState({ btdata: this.state.AreaName });
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

        this.setState({
          logitude_min: response.data.features[0].properties.lon,
          latitude_min: response.data.features[0].properties.lat,
        });


        this.setState({
          min_lat: response.data.features[0].bbox[0],
          max_lat: response.data.features[0].bbox[1],
          min_lon: response.data.features[0].bbox[2],
          max_lon: response.data.features[0].bbox[3],
        });

      } else {
        console.error('No location data found.');
      }
    } catch (error) {
      console.error('Error fetching data in getLocation:', error.message);
    }
  };

  handleback = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  handleAreaLocation = async () => {
    try {
      const min_lat = this.state.min_lat,
        max_lat = this.state.max_lat,
        min_lon = this.state.min_lon,
        max_lon = this.state.max_lon;

      console.log(min_lon, min_lat, max_lon, max_lat);

      const response = await axios.get(
        `https://api.geoapify.com/v2/places?categories=highway.residential&filter=rect:${min_lat},${max_lat},${min_lon},${max_lon}&limit=20&apiKey=77133309d92c4352bd8c377cdf243e0c`
      );

      this.state.AreaName = [];
      if (response && response.data && response.data.features.length > 0) {
        response.data.features.forEach(feature => {
          if (feature.properties.name !== undefined && feature.properties.name !== '') {
            this.state.AreaName.push(feature.properties.name);
          }
        });
        console.log(this.state.AreaName);
      } else {
        console.error('No Location Area not data found.');
      }
    } catch (error) {
      console.error('Error fetching data in AreaLocation:', error.message);
    }
  };

  handleMapClick = async () => {
    const { navigation } = this.props;
    try {
      const lat_min = this.state.latitude_min;
      const log_min = this.state.logitude_min;
      if (lat_min && log_min) {
        navigation.navigate('MapLocation', {
          lat: lat_min,
          log: log_min,
          previousScreen: 'AddProperty',
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


  imageUpload = async () => {
    try {
      this.setState({ uploading: true });
      this.setState({ setTransferredImg: 0 });

      const { imgarrayPath, dbImgStoreArr } = this.state;
      const filepathinside = 'Images';

      // Track which images to delete
      const imagesToDelete = [];

      console.log('this is currnet selected image');
      console.log(imgarrayPath);
      console.log('⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐');

      console.log('this is dbImgSTore');

      // Loop through existing paths to check for deletions
      dbImgStoreArr.forEach((existingPath, index) => {
        // Extract filename from existing path
        const filename = existingPath;

        console.log(filename);
        console.log('-------------');

        if (!imgarrayPath.some(image => image.uri.includes(filename))) {
          // If existing path is not in the new paths, mark it for deletion
          imagesToDelete.push(existingPath);
          // Remove the corresponding path from dbImgStoreArr
          dbImgStoreArr.splice(index, 1);

          console.log('delete this imge from firebase ' + imagesToDelete);
        }
      });

      // Delete images marked for deletion from Firebase Storage
      await Promise.all(imagesToDelete.map(async (path) => {
        // Extract filename from path
        // const filename = path.substring(path.lastIndexOf('/') + 1);
        // const storageRef = firebase.storage().ref(filepathinside).child(filename);
        // // Delete the file
        // await storageRef.delete();

        try {
          const fileUrl = path;
          const fileRef = firebase.storage().refFromURL(fileUrl);
          const exist = await fileRef.getMetadata();

          if (exist) {
            // Delete the file
            await fileRef.delete().then(() => {
              console.log('File Deleted from Addperoperty whcih remove by user');
            });
          }
        }
        catch (error) {
          if (error.code === 'storage/object-not-found') {
            console.log('File does not exist.');
          } else {
            console.error('Error deleting file:', error);
          }
        }
      }));

      // Upload new or updated images
      await Promise.all(imgarrayPath.map(async (image, index) => {
        const existingPath = dbImgStoreArr[index];
        const newImagePath = image.uri;

        if (!existingPath || !existingPath.includes(newImagePath)) {
          // Add TimeStamp to file Name for uniqueness
          let filename = newImagePath.substring(newImagePath.lastIndexOf('/') + 1);
          const extension = filename.split('.').pop();
          const name = filename.split('.').slice(0, -1).join('.');
          filename = name + Date.now() + '.' + extension;

          // Upload new image to Firebase Storage
          const storageRef = firebase.storage().ref(filepathinside).child(filename);
          const task = storageRef.putFile(newImagePath);

          task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
          }, error => {
            console.error('Error uploading image:', error);
          });

          await task;
          const downloadURL = await storageRef.getDownloadURL();
          //this.state.dbImgStoreArr.push(downloadURL);
          dbImgStoreArr[index] = downloadURL;
        }
      }));

      this.setState({ uploading: false });
    } catch (error) {
      console.log('Error uploading image:', error);
      this.setState({ uploading: false });
    }
  };

  StoreData = async () => {

    const { navigation } = this.props;

    this.setState({ issubmit: true });

    if (this.state.selectedLocation !== '' && this.state.areaSize !== '' && this.state.TotalPrice !== ''
      && this.state.title !== '' && this.state.desciption !== '' && this.state.imgarrayPath.length !== 0
      && (this.state.phoneOne !== '' || this.state.phoneTwo !== '')) {

      //Upload the Images in FireBase
      await this.imageUpload();

      const imagepathAll = this.state.dbImgStoreArr.join(',');

      // const phoneNumber = AsyncStorage.getItem('PhoneNumber');
      const uuid = await AsyncStorage.getItem('UUID');

      const pdata = {
        'pid': this.state.pid,
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
        'logitude': this.state.logitude_min.toString(),
        'latitude': this.state.latitude_min.toString(),
        'coverimagepath': this.state.dbImgStoreArr[0],
        'imagePath': imagepathAll.toString(),
      };

      axiosInstance.post('storeproperty', pdata)
        .then(response => {
          if (response.data === 'saved') {
            console.log('New Property added successfully');
          } else {
            console.warn('Data is not stored');
          }
          this.setState({ uploading: false });
          this.setState({ imgarrayPath: [] });
          console.log('all Done ⭐⭐⭐⭐');

          //navigation.navigate('HomeTab', {});
          navigation.pop();
        })
        .catch(error => {
          console.error('Error when Data Store:', error);
        });
    }
    else {
      console.log('some are filed are remain');
    }
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
      outputRange: [0.9, 0.9, 0.9],
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
                        <Icon style={{}} type={Icons.Feather} name="check-circle" size={20} color={'gray'} />
                      </View>
                      <View>
                        <Text>Purpose</Text>
                      </View>
                    </View>
                    <View>
                      <ToggleGroup
                        type="single"
                        // value={this.state.purpose}
                        onValueChange={this.handlePurposeChnage}
                        style={styles.ToggleGroup}
                        disableDeactivation={true}
                      >
                        <YStack flexDirection="row" alignItems="center" space="$3">
                          <MyToggleGroupItem
                            active={this.state.purpose === 'Sell' ? true : false} style={{}} value="Sell">
                            <Text
                              style={this.state.purpose === 'Sell' ? { color: 'rgb(23, 162, 96)' } : { color: 'rgb(34, 34, 34)' }}
                            >Sell</Text>
                          </MyToggleGroupItem>
                          <MyToggleGroupItem
                            active={this.state.purpose === 'Rent Out' ? true : false}
                            style={{}} value="Rent Out">
                            <Text
                              style={this.state.purpose === 'Rent Out' ? { color: 'rgb(23, 162, 96)' } : { color: 'rgb(34, 34, 34)' }}
                            >Rent Out</Text>
                          </MyToggleGroupItem>
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
                        <Icon style={styles.icon} type={Icons.MaterialIcons} name="search" size={22} color={'gray'} />
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
                        disableDeactivation={true}
                      >
                        <YStack flexDirection="column" space="$3">
                          <YStack flexDirection="row" alignItems="center" space="$3">
                            <MyToggleGroupItem
                              value="Residential Plot"
                              active={this.state.propertyTy === 'Residential Plot' ? true : false}
                            >
                              <Text
                                style={this.state.propertyTy === 'Residential Plot' ? { color: 'rgb(23, 162, 96)' } : { color: 'rgb(34, 34, 34)' }}>Residential Plot</Text></MyToggleGroupItem>
                            <MyToggleGroupItem
                              value="Commercial Plot"
                              active={this.state.propertyTy === 'Commercial Plot' ? true : false}
                            >
                              <Text
                                style={this.state.propertyTy === 'Commercial Plot' ? { color: 'rgb(23, 162, 96)' } : { color: 'rgb(34, 34, 34)' }}>Commercial Plot</Text></MyToggleGroupItem>
                          </YStack>
                          <YStack flexDirection="row" alignItems="center" space="$3">
                            <MyToggleGroupItem value="Agriculture Land"
                              active={this.state.propertyTy === 'Agriculture Land' ? true : false}
                            >
                              <Text
                                style={this.state.propertyTy === 'Agriculture Land' ? { color: 'rgb(23, 162, 96)' } : { color: 'rgb(34, 34, 34)' }}>Agriculture Land</Text></MyToggleGroupItem>
                            <MyToggleGroupItem
                              value="Industrial Land"
                              active={this.state.propertyTy === 'Industrial Land' ? true : false}
                            ><Text
                              style={this.state.propertyTy === 'Industrial Land' ? { color: 'rgb(23, 162, 96)' } : { color: 'rgb(34, 34, 34)' }}>Industrial Land</Text></MyToggleGroupItem>
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
                        <View style={[styles.iconcontainer, (this.state.selectedLocation === '' && this.state.issubmit === true) ? { borderColor: 'red' } : {}]}>
                          <Icon style={{}} type={Icons.Feather} name="map" size={22} color={'gray'} />
                        </View>
                        <TouchableOpacity style={styles.subcontainer} onPress={this.handleAreachange}>
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
                      <View style={[styles.iconcontainer, (this.state.areaSize === '' && this.state.issubmit === true) ? { borderColor: 'red' } : {}]}>
                        <Icon style={{}} type={Icons.Ionicons} name="resize" size={22} color={'gray'} />
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
                      <View style={[styles.iconcontainer, (this.state.TotalPrice === '' && this.state.issubmit === true) ? { borderColor: 'red' } : {}]}>
                        <Icon style={{}} type={Icons.Ionicons} name="pricetag-outline" size={22} color={'gray'} />
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
                      <View style={[styles.iconcontainer, (this.state.title === '' && this.state.issubmit === true) ? { borderColor: 'red' } : {}]}>
                        <Icon style={{}} type={Icons.MaterialCommunityIcons} name="format-title" size={22} color={'gray'} />
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
                            value={this.state.title}
                            placeholder="Enter Title eg. Beautiful farm" />
                        </View>
                      </XStack>
                    </View>
                  </View>
                </View>
                <Separator marginVertical={1} marginLeft={65} marginRight={20} />
                <View>
                  <View style={styles.Togglecontainer}>
                    <View style={styles.infocontainer}>
                      <View style={[styles.iconcontainer, (this.state.desciption === '' && this.state.issubmit === true) ? { borderColor: 'red' } : {}]}>
                        <Icon style={{}} type={Icons.MaterialIcons} name="subtitles" size={22} color={'gray'} />
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
                        <View style={[styles.iconcontainer, (this.state.imgarrayPath.length === 0 && this.state.issubmit === true) ? { borderColor: 'red' } : {}]}>
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
                          <Button alignSelf="center" fontSize={15} color={'white'} icon={img} size="$4" width={'60%'} scaleIcon={1.4} backgroundColor={'lightgreen'} onPress={this.handleImgfromGallery}>
                            From Gallery
                          </Button>
                          <Button alignSelf="center" fontSize={15} color={'lightgreen'} icon={Camera} size="$4" width={'60%'} scaleIcon={1.4} variant="outlined" onPress={this.handleimgFromCamera}>
                            From Camera
                          </Button>
                        </YStack>
                        {/*  */}
                        <ScrollView horizontal>
                          <XStack flexDirection="row">
                            {this.state.imgarrayPath.length > 0 && this.state.imgarrayPath.map((image, index) => (
                              <View>
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => this.setState({ imgvisiblemobi: true, selectedImageIndex: index })}
                                >
                                  <Image source={image} style={{ width: 100, height: 100, margin: 10 }} />
                                  <TouchableOpacity onPress={() => this.handleRemoveImage(index)} style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#e6eae7', width: 20, height: 20, borderRadius: 11, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon style={{}} type={Icons.AntDesign} name="close" size={14} color={'black'} />
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
                      <View style={[styles.iconcontainer, (this.state.email === '' && this.state.issubmit === true) ? { borderColor: 'red' } : {}]}>
                        <Icon style={{}} type={Icons.MaterialCommunityIcons} name="email-outline" size={22} color={'gray'} />
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
                      <View style={[styles.iconcontainer, (
                        (this.state.phoneOne === '' && this.state.phoneTwo === '')
                        && this.state.issubmit === true) ? { borderColor: 'red' } : {}]}>
                        <Icon style={{}} type={Icons.AntDesign} name="contacts" size={26} color={'gray'} />
                      </View>
                      <View>
                        <Text>Contact Number</Text>
                      </View>
                    </View>
                    <View>
                      <YStack ai="center" flexDirection="column" justifyContent='space-between'>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{ backgroundColor: '#00aa54', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }} onPress={this.handleback}>
                <Icon style={{}} type={Icons.Ionicons} name="arrow-back" size={30} color={'white'} />
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.maintitle}>Post Property</Text>
              </View>
            </View>
            {/* <View style={{ width: 200 }}>
            <Text style={styles.subtitle}>Reach thousands of buyers and tenants in few steps.</Text>
          </View> */}
          </Animated.View>
          <View style={styles.bottombar}>
            <View flexDirection='row' justifyContent='space-between'>
              {/* <Button size="$3" width={180} height={45} backgroundColor={"$backgroundTransparent"}>
                Save as Draft
              </Button> */}
              <Button size="$3" width={width - 26} height={45} fontSize={16} backgroundColor={'#00aa54'} color={'white'} onPress={this.StoreData}>
                Post Property Advertisement
              </Button>
            </View>
          </View>
        </View>
        <BScity
          bottomSheetRef={this.bottomSheetRef}
          setIsBottomSheetOpen={(value) => this.setState({ isBottomSheetOpen: value })}
          setSelectedCity={async (loc) => {
            if (await this.state.currdttype === 'city') {
              this.setState({ selectedCity: loc });
              await this.getLocation();
              await this.handleAreaLocation();
            } else {
              this.setState({ selectedLocation: loc });
            }
          }}
          setBtData={this.state.btdata}
          type={this.currdttype}
          ref={this.bottomSheetRef}
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

const BScity = forwardRef((props, ref) => {

  const snapPoints = useMemo(() => ['50%', '90%'], []);
  let languages;
  const [data, setData] = useState(languages);
  const [searchText, setSearchText] = useState('');

  setTimeout(() => {
    setData(props.setBtData);
    languages = props.setBtData;
  }, 0);

  const searchFunction = (text) => {
    setSearchText(text);
    text = text.toLowerCase();
    if (text === '') {
      setData(languages);
    }
    else {
      let filteredLanguages = languages.filter(language => (language.toLowerCase().startsWith(text)));
      setData(filteredLanguages);
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectitm(item)} style={styles.box}>
      <Text style={styles.title}> {item} </Text>
    </TouchableOpacity>
  );

  const selectitm = (item) => {
    props.setSelectedCity(item);
    props.bottomSheetRef.current.close();
    props.setIsBottomSheetOpen(false);
  };


  const renderBackdrop = useCallback((propsrd) => (
    <BottomSheetBackdrop
      {...propsrd}
      disappearsOnIndex={-1}
      appearsOnIndex={1}
    />
  ), []);

  return (

    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <Text style={styles.Ctitlelist}> Location </Text>
      <View style={styles.CBScontentContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholderTextColor="black"
            placeholder="Search available Location"
            value={searchText}
            onChangeText={text => searchFunction(text)} />
        </View>
        <BottomSheetFlatList
          data={data}
          extraData={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${JSON.stringify(item)}`}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </BottomSheet>
  );
});

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
    borderWidth: 1,
    borderColor: 'transparent'
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
    borderRadius: 42,
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
  },
});
