/* eslint-disable prettier/prettier */
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Navbar extends Component {
    render() {
        return (
            <SafeAreaView>
                <View style={[styles.mainNav]}>
                    <View style={[styles.navleft]}>
                        <View style={[styles.leftcontent]}>
                            <TouchableOpacity>
                                <View>
                                    <Icon name="navicon" size={30} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.navright]}>
                        <View style={[styles.rightcontent]}>
                            <View>
                                <TouchableOpacity>
                                    <View style={[styles.postbtn]}>
                                        <Text style={[styles.postbtntxt]}>Post property</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.notifibtn]}>
                                <TouchableOpacity>
                                    <View>
                                        <MaterialIcons name="notifications-none" size={30} color="black" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    mainNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 25,
        marginBottom: 10,
    },
    navleft:{

    },
    navright:{

    },
    rightcontent: {
        flexDirection: 'row',
        marginRight: 14,
    },
    leftcontent: {
        marginLeft: 14,
    },
    notifibtn:{
        marginLeft:16,
    },
    postbtn:{
        width:100,
        height:25,
        justifyContent:'center',
    },
    postbtntxt:{
        color:'hsl(217, 71%, 53%)',
        fontWeight:'600',
    },
});
