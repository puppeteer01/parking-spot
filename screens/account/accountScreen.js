import React, { useState } from "react";
import { View, Image, TouchableOpacity, ScrollView, Modal, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const AccountScreen = ({ navigation }) => {

    const [showLogoutDialog, setshowLogoutDialog] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                >
                    {accountInfo()}
                    {profileOptions()}
                    {logoutOption()}
                </ScrollView>
                {logoutDialog()}
            </View>
        </View>
    )

    function logoutDialog() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={showLogoutDialog}
                onRequestClose={() => {
                    setshowLogoutDialog(false)
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setshowLogoutDialog(false);
                    }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.logoutDialogStyle}
                        >
                            <View>
                                <Text style={{ textAlign: 'center', ...Fonts.blackColor18Medium, }}>
                                    Sure you want to Logout?
                                </Text>
                                <View style={{ marginTop: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => setshowLogoutDialog(false)}
                                        style={styles.cancelButtonStyle}
                                    >
                                        <Text style={{ ...Fonts.primaryColor18Bold }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            setshowLogoutDialog(false)
                                            navigation.push('Login')
                                        }}
                                        style={styles.logoutButtonStyle}
                                    >
                                        <Text style={{ ...Fonts.whiteColor18Bold }}>
                                            Logout
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function logoutOption() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setshowLogoutDialog(true)}
                style={styles.profileOptionWrapStyle}
            >
                <Text style={{ flex: 1, ...Fonts.primaryColor16Regular }}>
                    Logout
                </Text>
                <MaterialIcons
                    name="arrow-forward-ios"
                    color={Colors.primaryColor}
                    size={12}
                />
            </TouchableOpacity>
        )
    }

    function profileOptions() {
        return (
            <View>
                {profileOptionsSort({ option: 'Wallet', navigateTo: 'Wallet' })}
                {profileOptionsSort({ option: 'My Vehicles', navigateTo: 'Vehicles' })}
                {profileOptionsSort({ option: 'Notifications', navigateTo: 'Notifications' })}
                {profileOptionsSort({ option: 'Favorites', navigateTo: 'Favorites' })}
                {profileOptionsSort({ option: 'Invite Friends', navigateTo: 'InviteFriends' })}
                {profileOptionsSort({ option: 'Support', navigateTo: 'Support' })}
                {profileOptionsSort({ option: 'Privacy Policy', navigateTo: 'PrivacyPolicy' })}
            </View>
        )
    }

    function profileOptionsSort({ option, navigateTo }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push(navigateTo)}
                style={styles.profileOptionWrapStyle}
            >
                <Text style={{ flex: 1, ...Fonts.blackColor16Regular }}>
                    {option}
                </Text>
                <MaterialIcons
                    name="arrow-forward-ios"
                    color={Colors.blackColor}
                    size={12}
                />
            </TouchableOpacity>
        )
    }

    function accountInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('EditProfile', { id: 'photo' })}
                style={styles.accountInfoWrapStyle}
            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/users/user3.png')}
                        style={{ width: 60.0, height: 60.0, borderRadius: 30.0, }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.blackColor18Medium }}>
                            Samantha Smith
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            +91 1236547890
                        </Text>
                    </View>
                </View>
                <View style={styles.editButtonStyle}>
                    <Image
                        source={require('../../assets/images/icons/edit.png')}
                        style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Medium }}>
                    Account
                </Text>
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
    editButtonStyle: {
        backgroundColor: Colors.primaryColor,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        ...CommonStyles.butonShadow
    },
    accountInfoWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileOptionWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        borderColor: '#E6E6E6',
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoutDialogStyle: {
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding * 2.0,
        width: '85%',
        alignSelf: 'center'
    },
    cancelButtonStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: '#ececec',
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding,
        ...CommonStyles.shadow
    },
    logoutButtonStyle: {
        backgroundColor: Colors.primaryColor,
        elevation: 3.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primaryColor,
        marginLeft: Sizes.fixPadding,
        ...CommonStyles.butonShadow
    }
});

export default AccountScreen;