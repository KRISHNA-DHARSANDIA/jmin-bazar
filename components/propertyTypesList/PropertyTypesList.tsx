import React, { Component, useState, useMemo } from 'react';
import { Text, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import type { StackProps, TabLayout, TabsTabProps } from 'tamagui'
import {
    AnimatePresence,
    Tabs,
    YStack,
    styled,
    ToggleGroup
} from 'tamagui';
import Icon, { Icons } from '../../assets/Icon/Icons';

import { MyToggleGroupItemSm } from '../customComponent/CustomComponent';


const PropertyTypesList = () => {

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
            height={110}
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
                        {currentTab === 'HomeTab' && <HomeTypeScroll type={'home'} />}
                        {currentTab === 'PlotsTab' && <HomeTypeScroll type={'plots'} />}
                        {currentTab === 'CommercialTab' && <HomeTypeScroll type={'commercial'} />}
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

const HomeTypes = [
    { value: 'all', label: 'All', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    { value: 'house', label: 'House', icon: 'home-outline', icfamily: Icons.Ionicons },
    {
        value: 'flat', label: 'Flat', icon: 'checkmark-done-circle-outline',
        icfamily: Icons.Ionicons
    },
    { value: 'upperportion', label: 'Upper Portion', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    { value: 'lowerportion', label: 'Lower Portion', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    { value: 'farmhouse', label: 'Farm House', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    {
        value: 'room', label: 'Room', icon: 'checkmark-done-circle-outline',
        icfamily: Icons.Ionicons
    },
    { value: 'penthouse', label: 'Penthouse', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
];

const PlotsTypes = [
    { value: 'all', label: 'All', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    { value: 'house', label: 'Residental Plaot', icon: 'home-outline', icfamily: Icons.Ionicons },
    {
        value: 'flat', label: 'Commercial Ploat', icon: 'checkmark-done-circle-outline',
        icfamily: Icons.Ionicons
    },
    { value: 'upperportion', label: 'Upper Portion', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    { value: 'lowerportion', label: 'Lower Portion', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    { value: 'farmhouse', label: 'Farm House', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    {
        value: 'room', label: 'Room', icon: 'checkmark-done-circle-outline',
        icfamily: Icons.Ionicons
    },
    { value: 'penthouse', label: 'Penthouse', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
];

const CommercialTypes = [
    { value: 'all', label: 'All', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    { value: 'house', label: 'Residental Plaot', icon: 'home-outline', icfamily: Icons.Ionicons },
    {
        value: 'flat', label: 'Commercial Ploat', icon: 'checkmark-done-circle-outline',
        icfamily: Icons.Ionicons
    },
    { value: 'upperportion', label: 'Upper Portion', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    { value: 'lowerportion', label: 'Lower Portion', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    { value: 'farmhouse', label: 'Farm House', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
    {
        value: 'room', label: 'Room', icon: 'checkmark-done-circle-outline',
        icfamily: Icons.Ionicons
    },
    { value: 'penthouse', label: 'Penthouse', icon: 'checkmark-done-circle-outline', icfamily: Icons.Ionicons },
];

const HomeTypeScroll = ({ type }: { type: string }) => {

    const [SelectedType, setSelectedtype] = useState('flat');

    const handleTypeChnage = (value: string) => {
        setSelectedtype(value);
        console.log(type);
    };

    const renderItem = (item, index) => (
        <MyToggleGroupItemSm
            key={item.value}  // Ensure the key is unique and stable
            active={item.value === SelectedType}
            style={{ flexDirection: 'row' }}
            value={item.value}
        >
            <View style={{ marginRight: 6 }}>
                <Icon
                    type={item.icfamily}
                    name={item.icon}
                    size={24}
                    color={'gray'}
                />
            </View>
            <Text>{item.label}</Text>
        </MyToggleGroupItemSm>
    );

    // Memoize the lists to prevent unnecessary re-renders
    const memoizedHomeTypes = useMemo(() => HomeTypes.map(renderItem), [HomeTypes, SelectedType]);
    const memoizedPlotsTypes = useMemo(() => PlotsTypes.map(renderItem), [PlotsTypes, SelectedType]);
    const memoizedCommercialTypes = useMemo(() => CommercialTypes.map(renderItem), [CommercialTypes, SelectedType]);

    return (
        <ToggleGroup
            type="single"
            value={SelectedType}
            onValueChange={handleTypeChnage}
            //style={styles.ToggleGroup}
            borderRadius={20}
            backgroundColor={'$backgroundTransparent'}
            disableDeactivation={true}
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <YStack flexDirection="row"
                    alignItems="center" space="$3" margin={2}>
                    {type === 'home' && memoizedHomeTypes}
                    {type === 'plots' && memoizedPlotsTypes}
                    {type === 'commercial' && memoizedCommercialTypes}
                </YStack>
            </ScrollView>
        </ToggleGroup>
    );
};


export default PropertyTypesList;
