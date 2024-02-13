/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
//import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon, { Icons } from '../../assets/Icon/Icons';
import { ChevronRight, MessageSquare, Settings, Star, LogIn, LogOut, Lock, } from '@tamagui/lucide-icons';
import {
  ListItem,
  Separator,
  XStack,
  YGroup,
} from 'tamagui';
import { Styles } from '../../Styles/GetTamaguiStyles';


//Alert 
import { useToast } from "react-native-toast-notifications";

//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//bottom Sheet
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';

//Header
import CustomHeader from '../../components/customHeader/CustomHeader';
import CustomeBottomSheet from '../../components/BottomSheet/BottomSheetModel';

import { RouteProp } from '@react-navigation/native';

//API
import axiosInstance from '../../axiosInstance';
import Colors from '../../constants/Colors';

// Define the types for  navigation stack
type RootStackParamList = {
  UserInfo: { credential: any; isLoggedIn: boolean, phoneNumber: string };
};

// Define the types for route and navigation based on the stack
type UserInfoScreenRouteProp = RouteProp<RootStackParamList, 'UserInfo'>;

type UserInfoProps = {
  route: UserInfoScreenRouteProp;
};

const UserInfo: React.FC<UserInfoProps> = ({ route }) => {

  const toast = useToast();

  const [UserLabel, setUserLabel] = useState('Login / Register');
  const [IsLogin, setIsLoggedIn] = useState(false);

  const { params } = route;

  let credential = params?.credential;
  let phoneNumber = params?.phoneNumber;
  let isLoggedIn = params?.isLoggedIn;

  const { dismissAll, dismiss } = useBottomSheetModal();

  useEffect(() => {
    const storeData = async (phonenumber: any, LoginCheck: boolean) => {
      try {
        //Store data in Database
        axiosInstance.post('registration', {
          'phnumber': ('+91' + phonenumber),
          // IsLogin: Boolean(LoginCheck)
        }).then(function (response) {
          //store Data in Mobile storage
          if (response.data !== 'Error') {
            AsyncStorage.setItem('PhoneNumber', ('+91' + phonenumber));
            AsyncStorage.setItem('LoginCheck', String(LoginCheck));

            getData();
            //Give User Login confirm
            return (
              toast.show("Login successfully",{
                type: 'normal',
                placement: 'bottom',
                duration: 2000,
                animationType: 'zoom-in',
                normalColor:'#637A9F80',
              })
            );
          }
          else {
            return (
              toast.show("Something going Wrong :D",{
                type: 'normal',
                placement: 'bottom',
                duration: 2000,
                animationType: 'zoom-in',
                normalColor:'#637A9F80',
              })
            );
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        console.log('Something going wrong');
      }
    };

    if (credential !== '' && isLoggedIn === true && phoneNumber !== '') {
      //let providerId = credential.providerId;
      storeData(phoneNumber, isLoggedIn);
      dismissAll();
      return;
    }
    //Call the function when Screen on Changes are Made in Screen
    getData();

  }, [credential, isLoggedIn, dismissAll, phoneNumber,toast]);

  //set the User Info in Local Storage


  const getData = async () => {
    try {
      const PhoneNumber = await AsyncStorage.getItem('PhoneNumber');
      const LoginCheck = await AsyncStorage.getItem('LoginCheck');

      if (PhoneNumber !== null && Boolean(LoginCheck) === true) {
        setUserLabel(PhoneNumber);
        setIsLoggedIn(true);
      }
      else {
        setUserLabel('Login / Register');
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log('Not User Set or Some error', e);
    }
  };

  //console.log(providerId, isLoggedIn);

  const UserLogout = async () => {
    try {
      const PhoneNumber = await AsyncStorage.getItem('PhoneNumber');
      //set islogin to false
      await axiosInstance.post('logoutuser', {
        'phnumber': PhoneNumber,
        //'IsLogin': false,
      }).then(function (response) {
        if (response.data !== 'Error') {
          AsyncStorage.removeItem('PhoneNumber');
          AsyncStorage.removeItem('LoginCheck');

          //Change in Cuurent State
          setUserLabel('Login / Register');
          setIsLoggedIn(false);

          //Give User logout confirm
          return (
            toast.show("Logout SuccesssFully 🥲",{
              type: 'normal',
              placement: 'bottom',
              duration: 2000,
              animationType: 'zoom-in',
              normalColor:'#637A9F90',
            })
          );
        }
        else {
          return (
            toast.show("Something Going wrong 🦖",{
              type: 'normal',
              placement: 'bottom',
              duration: 2000,
              animationType: 'zoom-in',
              normalColor:'#637A9F90',
            })
          );
        }
      }).catch(function (error) {
        console.log('krishna', error);
      });
    }
    catch (e) {
      console.log('Error in Logout', e);
    }
  };

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenPress = () => {
    if (IsLogin === false) {
      bottomSheetRef.current?.present();
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      dismiss();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, [dismiss]);

  return (
    <SafeAreaView style={[Styles.screenHeight, { flex: 1 }]}>
      <View style={styles.container}>
        <CustomHeader title={'User Info'} />
        <View style={[Styles.UsIMainView]}>
          {/* UserIcon / Login,Register and txt content part */}
          <View style={[Styles.UsiTopcontaner]}>
            {/* UserIcon conatienr */}
            {/* <View style={[Styles.UsiImgecontainer]}> */}
            <View>
              <Icon style={{}} size={140} type={Icons.EvilIcons} color={Colors.darkGray} name="user" />
            </View>
            {/* Login/Register text container */}
            <TouchableOpacity activeOpacity={1} onPress={handleOpenPress}>
              {/* main text  */}
              <View style={[Styles.UsimainbnttxtConatiner]}>
                <Text style={[Styles.Usimainbnttxt]}>{UserLabel}</Text>
              </View>
              {/* sub text */}
              <View>
                <Text style={[Styles.UsiSubbnttxt]}>Login and Access milions of advertiser details on single click</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* button List of FeedBack and Logout */}
          <View style={Styles.UsiDownContainer}>
            <View>
              <View>
                <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$0" space>
                  <ListCollectionFeed />
                </XStack>
              </View>
              <Separator marginVertical={15} />

              {(IsLogin || !IsLogin) && (<View style={[Styles.Usilogin]}>
                <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$0" space>
                  <View>
                    <YGroup alignSelf="center" style={[Styles.USiListCollection]} size="$5" separator={<Separator />}>
                      {!IsLogin && (
                        <YGroup.Item>
                          <ListItem
                            hoverTheme
                            pressTheme
                            title="Login"
                            icon={LogIn}
                            iconAfter={ChevronRight}
                            size={18}
                            onPress={handleOpenPress}
                          />
                        </YGroup.Item>
                      )}
                      {IsLogin && (
                        <View>
                          <YGroup.Item>
                            <ListItem
                              hoverTheme
                              pressTheme
                              title="Change Password"
                              icon={Lock}
                              iconAfter={ChevronRight}
                              size={18}
                            />
                          </YGroup.Item>
                          <Separator marginVertical={0} />
                          <YGroup.Item>
                            <ListItem
                              hoverTheme
                              pressTheme
                              title="Logout"
                              icon={LogOut}
                              iconAfter={ChevronRight}
                              size={18}
                              onPress={UserLogout}
                            />
                          </YGroup.Item>
                        </View>
                      )}
                    </YGroup>
                  </View>
                </XStack>
              </View>)}
            </View>
            <View>
              <CustomeBottomSheet ref={bottomSheetRef} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

};

// User FeedBack related List
function ListCollectionFeed() {
  return (
    <YGroup alignSelf="center" style={[Styles.USiListCollection]} size="$5" separator={<Separator />}>
      <YGroup.Item>
        <ListItem
          title="Are You finding us Helpful"
          icon={Star}
          size={18}
          iconAfter={ChevronRight}
          backgroundColor={'aquamarine'}
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Communication Settings"
          icon={Settings}
          iconAfter={ChevronRight}
          size={18}
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Share Feedback"
          icon={MessageSquare}
          iconAfter={ChevronRight}
          size={18}
        />
      </YGroup.Item>
    </YGroup>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default UserInfo;
