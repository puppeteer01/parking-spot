import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Image, StyleSheet, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import MyStatusBar from "../../components/myStatusBar";

const facilitiesIcon = [
    require('../../assets/images/facilities/facility1.png'),
    require('../../assets/images/facilities/facility2.png'),
    require('../../assets/images/facilities/facility3.png'),
    require('../../assets/images/facilities/facility4.png'),
];

const parkingRateList = [
    {
        id: '1',
        time: '30 min',
        amount: 3.00,
    },
    {
        id: '2',
        time: '1 hour',
        amount: 6.00,
    },
    {
        id: '3',
        time: '2 hour',
        amount: 8.00,
    },
    {
        id: '4',
        time: '4 hour',
        amount: 10.00,
    },
    {
        id: '5',
        time: '6 hour',
        amount: 14.00,
    },
    {
        id: '6',
        time: '8 hour',
        amount: 16.00,
    },
    {
        id: '7',
        time: '12 hour',
        amount: 20.00,
    },
];

const reviewsAndRatingsList = [
    {
        id: '1',
        userImage: require('../../assets/images/users/user1.png'),
        username: 'Jane Cooper',
        rating: 5.0,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo feugiat viverra volutpat, vivamus.',
    },
    {
        id: '2',
        userImage: require('../../assets/images/users/user2.png'),
        username: 'Arlene McCoy',
        rating: 5.0,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo feugiat viverra volutpat, vivamus.',
    },
];

const ParkingPlaceDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [state, setState] = useState({
        isFavourite: false,
        showSnackBar: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        isFavourite,
        showSnackBar,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                <CollapsibleToolbar
                    renderContent={() => pageContent()}
                    renderNavBar={() => backArrow()}
                    renderToolBar={() => vehicaleInfoWithOptions()}
                    collapsedNavBarBackgroundColor={Colors.primaryColor}
                    toolBarHeight={300}
                    showsVerticalScrollIndicator={false}
                />
                {bookNowButton()}
                {snackBar()}
            </View>
        </View>
    )

    function snackBar() {
        return (
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
                elevation={0}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {isFavourite ? 'Added to Favourite' : 'Removed from Favourite'}
                </Text>
            </Snackbar>
        )
    }

    function pageContent() {
        return (
            <View style={styles.vehicaleDetailInfoWrapStyle}>
                {parkingDetail()}
                {availableFacilitiesInfo()}
                {parkingRateInfo()}
                {paymentAcceptedInfo()}
                {reviewAndRatingInfo()}
            </View>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name="arrow-back-ios"
                color={Colors.whiteColor}
                size={24}
                onPress={() => navigation.pop()}
                style={{ alignSelf: 'flex-start', marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Platform.OS == 'ios' ? 0 : Sizes.fixPadding + 5.0 }}
            />
        )
    }

    function vehicaleInfoWithOptions() {
        return (
            <View style={{ width: '100%' }}>
                <Image
                    source={require('../../assets/images/parkingSpots/parkingSpot1.png')}
                    style={{ width: '100%', height: 300 }}
                />
                {seeLocationAndShareAndCallButton()}
            </View>
        )
    }

    function bookNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BookSlot')}
                style={styles.bookNowButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Book Now
                </Text>
            </TouchableOpacity>
        )
    }

    function reviewAndRatingInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Regular }}>
                    Review and Rating
                </Text>
                {
                    reviewsAndRatingsList.map((item) => (
                        <View
                            key={`${item.id}`}
                            style={{ flexDirection: 'row', marginBottom: Sizes.fixPadding - 5.0, }}
                        >
                            <Image
                                source={item.userImage}
                                style={{ width: 50.0, height: 50.0, }}
                            />
                            <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                                <Text style={{ ...Fonts.blackColor14Medium }}>
                                    {item.username}
                                </Text>
                                {showRating({ number: item.rating })}
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    {item.review}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }

    function paymentAcceptedInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Regular }}>
                    Payment Accepted
                </Text>
                <View style={styles.paymentAcceptedOptionsWrapStyle}>
                    {paymentOptionsShort({
                        paymentIcon: require('../../assets/images/paymentIcons/wallet.png'),
                        paymentMethod: 'Wallet'
                    })}
                    {paymentOptionsShort({
                        paymentIcon: require('../../assets/images/paymentIcons/payOnSpot.png'),
                        paymentMethod: 'Pay on Spot'
                    })}
                    {paymentOptionsShort({
                        paymentIcon: require('../../assets/images/paymentIcons/creditCard.png'),
                        paymentMethod: 'Credit Card'
                    })}
                    {paymentOptionsShort({
                        paymentIcon: require('../../assets/images/paymentIcons/paypal.png'),
                        paymentMethod: 'Paypal'
                    })}
                </View>
            </View>
        )
    }

    function paymentOptionsShort({ paymentIcon, paymentMethod }) {
        return (
            <View style={styles.paymentOptionWrapStyle}>
                <Image
                    source={paymentIcon}
                    style={{ width: 25.0, height: 25.0, resizeMode: 'contain' }}
                />
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                    {paymentMethod}
                </Text>
            </View>
        )
    }

    function parkingRateInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.parkingRateInfoWrapStyle}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    {item.time}
                </Text>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    {`$`}{item.amount.toFixed(2)}
                </Text>
            </View>
        )
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Regular }}>
                    Parking Rate
                </Text>
                <FlatList
                    data={parkingRateList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: Sizes.fixPadding, paddingLeft: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding, }}
                />
            </View>
        )
    }

    function availableFacilitiesInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Regular }}>
                    Available Facilities
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {facilitiesIcon.map((item, index) => (
                        <Image
                            key={`${index}`}
                            source={item}
                            style={{
                                width: 18.0, height: 18.0, resizeMode: 'contain',
                                marginRight: Sizes.fixPadding + 5.0
                            }}
                        />
                    ))}
                </View>
            </View>
        )
    }

    function parkingDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, }}>
                    <Text style={{ ...Fonts.blackColor18Medium }}>
                        {item.parkingSpotName}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                        {item.parkingSpotAddress}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 8.0, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: Sizes.fixPadding, ...Fonts.grayColor12Regular }}>
                            5.0 Rating
                        </Text>
                        {showRating({ number: 5.0 })}
                    </View>
                </View>
                <Ionicons
                    name={isFavourite ? "heart" : "heart-outline"}
                    size={26}
                    color={Colors.blackColor}
                    onPress={() => updateState({ isFavourite: !isFavourite, showSnackBar: true, })}
                />
            </View>
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
                            size={16}
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
                            size={16}
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
                            size={16}
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
                            size={16}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0) ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
            </View>
        )
    }

    function seeLocationAndShareAndCallButton() {
        return (
            <View style={styles.seeLocationAndShareAndCallButtonWrapStyle}>
                <View style={styles.seeLocationButtonStyle}>
                    <SimpleLineIcons name="location-pin" size={16} color={Colors.whiteColor} />
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.whiteColor18Bold }}>
                        See Location
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        ...styles.shareAndCallIconWrapStyle,
                        marginRight: Sizes.fixPadding,
                    }}>
                        <MaterialIcons
                            name="share"
                            color={Colors.whiteColor}
                            size={24}
                        />
                    </View>
                    <View style={styles.shareAndCallIconWrapStyle}>
                        <MaterialIcons
                            name="phone"
                            color={Colors.whiteColor}
                            size={24}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageStyle: {
        marginBottom: Sizes.fixPadding * 8.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding,
    },
    shareAndCallIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: Colors.primaryColor,
        shadowColor: Colors.primaryColor,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        alignItems: 'center', justifyContent: 'center',
    },
    seeLocationButtonStyle: {
        backgroundColor: Colors.primaryColor,
        shadowColor: Colors.primaryColor,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
    },
    seeLocationAndShareAndCallButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 40.0,
        left: 20.0,
        right: 20.0,
    },
    parkingRateInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        elevation: 3.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
        paddingVertical: Sizes.fixPadding - 6.0,
        marginRight: Sizes.fixPadding,
        borderColor: '#fcfcfc',
        borderWidth: 1.0,
        ...CommonStyles.shadow
    },
    paymentAcceptedOptionsWrapStyle: {
        marginHorizontal: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    paymentOptionWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: '#fcfcfc',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: Sizes.fixPadding - 5.0,
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        ...CommonStyles.shadow
    },
    bookNowButtonStyle: {
        backgroundColor: Colors.primaryColor,
        ...CommonStyles.butonShadow,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 65.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
    },
    vehicaleDetailInfoWrapStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        top: -20.0,
        paddingTop: Sizes.fixPadding + 5.0,
    }
});

export default ParkingPlaceDetailScreen;