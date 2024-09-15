import React, { useState } from "react";
import { View, Image, TextInput, StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps";
import { Key } from "../../constants/key";
import MapViewDirections from 'react-native-maps-directions';
import MyStatusBar from "../../components/myStatusBar";

const GetDirectionScreen = ({ navigation }) => {

    const [state, setState] = useState({
        fromLocation: null,
        toLocation: 'Lawnfield Parks',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        fromLocation,
        toLocation,
    } = state;

    const fromDefaultLocation = {
        latitude: 22.6293867,
        longitude: 88.4354486,
    };

    const toDefaultLocation = {
        latitude: 22.6292757,
        longitude: 88.444781,
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'height' : null} style={{ flex: 1 }}>
                {mapView()}
                {locationInfo()}
                {parkingSpotInfoWithCurrentLocationIcon()}
            </KeyboardAvoidingView>
        </View>
    )

    function parkingSpotInfoWithCurrentLocationIcon() {
        return (
            <View style={styles.parkingSpotInfoWithCurrentLocationIconWrapStyle}>
                <View style={styles.currentLocationIconWrapStyle}>
                    <MaterialIcons
                        name="my-location"
                        color={Colors.blackColor}
                        size={24}
                    />
                </View>
                <View style={styles.parkingSpotInfoWrapStyle}>
                    <Text style={{ ...Fonts.blackColor18Medium }}>
                        Lawnfield Parks
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        3891 Ranchview Dr. Richardson, California 62639
                    </Text>
                    <View style={styles.startButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor16Medium }}>
                            Start
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function locationInfo() {
        return (
            <View style={styles.locationInfoWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <View style={{ marginLeft: Sizes.fixPadding, marginRight: Sizes.fixPadding, alignItems: 'center' }}>
                    <FontAwesome5 name="dot-circle" size={18} color={Colors.whiteColor} />
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, lineHeight: 9.0, ...Fonts.whiteColor10Black }}>
                        {`•\n•\n•\n•\n•`}
                    </Text>
                    <SimpleLineIcons name="location-pin" size={20} color={Colors.whiteColor} />
                </View>
                <View style={styles.textFieldsOuterWrapStyle}>
                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            value={fromLocation}
                            onChangeText={(value) => updateState({ fromLocation: value })}
                            placeholder="Your Location"
                            placeholderTextColor={Colors.blackColor}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor16Regular, height: 20.0, flex: 1, }}
                        />
                    </View>
                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            value={toLocation}
                            onChangeText={(value) => updateState({ toLocation: value })}
                            style={{ ...Fonts.blackColor16Regular, height: 20.0, flex: 1, }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    function mapView() {
        return (
            <MapView
                style={{ flex: 1, }}
                initialRegion={{
                    latitude: 22.6292757,
                    longitude: 88.444781,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
            >
                <Marker coordinate={toDefaultLocation}>
                    <Image
                        source={require('../../assets/images/icons/marker4.png')}
                        style={{ width: 40.0, height: 40.0, marginBottom: Sizes.fixPadding - 15.0 }}
                    />
                </Marker>
                <Marker coordinate={fromDefaultLocation}>
                    <Image
                        source={require('../../assets/images/icons/marker3.png')}
                        style={{ width: 50.0, height: 50.0, }}
                    />
                </Marker>
                <MapViewDirections
                    origin={fromDefaultLocation}
                    destination={toDefaultLocation}
                    apikey={Key.apiKey}
                    lineDashPattern={[1]}
                    lineCap="square"
                    strokeColor={Colors.primaryColor}
                    strokeWidth={Platform.OS == 'ios' ? 2 : 5}
                />
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightWhiteColor
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
    },
    locationInfoWrapStyle: {
        backgroundColor: Colors.primaryColor,
        position: 'absolute',
        left: 0.0,
        right: 0.0,
        top: 0.0,
        flexDirection: 'row',
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 3.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderBottomLeftRadius: Sizes.fixPadding * 2.0,
        borderBottomRightRadius: Sizes.fixPadding * 2.0,
    },
    startButtonStyle: {
        marginTop: Sizes.fixPadding + 7.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignSelf: 'flex-start',
        elevation: 3.0,
        ...CommonStyles.butonShadow,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
    },
    parkingSpotInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding,
        elevation: 3.0,
    },
    textFieldsOuterWrapStyle: {
        flex: 0.9,
        marginBottom: Sizes.fixPadding - 17.0,
        marginTop: Sizes.fixPadding - 15.0,
        justifyContent: 'space-between'
    },
    currentLocationIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4.0,
        backgroundColor: Colors.whiteColor,
        alignSelf: 'flex-end',
        margin: Sizes.fixPadding * 2.0,
        ...CommonStyles.shadow,
    },
    parkingSpotInfoWithCurrentLocationIconWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        ...CommonStyles.shadow,
        elevation: 3.0,
    }
});

export default GetDirectionScreen;