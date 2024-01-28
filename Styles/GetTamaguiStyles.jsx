/* eslint-disable prettier/prettier */
import { createMedia } from '@tamagui/react-native-media-driver';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

// Get the screen dimensions
const { width, height } = Dimensions.get('window');

const GetTamaguiStyles = () => ({
    media: createMedia({
        xs: { maxWidth: 660 },
    }),
});

const Styles = StyleSheet.create({
    screenWidth: { width: '100%' },
    screenHeight: { height: '100%' },
    container: {
        flex: 1,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        height: 0.3,
        width: '100%',
        backgroundColor: Colors.gray,
        opacity: 0.8,
    },
    boldText: {
        fontWeight: 'bold',
    },
    contentContainerStyle: {
        paddingBottom: 200,
    },
    contentContainerStyle2: {
        paddingBottom: 100,
    },

    //User info
    UsIMainView: {
        flex: 1,
    },
    UsiTopcontaner: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    UsiBtnregister: {
        textAlign: 'center',
    },
    Usimainbnttxt: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#0090ff',
    },
    UsimainbnttxtConatiner: {
        marginVertical: 10,
    },
    UsiSubbnttxt: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: width * 0.1,
    },
    UsiDownContainer: {
        flex: 5,
    },
    USiListCollection: {
        width: width,
        borderRadius: 0,
    },
    USiListIcon: {
        width: 10,
    },
    Usilogin: {
        marginTop: 0,
    },

    //User Auth
    AUcontentContainer: {
        margin: 20,
        flex: 1,
    },
    UAmainToptxtConatienr: {
        marginBottom: 20,
    },
    UAmainText: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.black,
    },
    AUPNuminput: {
        fontSize: 14,
        backgroundColor: 'white',
        width: 250,
        height: 20,
        paddingHorizontal: 10,
        paddingTop: 0,
        paddingBottom: 0,
        borderLeftWidth: 2,
        borderColor: '#cfcfcf',
        marginBottom: 6,
    },
    AUtxtgeneral: {
        marginBottom: 6,
        flexDirection: 'row',
    },
    AUNuminputbox: {
        borderColor: 'blue',
        borderWidth: 2,
        padding: 2,
        paddingLeft: 6,
        marginVertical: 10,
    },
    UAContinueBtn: {
        height: 42,
        backgroundColor: '#83bcf0',
        marginVertical: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    UAContinueBtntxt: {
        width: 100,
        fontSize: 18,
        color: Colors.white,
        fontWeight: '600',
    },
    UADropdownSelector: {
        marginRight: 10,
    },

    //Home Page react Add
    recttxt:{
        fontSize:17,
        fontWeight:'700',
        color:Colors.dark,
    },
    recttittxt:{
        fontSize:14,
        fontWeight:'700',
        color:Colors.dark,
    }
});

export { GetTamaguiStyles, Styles };
