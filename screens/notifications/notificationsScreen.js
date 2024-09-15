import React, { useState, useRef } from "react";
import { View, StyleSheet, Image, Animated, Dimensions, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('window');

const notificationsList = [
    {
        key: '1',
        title: 'Lawnfield Parks',
        description: 'You successfully booked your parking slot.Your slot number is: B2: #B201'
    },
    {
        key: '2',
        title: 'Money Added',
        description: '$25.00 successfully added to your wallet.Updated Wallet balance is: $199.25'
    },
];

const rowTranslateAnimatedValues = {};

const NotificationsScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationsList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: ['0%', '100%'],
                        outputRange: ['0%', '100%'],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={styles.notificationWrapStyle}>
                    <View style={styles.notificationIconWrapStyle}>
                        <Ionicons
                            name="notifications-outline"
                            color={Colors.whiteColor}
                            size={20}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {data.item.title}
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Regular }}>
                            {data.item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View >
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack} />
    );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <View style={{  flex: 1, }}>
                    {listData.length == 0 ?
                        noNotification()
                        :
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-width}
                            leftOpenValue={width}
                            onSwipeValueChange={onSwipeValueChange}
                            useNativeDriver={false}
                            contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0, }}
                        />
                    }
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                    >
                        <Text style={{ ...Fonts.whiteColor14Medium }}>
                            {snackBarMsg}
                        </Text>
                    </Snackbar>
                </View>
            </View>
        </View>
    );

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
                    Notifications
                </Text>
            </View>
        )
    }

    function noNotification() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Image
                    source={require('../../assets/images/icons/notification.png')}
                    style={{ width: 50.0, height: 50.0, resizeMode: 'contain' }}
                />
                <Text style={{ ...Fonts.grayColor16Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                    No new notifications
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
        ...CommonStyles.shadow,
    },
    notificationIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
        elevation: 5.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        ...CommonStyles.shadow
    },
    notificationWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        ...CommonStyles.shadow
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
        marginBottom: Sizes.fixPadding,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    },
});

export default NotificationsScreen;