import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, Text, Keyboard, Dimensions } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import OTPField from 'react-native-otp-field';
import MyStatusBar from "../../components/myStatusBar"
import { Modal, ActivityIndicator } from 'react-native-paper';

const { width } = Dimensions.get('window');

const VerificationScreen = ({ navigation }) => {

    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}
                >
                    {verificationInfo()}
                    {otpFields()}
                    {resendInfo()}
                    {continueButton()}
                </ScrollView>
            </View>
            {loading()}
        </View>
    )

    function loading() {
        return (
            <Modal
                visible={isLoading}
                onDismiss={() => { setisLoading(false) }}
                contentContainerStyle={styles.dialogContainerStyle}
            >
                <View style={{ alignItems: 'center', margin: Sizes.fixPadding * 2.0 }}>
                    <ActivityIndicator color={Colors.primaryColor} size={40} />
                    <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding * 2.0 }}>
                        Please Wait...
                    </Text>
                </View>
            </Modal>
        );
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setisLoading(true)
                    setTimeout(() => {
                        setisLoading(false)
                        navigation.push('BottomTabBar')
                    }, 2000);
                }}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function resendInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Don’t rerceive code?
                </Text>
                <Text
                    onPress={() => navigation.push('Login')}
                    style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor16Medium }}
                >
                    Resend
                </Text>
            </View>
        )
    }

    function otpFields() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <OTPField
                    length={4}
                    value={otpInput}
                    onChange={(val) => {
                        setotpInput(val);
                        if (val.length == 4) {
                            Keyboard.dismiss();
                            setisLoading(true)
                            setTimeout(() => {
                                setisLoading(false)
                                navigation.push('BottomTabBar')
                            }, 2000);
                        }
                    }}
                    textFieldStyle={{ ...styles.textFieldStyle }}
                    containerStyle={{ justifyContent: 'center' }}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function verificationInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={styles.registerTitleStyle}>
                    Verification
                </Text>
                <Text style={{ textAlign: 'center', ...Fonts.grayColor16Regular }}>
                    We’ll send you a One Time Password on
                    register mobile number
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <MaterialIcons
                name="arrow-back-ios"
                color={Colors.blackColor}
                size={22}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start' }}
            />
        )
    }
}

const styles = StyleSheet.create({
    registerTitleStyle: {
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.blackColor20Medium,
    },
    dialogContainerStyle: {
        backgroundColor: Colors.whiteColor,
        width: '85%',
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding
    },
    textFieldStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        borderWidth: 1.0,
        borderColor: '#fcfcfc',
        elevation: 3.0,
        ...CommonStyles.shadow,
        ...Fonts.blackColor18Medium,
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding - 8.0,
        width: width / 8.5,
        height: width / 8.5,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        shadowColor: Colors.primaryColor,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginBottom: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
});

export default VerificationScreen;