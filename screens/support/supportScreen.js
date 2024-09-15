import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput, StyleSheet, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const SupportScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        support: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        name,
        email,
        support,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
                    {nameTextField()}
                    {emailTextField()}
                    {supportTextField()}
                    {submitButton()}
                </ScrollView>
            </View>
        </View>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.submitButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Submit
                </Text>
            </TouchableOpacity>
        )
    }

    function supportTextField() {
        return (
            <TextInput
                placeholder="Write Here"
                multiline={true}
                numberOfLines={6}
                value={support}
                onChangeText={text => updateState({ support: text })}
                style={{
                    ...styles.textFieldStyle,
                    paddingTop: Platform.OS == 'ios' ? Sizes.fixPadding : null,
                    height: Platform.OS == 'ios' ? 100.0 : null
                }}
                selectionColor={Colors.primaryColor}
                placeholderTextColor={Colors.grayColor}
                textAlignVertical="top"
            />
        )
    }

    function emailTextField() {
        return (
            <TextInput
                placeholder="Email"
                placeholderTextColor={Colors.grayColor}
                value={email}
                onChangeText={text => updateState({ email: text })}
                style={{ ...styles.textFieldStyle, height: 50.0, }}
                selectionColor={Colors.primaryColor}
                keyboardType="email-address"
            />
        )
    }

    function nameTextField() {
        return (
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={text => updateState({ name: text })}
                style={{ ...styles.textFieldStyle, height: 50.0, marginTop: Sizes.fixPadding * 2.0 }}
                selectionColor={Colors.primaryColor}
                placeholderTextColor={Colors.grayColor}
            />
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
                    Support
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
    textFieldStyle: {
        ...Fonts.blackColor14Regular,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        ...CommonStyles.shadow,
    },
    submitButtonStyle: {
        backgroundColor: Colors.primaryColor,
        ...CommonStyles.butonShadow,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginVertical: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
});

export default SupportScreen;