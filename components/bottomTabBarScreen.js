import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler,  Platform } from "react-native";
import { Colors, Fonts, Sizes,CommonStyles } from "../constants/styles";
import FindScreen from "../screens/find/findScreen";
import BookingScreeen from "../screens/booking/bookingScreeen";
import AccountScreen from "../screens/account/accountScreen";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "./myStatusBar";

const BottomTabBarScreen = ({ navigation }) => {

    const backAction = () => {
        if (Platform.OS === "ios") {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
        } else {
            backClickCount == 1 ? BackHandler.exitApp() : _spring();
            return true;
        }
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            navigation.addListener("gestureEnd", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
                navigation.removeListener("gestureEnd", backAction);
            };
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        currentIndex: 1,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, backClickCount } = state;

    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar />
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                {currentIndex == 1 ?
                    <BookingScreeen navigation={navigation} /> :
                    currentIndex == 2 ?
                        <FindScreen navigation={navigation} />
                        :
                        <AccountScreen navigation={navigation} />
                }
                <View style={styles.bottomTabBarStyle}>
                    {bottomTabBarItem({
                        index: 1,
                        icon: require('../assets/images/icons/booking.png'),
                        tabName: 'Booking',
                    })}
                    {bottomTabBarItem({
                        index: 2,
                        icon: require('../assets/images/icons/find.png'),
                        tabName: 'Find',
                    })}
                    
                    {bottomTabBarItem({
                        index: 3,
                        icon: require('../assets/images/icons/account.png'),
                        tabName: 'Account',
                    })}
                </View>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </View>
    )

    function bottomTabBarItem({ index, icon, tabName }) {
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ currentIndex: index })}
                    style={{
                        ...styles.tabIconWrapStyle,
                        backgroundColor: currentIndex == index ? Colors.primaryColor : Colors.grayColor,
                    }}
                >
                    <Image
                        source={icon}
                        style={{ width: 15.0, height: 15.0, resizeMode: 'contain', tintColor: Colors.whiteColor }}
                    />
                </TouchableOpacity>
                <Text style={currentIndex == index ? { ...Fonts.primaryColor14Bold } : { ...Fonts.grayColor14Bold }}>
                    {tabName}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 67.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1.0,
        elevation: 2.0,
        ...CommonStyles.shadow
    },
    tabIconWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30.0, height: 30.0,
        borderRadius: 15.0,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default BottomTabBarScreen;