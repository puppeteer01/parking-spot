import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const transactionsHistoryList = [
    {
        id: '1',
        transactionTitle: 'Paid for parking',
        amount: 3.00,
        dateAndTime: '17 Oct, 11:30 am',
        addedToWallet: false,
        parkingSpotName: 'Lawnfield parks',
    },
    {
        id: '2',
        amount: 45.00,
        dateAndTime: '16 Oct, 10:12 am',
        addedToWallet: true,
        bankName: 'Bank of Baroda',
    },
    {
        id: '3',
        amount: 4.00,
        dateAndTime: '16 Oct, 10:00 am',
        addedToWallet: true,
        bankName: 'Bank of USA',
    },
    {
        id: '4',
        transactionTitle: 'BDA Complex',
        amount: 4.00,
        dateAndTime: '15 Oct, 11:30 am',
        addedToWallet: false,
        parkingSpotName: 'Lawnfield parks',
    },
    {
        id: '5',
        transactionTitle: 'Teacher’s Colony',
        amount: 3.50,
        dateAndTime: '14 Oct, 10:30 am',
        addedToWallet: false,
        parkingSpotName: 'Lawnfield parks',
    },
    {
        id: '6',
        transactionTitle: 'Paid for parking',
        amount: 3.00,
        dateAndTime: '17 Oct, 11:30 am',
        addedToWallet: false,
        parkingSpotName: 'Lawnfield parks',
    },
    {
        id: '7',
        amount: 45.00,
        dateAndTime: '16 Oct, 10:12 am',
        addedToWallet: true,
        bankName: 'Bank of Baroda',
    },
    {
        id: '8',
        amount: 4.00,
        dateAndTime: '16 Oct, 10:00 am',
        addedToWallet: true,
        bankName: 'Bank of USA',
    },
    {
        id: '9',
        transactionTitle: 'BDA Complex',
        amount: 4.00,
        dateAndTime: '15 Oct, 11:30 am',
        addedToWallet: false,
        parkingSpotName: 'Lawnfield parks',
    },
    {
        id: '10',
        transactionTitle: 'Teacher’s Colony',
        amount: 3.50,
        dateAndTime: '14 Oct, 10:30 am',
        addedToWallet: false,
        parkingSpotName: 'Lawnfield parks',
    },
];

const WalletScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {availableBalanceInfo()}
                {addMoneyAndToBankButton()}
                {divider()}
                {transactionHistoryInfo()}
            </View>
        </View>
    )

    function transactionHistoryInfo() {
        const renderItem = ({ item }) => (
            <View style={{ marginBottom: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, }}>
                    <Text style={{ flex: 1, ...Fonts.blackColor16Regular }}>
                        {item.addedToWallet
                            ?
                            'Added to wallet'
                            :
                            item.transactionTitle
                        }
                    </Text>
                    <Text style={{ flex: 1, ...Fonts.grayColor12Regular }}>
                        {item.addedToWallet
                            ?
                            item.bankName
                            :
                            item.parkingSpotName
                        }
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={item.addedToWallet ? { ...Fonts.greenColor16Regular } : { ...Fonts.redColor16Regular }}>
                        {`$`}{item.amount.toFixed(2)}
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        {item.dateAndTime}
                    </Text>
                </View>
            </View>
        )
        return (
            <FlatList
                ListHeaderComponent={
                    <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                        <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18Medium }}>
                            Transaction History
                        </Text>
                        <View>
                            <FlatList
                                data={transactionsHistoryList}
                                keyExtractor={(item) => `${item.id}`}
                                renderItem={renderItem}
                                scrollEnabled={false}
                            />
                        </View>
                    </View>
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
            />
        )
    }

    function divider() {
        return (
            <View style={styles.dividerStyle} />
        )
    }

    function addMoneyAndToBankButton() {
        return (
            <View style={styles.addMoneyAndToBankButtonWrapStyle}>
                <View style={styles.addMoneyAndToBankButtonStyle}>
                    <MaterialIcons
                        name="arrow-downward"
                        color={Colors.whiteColor}
                        size={20}
                    />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor16Medium }}>
                        Add Money
                    </Text>
                </View>
                <View style={styles.addMoneyAndToBankButtonStyle}>
                    <MaterialIcons
                        name="arrow-upward"
                        color={Colors.whiteColor}
                        size={20}
                    />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor16Medium }}>
                        To Bank
                    </Text>
                </View>
            </View>
        )
    }

    function availableBalanceInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Available Balance:
                </Text>
                <Text style={{ ...Fonts.primaryColor20Medium }}>
                    $199.25
                </Text>
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
                    Wallet
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
    addMoneyAndToBankButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        ...CommonStyles.butonShadow
    },
    dividerStyle: {
        backgroundColor: '#E6E6E6',
        height: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    addMoneyAndToBankButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
    }
});

export default WalletScreen;