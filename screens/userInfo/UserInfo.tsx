/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
//import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon, { Icons } from '../../assets/Icon/Icons';
import { ChevronRight, MessageSquare, Settings, Star, LogIn, LogOut, Lock } from '@tamagui/lucide-icons';
import {
  ListItem,
  Separator,
  XStack,
  YGroup,
} from 'tamagui';
import { Styles } from '../../Styles/GetTamaguiStyles';

//bottom Sheet
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';

//Header
import CustomHeader from '../../components/customHeader/CustomHeader';
import CustomeBottomSheet from '../../components/BottomSheet/BottomSheetModel';

const showlogout = false;
const showlogin = true;

const UserInfo = () => {
  //const isshow = true;
  // const [isPressed, setIsPressed] = useState(isshow);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { dismiss } = useBottomSheetModal();

  const handleOpenPress = () => {
    bottomSheetRef.current?.present();
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      dismiss(); // Dismiss the bottom sheet modal
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, [dismiss]);

  return (
    <SafeAreaView style={[Styles.screenHeight, { flex: 1 }]}>
      <View style={styles.container}>
        <CustomHeader title={"User Info"} />
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
          <View style={Styles.UsiDownContainer}>
            <View>
              <View>
                <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$0" space>
                  <ListCollectionFeed />
                </XStack>
              </View>
              <Separator marginVertical={15} />
              {(showlogin || showlogout) && (<View style={[Styles.Usilogin]}>
                <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$0" space>
                  <View>
                    <YGroup alignSelf="center" style={[Styles.USiListCollection]} size="$5" separator={<Separator />}>
                      {showlogin && (
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
  contentContainer: {
    flex: 1,
  },
});


export default UserInfo;
