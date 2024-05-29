import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, Image, Card, CardProps } from 'tamagui';
import React from 'react';

//APi
import axiosInstance from '../../axiosInstance';

//Icon
import Icon, { Icons } from '../../assets/Icon/Icons';
import Colors from '../../constants/Colors';

const RecentCard = (props: CardProps & { onFavoritePressComplete: any, navigation: any, isLogin: boolean }) => {

    const { propertyData, navigation, isLogin, onFavoritePressComplete, ...restProps } = props;

    const { ptitle, areasize, purpose, ptype, city, location, coverimagepath, is_favorite, pid, userid, totalprice } = propertyData;

    const favoritePress = async () => {
        try {
            const response = await axiosInstance.post('storeuserfavorite', {
                'pid': pid.toString(),
                'userid': userid.toString()
            });
            if (response) {
                onFavoritePressComplete();
            } else {
                console.warn('Data is not Saved');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleResoucepage = () => {
        navigation.push('ResourcePage', {
            ptitle: ptitle, pdescription: propertyData.pdescription, address: location + city, imgurl: propertyData.imagpath, favorite: is_favorite, pid: pid, userid: userid,
        });
    };

    return (
        <TouchableOpacity onPress={handleResoucepage}>
            <Card bordered {...restProps} width={250}
                height={216} scale={1}
                // animation="bouncy"
                size="$2" borderRadius={10}>
                <Card.Header padded>
                    {isLogin && (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => favoritePress()} style={styles.favconatiner}>
                                <Icon style={{ margin: 5 }} type={Icons.FontAwesome}
                                    name={is_favorite === 'true' ? 'heart' : 'heart-o'}
                                    color={is_favorite === 'true' ? 'gold' : 'white'}
                                    size={16} />
                            </TouchableOpacity>
                        </View>
                    )}
                </Card.Header>
                <Card.Footer marginHorizontal={10}>
                    <View>
                        <Text
                            style={{ fontSize: 16, fontWeight: 700 }}>
                            INR {totalprice}</Text>
                        <Text
                            style={{ fontSize: 12, marginBottom: 10 }}>{location}-{city}</Text>
                        <Text
                            style={{ fontSize: 12, fontWeight: 600, color: 'rgb(48, 128, 178)' }}>{ptype}-{purpose}</Text>
                        <View flexDirection='row'>
                            <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                                <Icon
                                    size={18}
                                    type={Icons.MaterialCommunityIcons}
                                    name={'move-resize'}
                                    style={{}}
                                    color="white"
                                />
                                <Text style={{ marginLeft: 4 }}>{areasize}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 4, marginLeft: 10 }}>
                                <Icon
                                    size={18}
                                    type={Icons.Ionicons}
                                    name={'water-outline'}
                                    style={{}}
                                    color="white"
                                />
                                <Text style={{ marginLeft: 4 }}>{areasize}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Card.Footer>
                <Card.Background style={styles.cardimgcontainer}>
                    <Image
                        resizeMethod="auto"
                        style={styles.image}
                        alignSelf="center"
                        source={{
                            uri: coverimagepath,
                        }}
                    />
                </Card.Background>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardimgcontainer: {
        width: 248,
        height: 120,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 10,
    },
    reacttxtcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    scrollView: {
        flex: 1,
    },
    favconatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000032',
        borderRadius: 15,
        width: 26,
        height: 26,
    },
    recttittxt: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.dark,
    },
});

export default RecentCard;
