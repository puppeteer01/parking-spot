import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Image, StyleSheet, Text, ScrollView } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const durationsList = [
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

const ExtendParkingTimeScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedDurationIndex: 1,
        selectedPaymentModeIndex: 1,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedDurationIndex,
        selectedPaymentModeIndex,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {selectDurationInfo()}
                    {selectPaymentMethodInfo()}
                    {payButton()}
                </ScrollView>
            </View>
        </View>
    )

    function payButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('ExtendedTimeSuccessfull')}
                style={styles.payButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Pay $6.00
                </Text>
            </TouchableOpacity>
        )
    }

    function selectPaymentMethodInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Regular }}>
                    Select Payment Mode
                </Text>
                <View style={styles.paymentAcceptedOptionsWrapStyle}>
                    {paymentOptionsShort({
                        paymentIcon: require('../../assets/images/paymentIcons/wallet.png'),
                        paymentMethod: 'Wallet',
                        index: 1,
                    })}
                    {paymentOptionsShort({
                        paymentIcon: require('../../assets/images/paymentIcons/payOnSpot.png'),
                        paymentMethod: 'Pay on Spot',
                        index: 2,
                    })}
                    {paymentOptionsShort({
                        paymentIcon: require('../../assets/images/paymentIcons/creditCard.png'),
                        paymentMethod: 'Credit Card',
                        index: 3,
                    })}
                    {paymentOptionsShort({
                        paymentIcon: require('../../assets/images/paymentIcons/paypal.png'),
                        paymentMethod: 'Paypal',
                        index: 4,
                    })}
                </View>
            </View>
        )
    }

    function paymentOptionsShort({ paymentIcon, paymentMethod, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedPaymentModeIndex: index })}
                style={{
                    backgroundColor: selectedPaymentModeIndex == index ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.paymentOptionWrapStyle,
                    borderColor: selectedPaymentModeIndex == index ? 'rgba(251, 192, 45, 0.2)' : '#fcfcfc',
                }}
            >
                <Image
                    source={paymentIcon}
                    style={{ width: 25.0, height: 25.0, resizeMode: 'contain' }}
                />
                <Text numberOfLines={1} style={selectedPaymentModeIndex == index ? { ...Fonts.whiteColor14Regular } : { ...Fonts.grayColor14Regular }}>
                    {paymentMethod}
                </Text>
            </TouchableOpacity>
        )
    }

    function selectDurationInfo() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedDurationIndex: index })}
                style={{
                    borderColor: selectedDurationIndex == index ? 'rgba(251, 192, 45, 0.2)' : '#fcfcfc',
                    backgroundColor: selectedDurationIndex == index ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.durationInfoWrapStyle
                }}
            >
                <Text style={selectedDurationIndex == index ? { ...Fonts.whiteColor16Medium } : { ...Fonts.blackColor16Medium }}>
                    {item.time}
                </Text>
                <Text style={selectedDurationIndex == index ? { ...Fonts.whiteColor14Regular } : { ...Fonts.grayColor14Regular }}>
                    {`$`}{item.amount.toFixed(2)}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Regular }}>
                    Select Duration
                </Text>
                <FlatList
                    data={durationsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: Sizes.fixPadding, paddingLeft: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding - 5.0, }}
                />
            </View>
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
                />
                <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.blackColor20Medium }}>
                    Add Time
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
        ...CommonStyles.shadow
    },
    durationInfoWrapStyle: {
        borderRadius: Sizes.fixPadding,
        elevation: 3.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
        paddingVertical: Sizes.fixPadding - 6.0,
        marginRight: Sizes.fixPadding,
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
        elevation: 3.0,
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
    payButtonStyle: {
        backgroundColor: Colors.primaryColor,
        ...CommonStyles.butonShadow,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginVertical: Sizes.fixPadding * 4.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
});

export default ExtendParkingTimeScreen;