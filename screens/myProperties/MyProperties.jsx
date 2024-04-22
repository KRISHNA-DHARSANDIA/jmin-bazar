import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon, { Icons } from '../../assets/Icon/Icons';
const DATA = [
    {
        pid: 8, // property id
        ownerid: 15,
        purpose: "sell",
        property_type: "Residential Plot",
        city: "rajkot",
        location: "Rajkot Gujarat",
        arasize: 10,
        totalprice: 102070,
        possession: 1,
        ptitle: "Evergreen Estates",
        description: "Your Key to Extraordinary Properties.",
        images: [
            "https://firebasestorage.googleapis.com/v0/b/farmsale-001.appspot.com/o/Images%2Frn_image_picker_lib_temp_3eaee931-4cd2-4aef-b34a-41b52c4890f21712737210517.jpg?alt=media&token=fae386e3-dfb1-40b4-8cd2-1acbad257410",
            "https://firebasestorage.googleapis.com/v0/b/farmsale-001.appspot.com/o/Images%2Frn_image_picker_lib_temp_0c81f302-f29e-428b-8fec-72020fa8504b1712737210517.jpg?alt=media&token=d182e164-00ba-4a7f-8b2a-688fa57cae75"
        ],
        coverimgepath: "https://firebasestorage.googleapis.com/v0/b/farmsale-001.appspot.com/o/Images%2Frn_image_picker_lib_temp_3eaee931-4cd2-4aef-b34a-41b52c4890f21712737210517.jpg?alt=media&token=fae386e3-dfb1-40b4-8cd2-1acbad257410",
        email: "kp064342@gamil.com",
        contectone: '8490040874',
        contecttwo: '9824840874',
        posting_date: "2024-04-10",
    },
];

const Item = ({ propertydt }) => (
    <View style={styles.mainproperthcard}>
        <View style={styles.imgcontainer}>
            <Image
                style={styles.covimge}
                source={{ uri: propertydt.coverimgepath }}
            />
        </View>
        <View style={styles.detailscontainer}>
            <Text style={styles.title}>{propertydt.ptitle}</Text>
            <Text style={styles.descrip}>{propertydt.description}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.price}>{propertydt.totalprice}</Text>
                <Text style={styles.postdate}>{propertydt.posting_date}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity>
                    <View style={[styles.viewbtncon,styles.commnbutton]}>
                        <Icon
                            size={24}
                            type={Icons.MaterialCommunityIcons}
                            name={'eye'}
                            color="white"
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.editbtncon,styles.commnbutton]}>
                        <Icon
                            size={24}
                            type={Icons.MaterialIcons}
                            name={'edit'}
                            color="white"
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.deletebtncon,styles.commnbutton]}>
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


const MyProperties = () => {

    const [isEmptyProperty, checkEmptyProperty] = useState(false);

    useEffect(() => {
        checkEmptyProperty(false);
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            {isEmptyProperty === true ? (
                <View style={styles.notpropertydata}>
                    <Image
                        source={require('../../assets/images/folder.png')}
                        style={styles.folderimg}
                    />
                    <Text style={styles.notpptymtxt}>PROPERTIES NOT UPLODED</Text>
                    <Text style={styles.notpptystxt}>It appears when you not uploaded any properties yet.</Text>
                </View>
            ) : (
                <View>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <Item propertydt={item} />}
                        keyExtractor={item => item.pid}
                    />
                </View>
            )
            }
        </ SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    folderimg: {
        width: 150,
        height: 150,
    },
    notpropertydata: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
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
        borderColor: 'white',
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
    }
})

export default MyProperties;