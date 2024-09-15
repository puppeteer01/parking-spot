import React, { useState } from "react";
import { View, Image, ScrollView, TextInput, TouchableOpacity, Modal, StyleSheet, Text, } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const EditProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: 'Samantha Smith',
        email: 'smithsamantha@gmail.com',
        mobileNo: '+91 1236547890',
        password: '12345678901',
        showBottomSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        mobileNo,
        password,
        showBottomSheet,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
                    {changeProfilePic()}
                    {nameInfo()}
                    {emailInfo()}
                    {mobileNumberInfo()}
                    {passwordInfo()}
                    {updateProfileButton()}
                </ScrollView>
                {changeProfilePicOptionsSheet()}
            </View>
        </View>
    )

    function changeProfilePicOptionsSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showBottomSheet}
                onRequestClose={() => {
                    updateState({ showBottomSheet: false })
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        updateState({ showBottomSheet: false });
                    }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.logoutDialogStyle}
                        >
                            <View style={styles.changeProfilePicBottomSheetStyle}>
                                <View style={styles.bottomSheetIndicatorStyle} />
                                <Text style={{ ...Fonts.blackColor18Medium, textAlign: 'center' }}>
                                    Choose Option
                                </Text>
                                <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                                    <Text
                                        onPress={() => updateState({ showBottomSheet: false })}
                                        style={{ ...Fonts.blackColor14Regular, }}
                                    >
                                        Take a picture
                                    </Text>
                                </View>
                                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                                    <Text
                                        onPress={() => updateState({ showBottomSheet: false })}
                                        style={{ ...Fonts.blackColor14Regular, }}
                                    >
                                        Select from gallery
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function updateProfileButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.updateProfileButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Update Profile
                </Text>
            </TouchableOpacity>
        )
    }

    function passwordInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Password
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        value={password}
                        onChangeText={(value) => updateState({ password: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        secureTextEntry={true}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Mobile Number
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={mobileNo}
                        onChangeText={(value) => updateState({ mobileNo: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Email Address
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        value={email}
                        onChangeText={(value) => updateState({ email: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        selectionColor={Colors.primaryColor}
                        keyboardType="email-address"
                    />
                </View>
            </View>
        )
    }

    function nameInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Name
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        value={name}
                        onChangeText={(value) => updateState({ name: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    function changeProfilePic() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ showBottomSheet: true })}
                style={{ margin: Sizes.fixPadding * 2.0, alignItems: 'center' }}
            >
                <Image
                    source={require('../../assets/images/users/user3.png')}
                    style={{ width: 100.0, height: 100.0, borderRadius: 50.0, }}
                />
                <View style={styles.changeOptionWrapStyle}>
                    <Ionicons
                        name="camera-outline"
                        color={Colors.whiteColor}
                        size={16}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor12Medium }}>
                        Change
                    </Text>
                </View>
            </TouchableOpacity>
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
                    Edit Profile
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
    changeOptionWrapStyle: {
        position: 'absolute',
        bottom: -5.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        elevation: 8.0,
        shadowColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding - 8.0,
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor:'#eeeeee',
        borderWidth:1.0,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        ...CommonStyles.shadow
    },
    updateProfileButtonStyle: {
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
    changeProfilePicBottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding + 5.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
    },
    bottomSheetIndicatorStyle: {
        backgroundColor: Colors.primaryColor,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding - 5.0, height: 2.0,
        width: 120.0,
        marginVertical: Sizes.fixPadding,
    }
});

export default EditProfileScreen;