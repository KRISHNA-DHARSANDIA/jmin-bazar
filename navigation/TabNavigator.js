/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Icon, { Icons } from '../assets/Icon/Icons';
import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable';

//screen
import HomeScreen from '../screens/homeScreen/HomeScreen';
import UserInfo from '../screens/userInfo/UserInfo';
import Views from '../screens/Views';
import UserLike from '../screens/UserLike';

const TabArr = [
    { route: 'HomeScreen', label: 'Home', type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeScreen, color: Colors.primary, alphaClr: Colors.primaryMoreTransLite },
    { route: 'Views', label: 'Activity', type: Icons.AntDesign, activeIcon: 'clockcircle', inActiveIcon: 'clockcircleo', component: Views, color: Colors.primary, alphaClr: Colors.primaryMoreTransLite },
    { route: 'UserLike', label: 'Like', type: Icons.MaterialCommunityIcons, activeIcon: 'heart-plus', inActiveIcon: 'heart-plus-outline', component: UserLike, color: Colors.primary, alphaClr: Colors.primaryMoreTransLite },
    { route: 'UserInfo', label: 'Profile', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: UserInfo, color: Colors.primaryMoreTransLite, alphaClr: Colors.primaryMoreTransLite },
];

const Tab = createBottomTabNavigator();


const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 1.5 } });
        }
        else { // zoom in and out
            viewRef.current.animate({ 0: { scale: 1.5 }, 1: { scale: 1 } });
        }
    }, [focused]);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container]}>
            <Animatable.View
                ref={viewRef}
                duration={100} />
            <View style={[styles.btn, { width: 64, marginHorizontal: -10, backgroundColor: focused ? item.alphaClr : null }]}>
                <Icon size={16} type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? Colors.primary : Colors.primaryLite} />
                <Text style={[styles.labeltxt, focused && styles.selectedLabel]}>{item.label}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function TabNavigator() {
    return (
        <Tab.Navigator
            shifting={true}
            style={styles.Navigator}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 66,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
            }}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen key={index} name={item.route}
                        component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        paddingLeft: 12,
    },
    labeltxt: {
        fontSize: 12,
        color: Colors.textlight,
    },
    btn: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 20,
    },
})
