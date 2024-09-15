import React from "react";
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const BookingSuccessfullScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {successInfo()}
                    {bookingDetail()}
                    {getDirectionButton()}
                    {notNowButton()}
                </ScrollView>
            </View>
        </View>
    )

    function notNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BottomTabBar')}
                style={styles.notNowButtonStyle}
            >
                <Text style={{ ...Fonts.primaryColor18Bold }}>
                    Not Now
                </Text>
            </TouchableOpacity>
        )
    }

    function getDirectionButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('GetDirection')}
                style={styles.getDirectionButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Get Direction
                </Text>
            </TouchableOpacity>
        )
    }

    function bookingDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginVertical: Sizes.fixPadding, ...Fonts.blackColor18Medium }}>
                    Booking Details
                </Text>
                {ticketInfo()}
                {vehicleInfo()}
                {vehicleNumberInfo()}
                {selectedSlotInfo()}
                {parkingSpotInfo()}
                {enterExitInfo()}
            </View>
        )
    }

    function enterExitInfo() {
        return (
            <View style={{ alignItems: 'center', marginVertical: Sizes.fixPadding, flexDirection: 'row', }}>
                <View>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Enter After
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        12:30 pm
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        Mon, Oct 17
                    </Text>
                </View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, letterSpacing: 2.0, ...Fonts.grayColor14Medium }}>
                    •••••••••••
                </Text>
                <View>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Exit Before
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        1:30pm
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        Mon, Oct 17
                    </Text>
                </View>
            </View>
        )
    }

    function parkingSpotInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Parking Spot:
                </Text>
                <Text>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        Lawnfield Parks
                    </Text>
                    <Text>
                        {` `}
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        3891 Ranchview Dr. Richardson, California
                    </Text>
                </Text>
            </View>
        )
    }

    function selectedSlotInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Selected Slot:
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                    B2: #B201
                </Text>
            </View>
        )
    }

    function vehicleNumberInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Vehicle Number:
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                    GJ05NC1710
                </Text>
            </View>
        )
    }

    function vehicleInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Vehicle:
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                    Toyota Metrix
                </Text>
            </View>
        )
    }

    function ticketInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Ticket Number:
                    </Text>
                    <Text>
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                            BOGY1710
                        </Text>
                        <Text style={{ ...Fonts.redColor12Regular }}>
                            {` `}(scan ticket when you reach parking lot)
                        </Text>
                    </Text>

                </View>
                <Image
                    source={require('../../assets/images/icons/qrCode.png')}
                    style={{ width: 60.0, height: 60.0, resizeMode: "contain" }}
                />
            </View>
        )
    }

    function successInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
                < View style={styles.successIconStyle}>
                    <MaterialIcons
                        name="done"
                        color={Colors.greenColor}
                        size={60}
                    />
                </View >
                <Text style={{ ...Fonts.blackColor20Medium }}>
                    Great!
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 7.0, textAlign: 'center', ...Fonts.grayColor16Regular }}>
                    You’ve Successfully Booked Parking Slot.
                </Text>
            </View >
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                    style={{ alignSelf: 'flex-start' }}
                />
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
        ...CommonStyles.shadow
    },
    successIconStyle: {
        borderColor: Colors.greenColor,
        width: 80.0,
        height: 80.0,
        borderRadius: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5.0,
        marginBottom: Sizes.fixPadding
    },
    getDirectionButtonStyle: {
        backgroundColor: Colors.primaryColor,
        ...CommonStyles.butonShadow,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginVertical: Sizes.fixPadding + 10.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
    notNowButtonStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderColor: '#eeeeee',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        ...CommonStyles.shadow,
    }
});

export default BookingSuccessfullScreen;