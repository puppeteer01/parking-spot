import React from "react";
import { View, Dimensions, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const { height } = Dimensions.get('window');

const InviteFriendsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {inviteFriendsInfo()}
                {inviteNowButton()}
            </View>
        </View>
    )

    function inviteNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.inviteNowButtonStyle}
            >
                <Text style={{ ...Fonts.primaryColor18Bold }}>
                    Invite Now
                </Text>
            </TouchableOpacity>
        )
    }

    function inviteFriendsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flex: 1, justifyContent: 'center' }}>
                <Image
                    source={require('../../assets/images/inviteFriends.png')}
                    style={{ width: '100%', height: height / 2.0, resizeMode: 'contain' }}
                />
                <Text style={{ textAlign: 'center', ...Fonts.whiteColor14Regular }}>
                    Earn $5.00 for every referral who completes account opening successfully.
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.whiteColor20Medium }}>
                    Invite Friends
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
        backgroundColor: Colors.primaryColor,
    },
    inviteNowButtonStyle: {
        backgroundColor: Colors.whiteColor,
        shadowColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    }
});

export default InviteFriendsScreen;