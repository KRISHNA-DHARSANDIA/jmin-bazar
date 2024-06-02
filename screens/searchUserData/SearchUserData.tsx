/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useRef } from 'react';
import { Text, StyleSheet, Switch, Dimensions, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import type { StackProps, TabLayout, TabsTabProps } from 'tamagui'
import React, { Component, useState } from 'react';
import {
    Button,
    Separator,
    AnimatePresence,
    H5,
    Tabs,
    YStack,
    styled,
    ToggleGroup
} from 'tamagui';
import Icon, { Icons } from '../../assets/Icon/Icons';

import { MyToggleGroupItemSm } from '../../components/customComponent/CustomComponent';

//component
import PropertyTypesList from '../../components/propertyTypesList/PropertyTypesList';


import SwitchSelector from 'react-native-switch-selector';

//bottom Sheet
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import CustomeBottomSheet from '../../components/BottomSheet/CityBottomSheet';


const TabsAdvancedUnderline = () => {
    const [tabState, setTabState] = useState<{
        currentTab: string
        /**
         * Layout of the Tab user might intend to select (hovering / focusing)
         */
        intentAt: TabLayout | null
        /**
         * Layout of the Tab user selected
         */
        activeAt: TabLayout | null
        /**
         * Used to get the direction of activation for animating the active indicator
         */
        prevActiveAt: TabLayout | null
    }>({
        activeAt: null,
        currentTab: 'HomeTab',
        intentAt: null,
        prevActiveAt: null,
    });

    const setCurrentTab = (currentTab: string) => setTabState({ ...tabState, currentTab });
    const setIntentIndicator = (intentAt: any) => setTabState({ ...tabState, intentAt });
    const setActiveIndicator = (activeAt: any) =>
        setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });

    const { activeAt, intentAt, prevActiveAt, currentTab } = tabState;

    // 1 = right, 0 = nowhere, -1 = left
    const direction = (() => {
        if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
            return 0;
        }
        return activeAt.x > prevActiveAt.x ? -1 : 1;
    })()

    const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
        if (type === 'select') {
            setActiveIndicator(layout);
        } else {
            setIntentIndicator(layout);
        }
    };

    return (
        <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            orientation="horizontal"
            size="$4"
            height={150}
            flexDirection="column"
            activationMode="manual"
            backgroundColor="$backgroundTransparent"
            borderRadius="$4"
        >
            <YStack>
                <AnimatePresence>
                    {intentAt && (
                        <TabsRovingIndicator
                            width={intentAt.width}
                            height="$0.5"
                            x={intentAt.x}
                            bottom={0}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {activeAt && (
                        <TabsRovingIndicator
                            theme="active"
                            active
                            width={activeAt.width}
                            height="$0.5"
                            x={activeAt.x}
                            bottom={0}
                        />
                    )}
                </AnimatePresence>
                <Tabs.List
                    disablePassBorderRadius
                    loop={false}
                    aria-label="select Property type"
                    borderBottomLeftRadius={10}
                    borderBottomRightRadius={10}
                    paddingBottom="$0.5"
                    borderColor="white"
                    borderBottomWidth="$0.5"
                    backgroundColor="transparent"
                >
                    <Tabs.Tab
                        unstyled
                        paddingHorizontal="$5"
                        paddingVertical="$2"
                        value="HomeTab"
                        onInteraction={handleOnInteraction}
                    >
                        <Text
                            fontSize={16}
                            fontWeight={'bold'}
                            color={currentTab === 'HomeTab' ? '#1da15f' : '#ffffff'}
                        >Home</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        unstyled
                        paddingHorizontal="$4"
                        paddingVertical="$2"
                        value="PlotsTab"
                        onInteraction={handleOnInteraction}
                    >
                        <Text
                            fontSize={16}
                            fontWeight={'bold'}
                            color={currentTab === 'PlotsTab' ? '#1da15f' : '#ffffff'}
                        >Plots</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        unstyled
                        paddingHorizontal="$6"
                        paddingVertical="$2"
                        value="CommercialTab"
                        onInteraction={handleOnInteraction}
                    >
                        <Text
                            fontSize={16}
                            fontWeight={'bold'}
                            color={currentTab === 'CommercialTab' ? '#1da15f' : '#ffffff'}
                        >Commercial</Text>
                    </Tabs.Tab>
                </Tabs.List>
            </YStack>

            <AnimatePresence exitBeforeEnter custom={{ direction }} initial={false}>
                <AnimatedYStack key={currentTab}>
                    <Tabs.Content value={currentTab} forceMount flex={1} justifyContent="center">
                        {currentTab === 'HomeTab' && <PropertyTypeListHome />}
                        {currentTab === 'PlotsTab' && <H5 textAlign="center">{currentTab}sd</H5>}
                        {currentTab === 'CommercialTab' && <H5 textAlign="center">{currentTab}ds</H5>}
                    </Tabs.Content>
                </AnimatedYStack>
            </AnimatePresence>
        </Tabs>
    );
};

const TabsRovingIndicator = ({ active, ...props }: { active?: boolean } & StackProps) => {
    return (
        <YStack
            position="absolute"
            backgroundColor="$backgroundTransparent"
            opacity={0.7}
            animation="100ms"
            borderWidth={3}
            borderRadius={2}
            marginBottom={1}
            borderColor={'#00a74e'}
            zIndex={1}

            enterStyle={{
                opacity: 0,
            }}
            exitStyle={{
                opacity: 0,
            }}
            {...(active && {
                backgroundColor: '#00a74e',
                opacity: 1,
            })}
            {...props}
        />
    );
};

const AnimatedYStack = styled(YStack, {
    f: 1,
    x: 0,
    o: 1,

    animation: '100ms',
    variants: {
        // 1 = right, 0 = nowhere, -1 = left
        direction: {
            ':number': (direction) => ({
                enterStyle: {
                    x: direction > 0 ? -25 : 25,
                    opacity: 0,
                },
                exitStyle: {
                    zIndex: 0,
                    x: direction < 0 ? -25 : 25,
                    opacity: 0,
                },
            }),
        },
    } as const,
});

const PropertyTypeListHome = () => {
    return (
        <ToggleGroup
            type="single"
            // value={this.state.purpose}
            //onValueChange={this.handlePurposeChnage}
            style={styles.ToggleGroup}
            borderRadius={20}
            backgroundColor={'$backgroundTransparent'}
            disableDeactivation={true}
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <YStack flexDirection="row"
                    alignItems="center" space="$3" margin={2}>
                    <MyToggleGroupItemSm
                        active={true}
                        style={{ flexDirection: 'row' }}
                        value="All"
                    >
                        <View style={{ marginRight: 6 }}>
                            <Icon style={{}} type={Icons.Ionicons} name="checkmark-done-circle-outline" size={24} color={'gray'} />
                        </View>
                        <Text
                        //style={this.state.purpose === 'Sell' ? { color: 'rgb(23, 162, 96)' } : { color: 'rgb(34, 34, 34)' }}
                        >All</Text>
                    </MyToggleGroupItemSm>
                </YStack>
            </ScrollView>
        </ToggleGroup>
    );
};


const SearchUserData = () => {

    const [PurposeType, setPurposeType] = useState('buy');
    const [selectedCity, setSelectedCity] = useState('Ahmedabad');
    const { dismissAll, dismiss } = useBottomSheetModal();

    const CitybottomSheetRef = useRef<BottomSheetModal>(null);

    return (
        <View style={styles.maincontainer}>
            <View style={styles.infocontainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.Feather} name="check-circle" size={20} color={'gray'} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 16 }}>I Want To</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SwitchSelector
                        initial={0}
                        onPress={(value: string) => {
                            setPurposeType(value);
                        }}
                        textColor={'white'}
                        selectedColor={'white'}
                        buttonColor={'green'}
                        borderColor={'#c9ffff'}
                        borderWidth={10}
                        style={styles.togglebtnforpurpose}
                        options={[
                            { label: 'Buy', value: 'buy' },
                            { label: 'Sell', value: 'sell' }
                        ]}
                        testID="Purpose-switch-selector"
                        accessibilityLabel="Purpose-switch-selector"
                    />
                </View>
            </View>
            <Separator borderColor={'#F0EBE3'} borderWidth={1} />
            <TouchableOpacity style={styles.infocontainer}
                onPress={() => CitybottomSheetRef.current?.present()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialCommunityIcons} name="map-marker-outline" size={24} color={'gray'} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 16 }}>City</Text>
                        <Text style={{ fontSize: 16, color: 'green' }}>{selectedCity}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon style={{}} type={Icons.Feather} name="chevron-right" size={24} color={'gray'} />
                </View>
            </TouchableOpacity>
            <Separator borderColor={'#F0EBE3'} borderWidth={1} />
            <View style={[styles.infocontainer, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.MaterialCommunityIcons} name="map" size={24} color={'gray'} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 16 }}>Select Locations</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 10 }}>
                    <TextInput
                        style={{ width: 240, backgroundColor: '#1e1e1e', borderColor: '#ffffff', borderWidth: 2, borderRadius: 20, height: 50, paddingHorizontal: 20, fontSize: 18, color: '#ffffff' }}
                        placeholder="Search Locations"
                    />
                    <View style={{ marginLeft: -34, marginRight: 20 }}>
                        <Icon style={{}} type={Icons.AntDesign} name="search1" size={18} color={'white'} />
                    </View>
                    <Button alignSelf="center" height={50} borderColor={'green'} marginHorizontal="$2" borderRadius={20} fontWeight={'$10'}>
                        <Icon style={{}} type={Icons.MaterialCommunityIcons} name="map" size={24} color={'green'} />
                        Map
                    </Button>
                </View>
            </View>
            <Separator borderColor={'white'} borderWidth={1} />
            <View style={styles.infocontainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.iconcontainer}>
                        <Icon style={{}} type={Icons.Feather} name="check-circle" size={20} color={'gray'} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 16 }}>Property Types</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginLeft: 16 }}>
                <PropertyTypesList />
            </View>
            <View>
                <CustomeBottomSheet
                    ref={CitybottomSheetRef}
                    CBSRef={CitybottomSheetRef}
                    setSelectedCity={(city: string) => setSelectedCity(city)}
                />
            </View>
        </View >
    )
}

export default SearchUserData;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        margin: 10,
    },
    infocontainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 16,
    },
    iconcontainer: {
        width: 40,
        height: 40,
        backgroundColor: '#e3e3e3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    togglebtnforpurpose: {
        width: 140,
        alignItems: 'center',
    },
    labelpurpose: {
        fontSize: 20,
        zIndex: 1,
    },
});

