import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const privacyPolicyList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo in ut arcu viverra justo fermentum et. Mi egestas orci in molestie maecenas at faucibus turpis et.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit vitae elementum nulla quis nunc, neque. Ullamcorper dolor quis nunc mauris id ultrices tellus. Auctor quis vel morbi eros euismod in ac luctus et. Urna malesuada elit sodales auctor diam purus vel.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, consequat lorem est, elementum. Eget mi tincidunt lectus porta ultricies nisl. Bibendum diam arcu eget ut dui.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat gravida orci nisl, tristique. Dui scelerisque sed ut in enim, quis turpis facilisi. Ante ut aliquam sed enim purus porttittor. Aliquet mauris sagittis auctor sagittis eu, ut faucibus laoreet ornare. Scelerisque auctor in sagittis scelerisque quis.',
];

const PrivacyPolicyScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {privacyPolicy()}
                </ScrollView>
            </View>
        </View>
    )

    function privacyPolicy() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                {
                    privacyPolicyList.map((item, index) => (
                        <Text key={`${index}`} style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                            {item}
                        </Text>
                    ))
                }
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
                    Privacy Policy
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
});

export default PrivacyPolicyScreen;