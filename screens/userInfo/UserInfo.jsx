/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Touchable, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../../Styles/styles';
import Icon, { Icons } from '../../assets/Icon/Icons';
import { ChevronRight, MessageSquare, Settings, Star, LogIn, LogOut, Lock } from '@tamagui/lucide-icons';
import {
  ListItem,
  Separator,
  XStack,
  YGroup,
} from 'tamagui';

//Header
import CustomHeader from '../../components/customHeader/CustomHeader';

const showlogout = false;
const showlogin = true;
//fature authentication
// const UserInfo = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [confirmationCode, setConfirmationCode] = useState('');
//   const [verificationId, setVerificationId] = useState(null);

//   const sendVerificationCode = async () => {
//     try {
//       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//       setVerificationId(confirmation.verificationId);
//     } catch (error) {
//       console.error('Error sending verification code:', error);
//     }
//   };

//   const confirmCode = async () => {
//     try {
//       const credential = auth.PhoneAuthProvider.credential(
//         verificationId,
//         confirmationCode
//       );
//       await auth().signInWithCredential(credential);
//       console.log('User signed in successfully');
//       console.log(credential);
//     } catch (error) {
//       console.error('Error confirming verification code:', error);
//     }
//   };

//   return (
//     <View>
//       <Text>Enter your phone number:</Text>
//       <TextInput
//         placeholder="Phone number"
//         value={phoneNumber}
//         onChangeText={(text) => setPhoneNumber(text)}
//       />
//       <Button title="Send Code" onPress={sendVerificationCode} />

//       {verificationId && (
//         <>
//           <Text>Enter the verification code:</Text>
//           <TextInput
//             placeholder="Verification code"
//             value={confirmationCode}
//             onChangeText={(text) => setConfirmationCode(text)}
//           />
//           <Button title="Confirm" onPress={confirmCode} />
//         </>
//       )}
//     </View>
//   );
// };

const UserInfo = () => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <SafeAreaView style={[Styles.screenHeight, { flex: 1 }]}>
      <CustomHeader />
      <View style={[Styles.UsIMainView]}>
        {/* UserIcon / Login,Register and txt content part */}
        <View style={[Styles.UsiTopcontaner]}>
          {/* UserIcon conatienr */}
          <View style={[Styles.UsiImgecontainer]}>
            <Icon size={140} type={Icons.EvilIcons} name="user" />
          </View>
          {/* Login/Register text container */}
          <TouchableOpacity style={[Styles.UsiBtnregister]}>
            {/* main text  */}
            <View style={[Styles.UsimainbnttxtConatiner]}>
              <Text style={[Styles.Usimainbnttxt]}>Login / Register</Text>
            </View>
            {/* sub text */}
            <View>
              <Text style={[Styles.UsiSubbnttxt]}>Login and Access milions of advertiser details on single click</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* button List of FeedBack and Logout */}
        <View style={[Styles.UsiDownContainer]}>
          <View style={[Styles.UsICreateProViw]}>
            <View>
              <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$0" space>
                <ListCollectionFeed />
              </XStack>
            </View>
            <Separator marginVertical={15} />
            {(showlogin || showlogout) && (<View style={[Styles.Usilogin]}>
              <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$0" space>
                <ListCollectionAuth />
              </XStack>
            </View>)}
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

//user Login
function ListCollectionAuth() {
  return (
    <YGroup alignSelf="center"  style={[Styles.USiListCollection]} size="$5" separator={<Separator />}>
      {showlogin && (
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title="Login"
            icon={LogIn}
            iconAfter={ChevronRight}
            size={18}
          />
        </YGroup.Item>
      )}
      {showlogout && (
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
            />
          </YGroup.Item>
        </View>
      )}
    </YGroup>
  );
}


export default UserInfo;
