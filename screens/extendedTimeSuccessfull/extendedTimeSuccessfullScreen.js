import React, { useCallback } from "react";
import { BackHandler, View, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../../components/myStatusBar";

const ExtedTimeSuccessfullScreen = ({ navigation }) => {

    const backAction = () => {
        if (Platform.OS === "ios") {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
        } else {
            navigation.push('BottomTabBar');
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

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, justifyContent: 'center', }}>
                {successInfo()}
                {doneButton()}
            </View>
        </View>
    )

    function doneButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BottomTabBar')}
                style={styles.doneButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Done
                </Text>
            </TouchableOpacity>
        )
    }

    function successInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
                <View style={styles.successIconStyle}>
                    <MaterialIcons
                        name="done"
                        color={Colors.greenColor}
                        size={60}
                    />
                </View >
                <Text style={{ ...Fonts.blackColor20Medium }}>
                    Great!
                </Text>
                <Text style={styles.successfullyTextStyle}>
                    You’ve Successfully Extend Your Parking Time.
                </Text>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    doneButtonStyle: {
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
    successfullyTextStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 7.0,
        textAlign: 'center',
        ...Fonts.grayColor16Regular
    }
});

export default ExtedTimeSuccessfullScreen;