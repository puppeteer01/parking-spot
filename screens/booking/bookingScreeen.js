import React, { useState, useRef } from "react";
import { View, Dimensions, FlatList, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, SimpleLineIcons, Ionicons, } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import CountDownTimer from 'react-native-countdown-timer-hooks';

const { width } = Dimensions.get('window');

const ongoingBookingList = [
    {
        id: '1',
        parkingSpotName: 'County Offices',
        timeRemainingInMin: 60,
        vehicleImage: require('../../assets/images/cars/car1.png'),
    },
];

const historyBookingsList = [
    {
        id: '1',
        parkingSpotImage: require('../../assets/images/parkingSpots/parkingSpot4.png'),
        parkingSpotName: 'BDA Complex',
        parkingSpotAddress: '4140 Parker Rd. Allentown, New Mexico 31134',
        rating: 5.0,
        amountPerHour: 5,
        isFavorite: false,
    },
    {
        id: '2',
        parkingSpotImage: require('../../assets/images/parkingSpots/parkingSpot3.png'),
        parkingSpotName: 'Teacher’s Colony',
        parkingSpotAddress: '2715 Ash Dr. San Jose, South Dakota 83475',
        rating: 5.0,
        amountPerHour: 4,
        isFavorite: false,
    },
    {
        id: '3',
        parkingSpotImage: require('../../assets/images/parkingSpots/parkingSpot2.png'),
        parkingSpotName: 'Jaggasandra',
        parkingSpotAddress: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
        rating: 5.0,
        amountPerHour: 4,
        isFavorite: false,
    }
];

const BookingScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedTabIndex: 1,
        historyBookingsData: historyBookingsList,
        snackBarMsg: null,
        showSnackBar: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedTabIndex,
        historyBookingsData,
        snackBarMsg,
        showSnackBar,
    } = state;

    const refTimer = useRef();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1 }}>
                {header()}
                {onGoingAndHistoryTab()}
                {
                    selectedTabIndex == 1
                        ?
                        ongoingBookings()
                        :
                        historyBookings()
                }
            </View>
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {snackBarMsg}
                </Text>
            </Snackbar>
        </View>
    )

    function updateHistoryBookings({ id }) {
        const newList = historyBookingsData.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isFavorite: !item.isFavorite };
                updateState({ snackBarMsg: updatedItem.isFavorite ? `${updatedItem.parkingSpotName} Added To Favorite` : `${updatedItem.parkingSpotName} Removed From Favorite` })
                return updatedItem;
            }
            return item;
        });
        updateState({ historyBookingsData: newList })
    }

    function historyBookings() {
        const renderItem = ({ item }) => (
            <View style={styles.historyBookingsWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Image
                            source={item.parkingSpotImage}
                            style={{
                                width: width * 0.3,
                                height: 115.0,
                                borderRadius: Sizes.fixPadding - 8.0,
                            }}
                        />
                        <View style={styles.amountPerHourWrapStyle}>
                            <Text style={{ ...Fonts.whiteColor12Bold }}>
                                {`$`}{item.amountPerHour}/hr
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Regular }}>
                            {item.parkingSpotName}
                        </Text>
                        <Text numberOfLines={2} style={{ ...Fonts.grayColor14Regular }}>
                            {item.parkingSpotAddress}
                        </Text>
                        <View style={{ marginVertical: Sizes.fixPadding - 5.0, }}>
                            {showRating({ number: item.rating })}
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.push('BookSlot')}
                            style={styles.bookNowButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor16Bold }}>
                                Book Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Ionicons
                    name={item.isFavorite ? "heart" : "heart-outline"}
                    size={21}
                    color={Colors.blackColor}
                    onPress={() => {
                        updateHistoryBookings({ id: item.id })
                        updateState({ showSnackBar: true })
                    }}
                />
            </View>
        )
        return (
            <FlatList
                data={historyBookingsData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, paddingTop: Sizes.fixPadding - 9.0 }}
            />
        )
    }

    function showRating({ number }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 || number == 1.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={14}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={14}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={14}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0 || number == 4.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={14}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0) ?
                        <MaterialIcons
                            name="star"
                            size={14}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
            </View>
        )
    }

    function ongoingBookings() {
        const renderItem = ({ item }) => (
            <View style={styles.ongoingBookingInfoWrapStyle}>
                <View style={styles.timingAndParkingInfoWrapStyle}>
                    <View style={{ flex: 1, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SimpleLineIcons
                                name="location-pin"
                                size={18}
                                color={Colors.blackColor}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Regular }}>
                                {item.parkingSpotName}
                            </Text>
                        </View>
                        <View style={{ marginBottom: Sizes.fixPadding, marginTop: Sizes.fixPadding + 5.0, }}>
                            <Text style={{ ...Fonts.grayColor14Regular }}>
                                Time remaining
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <CountDownTimer
                                    ref={refTimer}
                                    timestamp={(item.timeRemainingInMin * 60)}
                                    textStyle={{ ...Fonts.blackColor20Medium }}
                                />
                                <Text style={{ ...Fonts.blackColor20Medium }}>
                                    { } min
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end', width: width / 2.8, }}>
                        <Image
                            source={require('../../assets/images/parking.png')}
                            style={{ position: 'absolute', left: 5.0, top: 0.0, }}
                        />
                        <Image
                            source={require('../../assets/images/cars/car1.png')}
                            style={{ width: '100%', height: 70.0, resizeMode: 'stretch' }}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('ExtendParkingTime')}
                    style={styles.addTimeButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                        Add Time
                    </Text>
                </TouchableOpacity>
            </View>
        )
        return (
            <FlatList
                data={ongoingBookingList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding - 8.0, }}
            />
        )
    }

    function onGoingAndHistoryTab() {
        return (
            <View style={styles.onGoingAndHistoryTabWrapStyle}>
                {tabOptions({ option: 'Ongoing', index: 1, })}
                {tabOptions({ option: 'Book Slot', index: 2, })}
            </View>
        )
    }

    function tabOptions({ option, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (index === 2) {
                        navigation.push('BookSlot');
                    } else {
                        updateState({ selectedTabIndex: index });
                    }
                }}
                style={{
                    backgroundColor: selectedTabIndex == index ? Colors.whiteColor : '#E6E6E6',
                    ...styles.tabBarOptionStyle,
                }}>
                <Text style={{ ...Fonts.blackColor16Regular }}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Medium }}>
                    Booking
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    tabBarOptionStyle: {
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    onGoingAndHistoryTabWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6E6E6',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding - 6.0,
    },
    addTimeButtonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 2.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
    },
    ongoingBookingInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        ...CommonStyles.shadow
    },
    timingAndParkingInfoWrapStyle: {
        paddingTop: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    amountPerHourWrapStyle: {
        position: 'absolute',
        backgroundColor: Colors.primaryColor,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    bookNowButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        alignSelf: 'flex-start',
        elevation: 2.0,
        shadowColor: Colors.primaryColor,
    },
    historyBookingsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        borderColor: '#ececec',
        borderWidth: 1.0,
        ...CommonStyles.shadow
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 60.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    }
});

export default BookingScreen;