/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Dimensions, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Modal, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon, { Icons } from '../../assets/Icon/Icons';

import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../axiosInstance';

//Alert 
import { useToast } from 'react-native-toast-notifications';

//firebase
import storage, { firebase } from '@react-native-firebase/storage';

const { width } = Dimensions.get('window');

import AsyncStorage from '@react-native-async-storage/async-storage';



// const DATA = [
//     {
//         pid: 20, // property id
//         ownerid: 15,
//         purpose: 'Rent Out',
//         ptype: 'Commercial Plot',
//         city: 'Rajkot',
//         location: 'Movdi Main Road',
//         arasize: 10,
//         totalprice: 102070,
//         possession: 1,
//         ptitle: 'Evergreen Estates',
//         description: 'Your Key to Extraordinary Properties.',
//         images: [
//             'https://firebasestorage.googleapis.com/v0/b/farmsale-001.appspot.com/o/Images%2Frn_image_picker_lib_temp_0c81f302-f29e-428b-8fec-72020fa8504b1712737210517.jpg?alt=media&token=d182e164-00ba-4a7f-8b2a-688fa57cae75',
//             'https://firebasestorage.googleapis.com/v0/b/farmsale-001.appspot.com/o/Images%2Frn_image_picker_lib_temp_0c81f302-f29e-428b-8fec-72020fa8504b1712737210517.jpg?alt=media&token=d182e164-00ba-4a7f-8b2a-688fa57cae75',
//             'https://firebasestorage.googleapis.com/v0/b/farmsale-001.appspot.com/o/Images%2Frn_image_picker_lib_temp_0c81f302-f29e-428b-8fec-72020fa8504b1712737210517.jpg?alt=media&token=d182e164-00ba-4a7f-8b2a-688fa57cae75',
//         ],
//         coverimgepath: 'https://firebasestorage.googleapis.com/v0/b/farmsale-001.appspot.com/o/Images%2Frn_image_picker_lib_temp_0c81f302-f29e-428b-8fec-72020fa8504b1712737210517.jpg?alt=media&token=d182e164-00ba-4a7f-8b2a-688fa57cae75',
//         email: 'kp064342@gamil.com',
//         contectone: '8490040874',
//         contecttwo: '9824840874',
//         posting_date: '2024-04-10',
//         latitude: 22.312098254389,
//         longitude: 73.1912969984114,
//     },
// ];




const Item = ({ propertydt }) => {

    const toast = useToast();
    const navigation = useNavigation();

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);


    const handleDeletePress = () => {
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        setDeleteModalVisible(false);
        handledeletebtn();
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
    };

    //Delete btn click
    const handledeletebtn = async () => {
        try {

            // Delete data from Firebase
            try {
                const fileUrl = propertydt.coverimagepath;
                console.log(fileUrl);
                const fileRef = firebase.storage().refFromURL(fileUrl);

                const exist = await fileRef.getMetadata();

                if (exist) {
                    // Delete the file
                    await fileRef.delete().then(() => {
                        console.log('File Deleted from Myproperties.jsx');
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

            //delete data from database
            try {
                const currpid = propertydt.pid.toString();
                const response = await axiosInstance.post('deleteuserproperty', {
                    'pid': currpid
                });
                if (response.data === 'deleted') {
                    toast.show('Property Deleted Successfully', {
                        type: 'normal',
                        placement: 'bottom',
                        duration: 3000,
                        animationType: 'zoom-in',
                        normalColor: '#637A9F80',
                    });
                } else {
                    console.warn('bugi bugi ❌', response.data);
                    toast.show('Something Wrong', {
                        type: 'normal',
                        placement: 'bottom',
                        duration: 2000,
                        animationType: 'zoom-in',
                        normalColor: '#637A9F80',
                    });
                }
            }
            catch (exe) {
                console.log('Exception eccour in backendside' + exe);
            }
        }
        catch (exe) {
            console.log(exe);
        }
    };

    //Edit btn Click
    const handleEditProperty = async () => {
        //Form Database
        try {
            const response = await axiosInstance.get(`getSpecificPropertyData?pid=+${propertydt.pid}`);
            if (response) {
                navigation.navigate('AddProperty', response.data);
            } else {
                console.warn('bugi bugi in editbtn❌', response.data);
                toast.show('Something Wrong', {
                    type: 'normal',
                    placement: 'bottom',
                    duration: 2000,
                    animationType: 'zoom-in',
                    normalColor: '#637A9F80',
                });
            }
        }
        catch (exe) {
            console.log('Exception eccour in backendside' + exe);
        }
    }

    return (
        <View style={styles.mainproperthcard}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDeleteModalVisible}
                onRequestClose={handleCancelDelete}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Are you sure you want to delete?</Text>
                        <Button title="Confirm" onPress={handleDeleteConfirm} />
                        <Button title="Cancel" onPress={handleCancelDelete} />
                    </View>
                </View>
            </Modal>

            <View style={styles.imgcontainer}>
                <Image
                    style={styles.covimge}
                    source={{ uri: propertydt.coverimagepath }}
                />
            </View>
            <View style={styles.detailscontainer}>
                <Text style={styles.title}>{propertydt.ptitle}</Text>
                <Text style={styles.descrip}>{propertydt.pdescription}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.price}>{propertydt.totalprice}</Text>
                    <Text style={styles.postdate}>{propertydt.posting_date}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity>
                        <View style={[styles.viewbtncon, styles.commnbutton]}>
                            <Icon
                                size={24}
                                type={Icons.MaterialCommunityIcons}
                                name={'eye'}
                                color="white"
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleEditProperty}
                    >
                        <View style={[styles.editbtncon, styles.commnbutton]}>
                            <Icon
                                size={24}
                                type={Icons.MaterialIcons}
                                name={'edit'}
                                color="white"
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={handledeletebtn}
                        onPress={handleDeletePress}
                    >
                        <View style={[styles.deletebtncon, styles.commnbutton]}>
                            <Icon
                                size={24}
                                type={Icons.MaterialCommunityIcons}
                                name={'delete'}
                                color="white"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const MyProperties = (props) => {

    const navigation = useNavigation();

    const [isEmptyProperty, setEmptyProperty] = useState(false);
    const [usallproperty, setusallproperty] = useState(null);

    useEffect(() => {

        //call function to get all userProperty
        const getdata = async () => {
            try {
                const UUID = await AsyncStorage.getItem('UUID');
                if (UUID !== null) {
                    const respose = await axiosInstance.get(`getUserProperty?uuid=${UUID}`);
                    setusallproperty(respose.data);
                }
                else {
                    if (usallproperty === null) {
                        setEmptyProperty(true);
                    }
                }
            }
            catch (error) {
                console.log('Error in Myproperties' + error);
            }
        };
        //getdata();

        const listener = navigation.addListener('focus', () => {
            getdata();
        });

        // Clean up the listener when the component unmounts
        return () => {
            listener();
        };

    }, []);


    //Upload buttton click
    const handleUploadbtn = () => {
        navigation.navigate('AddProperty');
    };

    return (
        <SafeAreaView style={styles.container} >
            {isEmptyProperty === true ? (
                <View style={styles.notpropertydata}>
                    <View style={styles.topbar} >
                        <Image
                            source={require('../../assets/images/folder.png')}
                            style={styles.folderimg}
                        />
                        <Text style={styles.notpptymtxt}>PROPERTIES NOT UPLODED</Text>
                        <Text style={styles.notpptystxt}>It appears when you not uploaded any properties yet.</Text>
                    </View>
                    <View style={styles.bottombar}>
                        <TouchableOpacity
                            onPress={handleUploadbtn}
                            style={styles.uploadbtn} >
                            <Text style={styles.ubtntext}>Upload Property</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            ) : (
                <View>
                    <FlatList
                        data={usallproperty}
                        renderItem={({ item }) => <Item propertydt={item} />}
                        keyExtractor={item => item.pid}
                    />
                </View>
            )
            }
        </ SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    folderimg: {
        width: 150,
        height: 150,
    },
    notpropertydata: {
        flex: 2,
    },
    notpptymtxt: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.2,
        color: 'rgb(0, 166, 82)',
        marginVertical: 10,
    },
    notpptystxt: {
        fontSize: 15,
    },
    mainproperthcard: {
        width: 'auto',
        height: 'auto',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 20,
        marginHorizontal: 5,
        marginVertical: 10,
    },
    imgcontainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    covimge: {
        width: '90%',
        height: '90%',
        borderRadius: 10,
    },
    detailscontainer:
    {
        marginTop: 10,
        justifyContent: 'flex-start',
        width: 250,
    },
    commnbutton: {
        width: 34,
        height: 34,
        justifyContent: 'center',
        borderRadius: 6,
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
    },
    deletebtncon: {
        backgroundColor: 'hsl(348, 100%, 70%)',
    },
    editbtncon: {
        backgroundColor: 'hsl(171, 100%, 41%)',
    },
    viewbtncon: {
        backgroundColor: 'hsl(198, 100%, 70%)',
    },
    uploadbtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 166, 82)',
        width: width - 26,
        height: 46,
        borderRadius: 12,
    },
    topbar: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    bottombar: {
        flex: 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffffd0',
    },
    ubtntext: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default MyProperties;
