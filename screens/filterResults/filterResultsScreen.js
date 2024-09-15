import React, { useState, createRef, useEffect } from "react";
import { View, Dimensions, Animated, StyleSheet, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('window');

const parkingSpotList = [
    {
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486,
        },
        id: '1',
        parkingImage: require('../../assets/images/parkingSpots/parkingSpot1.png'),
        parkingSpotName: 'Hauz Khas',
        parkingSpotAddress: 'Thornridge cir.shiloh, hawaii',
        totalSpots: 150,
        pricePerHour: 3.0,
        km: 0.5,
    },
    {
        coordinate: {
            latitude: 22.6345648,
            longitude: 88.4377279,
        },
        id: '2',
        parkingImage: require('../../assets/images/parkingSpots/parkingSpot2.png'),
        parkingSpotName: 'Lawnfield Parks',
        parkingSpotAddress: 'Westheimer rd.santa ana,illinois',
        totalSpots: 50,
        pricePerHour: 2.0,
        km: 1,
    },
    {
        coordinate: {
            latitude: 22.6281662,
            longitude: 88.4410113,
        },
        id: '3',
        parkingImage: require('../../assets/images/parkingSpots/parkingSpot3.png'),
        parkingSpotName: 'Peterson Tower',
        parkingSpotAddress: 'Preston rd.inglewood,maine',
        totalSpots: 120,
        pricePerHour: 5.0,
        km: 2,
    },
    {
        coordinate: {
            latitude: 22.6341137,
            longitude: 88.4497463,
        },
        id: '4',
        parkingImage: require('../../assets/images/parkingSpots/parkingSpot4.png'),
        parkingSpotName: 'Operum Shopping',
        parkingSpotAddress: 'Ash Dr.san jose,south dakota',
        totalSpots: 100,
        pricePerHour: 4.0,
        km: 2.5,
    },
];

const cardWidth = width / 1.5;

const FiltersResultsScreen = ({ navigation }) => {

    const [search, setSearch] = useState('New York');
    const [markerList] = useState(parkingSpotList);
    const [region] = useState(
        {
            latitude: 22.62938671242907,
            longitude: 88.4354486029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        }
    );

    let mapAnimation = new Animated.Value(0);
    let mapIndex = 0;

    const _map = createRef();

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / cardWidth + 0.3);
            if (index >= markerList.length) {
                index = markerList.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex != index) {
                    mapIndex = index;
                    const { coordinate } = markerList[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        }, 350
                    )
                }
            }, 10);
        });
    });

    const interpolation = markerList.map((marker, index) => {
        const inputRange = [
            (index - 1) * cardWidth,
            index * cardWidth,
            ((index + 1) * cardWidth),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        })

        return { scale };
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {markersInfo()}
                {parkingSpotsInfo()}
                {headerWithSearchField()}
            </View>
        </View>
    )

    function headerWithSearchField() {
        const textInputRef = createRef();
        return (
            <View style={styles.headerWithSearchFieldWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <View style={styles.textFieldWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name="search"
                            color={Colors.primaryColor}
                            size={20}
                            onPress={() => textInputRef.current.focus()}
                            style={{ marginRight: Sizes.fixPadding, }}
                        />
                        <TextInput
                            ref={textInputRef}
                            value={search}
                            onChangeText={(value) => setSearch(value)}
                            placeholder="Search location"
                            placeholderTextColor={Colors.grayColor}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor14Regular, flex: 1, height: 20.0, }}
                        />
                    </View>
                    <MaterialIcons
                        name="close"
                        color={Colors.grayColor}
                        size={16}
                        onPress={() => textInputRef.current.clear()}
                    />
                </View>
            </View>
        )
    }

    function parkingSpotsInfo() {
        return (
            <Animated.ScrollView
                horizontal={true}
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.parkingInfoWrapStyle}
                snapToInterval={cardWidth + 60}
                snapToAlignment="center"
                decelerationRate={'fast'}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0, }}
                onScroll={
                    Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: mapAnimation,
                                    }
                                }
                            }
                        ],
                        { useNativeDriver: true }
                    )
                }
            >
                {markerList.map((marker, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.push('ParkingPlaceDetail', { item: marker })}
                            style={styles.parkingSpotInfoWrapStyle}
                        >
                            <Image
                                source={marker.parkingImage}
                                style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0, }}
                            />
                            <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                                <Text style={{ ...Fonts.blackColor14Medium }}>
                                    {marker.parkingSpotName}
                                </Text>
                                <Text numberOfLines={1} style={{ ...Fonts.grayColor12Regular }}>
                                    {marker.parkingSpotAddress}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialIcons
                                        name="directions-car"
                                        color={Colors.primaryColor}
                                        size={20}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor12Medium }}>
                                        {marker.totalSpots} spots • {`$`}{marker.pricePerHour.toFixed(1)}/h
                                    </Text>
                                </View>
                                <View style={{ marginTop: Sizes.fixPadding - 8.0, flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesome
                                        name="location-arrow"
                                        color={Colors.grayColor}
                                        size={16}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Regular }}>
                                        {marker.km}km
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </Animated.ScrollView>
        )
    }

    function markersInfo() {
        return (
            <MapView
                ref={_map}
                initialRegion={region}
                style={{ flex: 1 }}
            >
                {markerList.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolation[index].scale
                            }
                        ]
                    }
                    return (
                        <Marker
                            key={index}
                            coordinate={marker.coordinate}
                        >
                            <Animated.View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 50.0, height: 50.0,
                                }}
                            >
                                <Animated.Image
                                    source={require('../../assets/images/icons/marker2.png')}
                                    resizeMode="contain"
                                    style={[{ width: 35.0, height: 35.0 }, scaleStyle]}
                                >
                                </Animated.Image>
                                <Text style={{ ...Fonts.blackColor12Bold, paddingBottom: Sizes.fixPadding - 5.0, position: 'absolute', alignSelf: 'center' }}>
                                    {`$`}{marker.pricePerHour}
                                </Text>
                            </Animated.View>
                        </Marker>
                    )
                })}
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    parkingInfoWrapStyle: {
        position: 'absolute',
        bottom: 20.0,
        left: 0.0,
        right: 0.0,
        paddingVertical: 10.0,
    },
    parkingSpotInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1.0,
        marginHorizontal: Sizes.fixPadding,
        width: width / 1.3,
        marginBottom: Sizes.fixPadding,
    },
    headerWithSearchFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: Sizes.fixPadding * 4.0,
        right: 20.0,
        left: 20.0,
    },
    textFieldWrapStyle: {
        marginLeft: Sizes.fixPadding,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        justifyContent: 'space-between',
        borderRadius: Sizes.fixPadding,
        height: 50.0,
        paddingHorizontal: Sizes.fixPadding,
    },
});

export default FiltersResultsScreen;