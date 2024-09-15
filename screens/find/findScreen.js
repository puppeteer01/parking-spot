import React, { useState, useEffect } from "react";
import { View, StatusBar, TouchableOpacity, Image, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

const FindScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            // Request permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            // Get the current location
            let { coords } = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primaryColor} />
                <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding * 2.0 }}>
                    Getting your location...
                </Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1 }}>
                {mapViewWithCurrentLocation()}
                {searchInfo()}
                {currentLocationIcon()}
            </View>
        </View>
    );

    function currentLocationIcon() {
        return (
            <View style={styles.currentLocationIconWrapStyle}>
                <MaterialIcons
                    name="my-location"
                    color={Colors.blackColor}
                    size={24}
                />
            </View>
        );
    }

    function searchInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Search')}
                style={styles.searchInfoWrapStyle}
            >
                <MaterialIcons
                    name="search"
                    color={Colors.primaryColor}
                    size={18}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor14Regular }}>
                    Search location here...
                </Text>
            </TouchableOpacity>
        );
    }

    function mapViewWithCurrentLocation() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
            >
                <Marker coordinate={location}>
                    <Image
                        source={require('../../assets/images/icons/marker.png')}
                        style={{ width: 50.0, height: 50.0, resizeMode: 'contain' }}
                    />
                </Marker>
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    searchInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 5.0,
        borderRadius: Sizes.fixPadding,
        position: 'absolute',
        top: StatusBar.currentHeight + Sizes.fixPadding * 4.0,
        left: 20.0,
        right: 20.0,
        height: 50.0,
        paddingHorizontal: Sizes.fixPadding,
        ...CommonStyles.shadow,
    },
    currentLocationIconWrapStyle: {
        position: 'absolute',
        bottom: 90.0,
        right: 20.0,
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4.0,
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.shadow
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
    }
});

export default FindScreen;
