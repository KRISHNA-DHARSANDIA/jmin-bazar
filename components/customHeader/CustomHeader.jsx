/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

const CustomHeader = ({ title }) => {
    return (
        <SafeAreaView>
            <View style={[styles.mainNav]}>
                <View style={[styles.navleft]}>
                    <View style={[styles.leftbtn]}>
                        <TouchableOpacity>
                            <View>
                                <Icon name="navicon" size={25} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.leftcontent]}>
                        <TouchableOpacity>
                            <View style={[styles.titletxtcoantainer]}>
                                <Text style={[styles.titletxtmain]}>{title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CustomHeader;

const styles = StyleSheet.create({

    mainNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
        marginBottom: 5,
        height: 55,
        // backgroundColor: 'red',
    },
    navleft: {
        flexDirection: 'row',
    },
    navright: {
        flexDirection: 'row',
    },
    rightcontent: {
        marginRight: 14,
    },
    leftbtn: {
        marginLeft: 14,
        justifyContent: 'center',
    },
    leftcontent: {
        justifyContent: 'center',
    },
    notifibtn: {
        marginLeft: 16,
    },
    titletxtcoantainer: {
        width: 100,
        height: 25,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    titletxtmain: {
        color: 'hsl(217, 71%, 53%)',
        fontWeight: '600',
        fontSize: 16,
    },
});
