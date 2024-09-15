import React, { useState, createRef, useCallback } from "react";
import { BackHandler, View, ScrollView, TouchableOpacity, StyleSheet, Text, Platform, TextInput, ActivityIndicator, Modal } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../../components/myStatusBar";
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
    const [isLoading, setisLoading] = useState(false);
    const [state, setState] = useState({
        userName: null,
        password: null,
        passwordSecure: true,
        backClickCount: 0
    });

    const backAction = () => {
        if (Platform.OS === "ios") {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
        } else {
            state.backClickCount == 1 ? BackHandler.exitApp() : _spring();
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

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { userName, password, passwordSecure, backClickCount } = state;

    function loading() {
        return (
            <Modal
                visible={isLoading}
                transparent={true}
                onRequestClose={() => setisLoading(false)}
            >
                <View style={styles.dialogContainerStyle}>
                    <ActivityIndicator size="large" color={Colors.primaryColor} />
                    <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding * 2.0 }}>
                        Please Wait...
                    </Text>
                </View>
            </Modal>
        );
    }

    function loginButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setisLoading(true);
                    setTimeout(() => {
                        setisLoading(false);
                        navigation.push('BottomTabBar');
                    }, 2000);
                }}
                style={styles.loginButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Login
                </Text>
            </TouchableOpacity>
        );
    }

    function passwordTextField() {
        const input = createRef();
        return (
            <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
                    name="lock-outline"
                    size={16}
                    color={Colors.grayColor}
                    onPress={() => { input.current.focus() }}
                />
                <TextInput
                    ref={input}
                    value={password}
                    onChangeText={(text) => updateState({ password: text })}
                    placeholder='Password'
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, ...Fonts.blackColor14Regular, marginHorizontal: Sizes.fixPadding - 2.0 }}
                    selectionColor={Colors.primaryColor}
                    secureTextEntry={passwordSecure}
                />
                <MaterialCommunityIcons
                    name={passwordSecure ? 'eye-off-outline' : 'eye-outline'}
                    size={16}
                    color={Colors.grayColor}
                    onPress={() => { updateState({ passwordSecure: !passwordSecure }) }}
                />
            </View>
        );
    }

    function userNameTextField() {
        const input = createRef();
        return (
            <View style={{ ...styles.textFieldWrapStyle, marginVertical: Sizes.fixPadding * 2.0 }}>
                <AntDesign
                    name="user"
                    size={16}
                    color={Colors.grayColor}
                    onPress={() => { input.current.focus() }}
                />
                <TextInput
                    ref={input}
                    value={userName}
                    onChangeText={(text) => updateState({ userName: text })}
                    placeholder='User Name'
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding - 2.0 }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        );
    }

    function header() {
        return (
            <Text style={styles.loginTitleStyle}>
                Login
            </Text>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
                >
                    {userNameTextField()}
                    {passwordTextField()}
                    {loginButton()}
                </ScrollView>
            </View>
            {loading()}
        </View>
    );
};

const styles = StyleSheet.create({
    loginTitleStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 6.0,
        marginBottom: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.blackColor20Medium,
    },
    textFieldWrapStyle: {
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding,
        borderColor: '#ececec',
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.shadow,
        height: 50,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    loginButtonStyle: {
        backgroundColor: Colors.primaryColor,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginBottom: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        ...CommonStyles.butonShadow
    },
    dialogContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0.5, 0.5)',
    }
});

export default LoginScreen;
