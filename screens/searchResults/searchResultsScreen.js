import React, { createRef, useState } from "react";
import { View, TouchableOpacity, Dimensions, ImageBackground, Modal, TextInput, StyleSheet, Text, ScrollView } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import MyStatusBar from "../../components/myStatusBar";

const { width, height } = Dimensions.get('window');

const availableParkingSpotsList = [
    {
        id: '1',
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486,
        },
        price: '$2'
    },
    {
        id: '2',
        coordinate: {
            latitude: 22.6345648,
            longitude: 88.4377279,
        },
        price: '$5'
    },
    {
        id: '3',
        coordinate: {
            latitude: 22.6281662,
            longitude: 88.4410113,
        },
        price: '$5'
    },
    {
        id: '4',
        coordinate: {
            latitude: 22.6341137,
            longitude: 88.4497463,
        },
        price: '$2'
    },
    {
        id: '5',
        coordinate: {
            latitude: 22.618100,
            longitude: 88.456747,
        },
        price: '$3'
    },
    {
        id: '6',
        coordinate: {
            latitude: 22.640124,
            longitude: 88.438968,
        },
        price: '$4'
    },
    {
        id: '7',
        coordinate: {
            latitude: 22.616357,
            longitude: 88.442317,
        },
        price: '$2'
    },
    {
        id: '8',
        coordinate: {
            latitude: 22.610335,
            longitude: 88.438625,
        },
        price: '$6'
    },
    {
        id: '9',
        coordinate: {
            latitude: 22.624200,
            longitude: 88.453999,
        },
        price: '$3'
    },
];

const facilitiesList = ['Convered Roof', 'camera', 'Charging', 'Overnight', 'Disabled Parking', 'Convered Roof', 'Convered Roof', 'Convered Roof', 'camera', 'Charging', 'Overnight'];

const distanceList = ['Within 1 km', '2 - 3 km', '4 - 6 km'];

const durationList = ['More than 2 hours', '1 - 2 hrs', '<1 hour'];

const SearchResultsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        search: 'New York',
        showFilterSheet: false,
        selectedFacilitiesIndex: 0,
        selectedRating: 5,
        selectedDeistanceIndex: 0,
        selectedDurationIndex: 0,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        search,
        showFilterSheet,
        selectedFacilitiesIndex,
        selectedRating,
        selectedDeistanceIndex,
        selectedDurationIndex,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {mapViewWithParkingSpot()}
                {headerWithSearchFieldAndFilterIcon()}
                {filterDataSheet()}
            </View>
        </View>
    )

    function filterDataSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showFilterSheet}
                onRequestClose={() => {
                    updateState({ showFilterSheet: false })
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        updateState({ showFilterSheet: false });
                    }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{}}
                        >
                            <View style={{ maxHeight: height - 100, ...styles.bottomSheetWrapStyle, }}>
                                <View style={styles.bottomSheetIndicatorStyle} />
                                <Text style={{ textAlign: 'center', ...Fonts.blackColor18Medium }}>
                                    Filter
                                </Text>
                                <ScrollView showsVerticalScrollIndicator={false} >
                                    <TouchableOpacity activeOpacity={1} onPress={() => { }}>
                                        {priceInfo()}
                                        {facilitiesInfo()}
                                        {ratingInfo()}
                                        {distanceInfo()}
                                        {durationInfo()}
                                    </TouchableOpacity>
                                </ScrollView>
                                {applyAndClearAllInfo()}
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function applyAndClearAllInfo() {
        return (
            <View style={styles.applyAndClearAllInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        updateState({ showFilterSheet: false })
                        navigation.push('FilterResults')
                    }}
                    style={styles.applyButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Bold }}>
                        Apply
                    </Text>
                </TouchableOpacity>
                <Text
                    onPress={() => updateState({ showFilterSheet: false })}
                    style={{ marginLeft: Sizes.fixPadding * 3.5, ...Fonts.grayColor16Bold }}
                >
                    Clear All
                </Text>
            </View>
        )
    }

    function durationInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Regular }}>
                    Duration
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {durationList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ selectedDurationIndex: index })}
                            key={`${index}`}
                            style={{
                                borderColor: selectedDurationIndex == index ? Colors.primaryColor : Colors.grayColor,
                                ...styles.filterCommonStyle,
                            }}>
                            <Text style={selectedDurationIndex == index ? { ...Fonts.primaryColor14Regular } : { ...Fonts.grayColor14Regular }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }

    function distanceInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding + 10.0, ...Fonts.blackColor16Regular }}>
                    Distance
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {distanceList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ selectedDeistanceIndex: index })}
                            key={`${index}`}
                            style={{
                                borderColor: selectedDeistanceIndex == index ? Colors.primaryColor : Colors.grayColor,
                                ...styles.filterCommonStyle,
                            }}>
                            <Text style={selectedDeistanceIndex == index ? { ...Fonts.primaryColor14Regular } : { ...Fonts.grayColor14Regular }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }

    function ratingInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Regular }}>
                    Rating
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        [5, 4, 3, 2, 1].map((item, index) => (
                            <TouchableOpacity
                                key={`${index}`}
                                activeOpacity={0.9}
                                onPress={() => updateState({ selectedRating: item })}
                                style={{
                                    marginRight: index == 4 ? 0.0 : Sizes.fixPadding,
                                    borderColor: selectedRating == item ? Colors.primaryColor : Colors.grayColor,
                                    ...styles.ratingNumberWrapStyle,
                                }}
                            >
                                <Text style={selectedRating == item ? { ...Fonts.primaryColor14Regular } : { ...Fonts.grayColor14Regular }}>
                                    {item}
                                </Text>
                                <MaterialIcons
                                    name="star"
                                    color={Colors.ratingColor}
                                    size={15}
                                    style={{ marginLeft: Sizes.fixPadding - 8.0, }}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    function facilitiesInfo() {
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Regular }}>
                    Facilities
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', flexWrap: 'wrap', }}>
                    {facilitiesList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ selectedFacilitiesIndex: index })}
                            key={`${index}`}
                            style={{
                                borderColor: selectedFacilitiesIndex == index ? Colors.primaryColor : Colors.grayColor,
                                ...styles.filterCommonStyle,
                            }}>
                            <Text style={selectedFacilitiesIndex == index ? { ...Fonts.primaryColor14Regular } : { ...Fonts.grayColor14Regular }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }

    function priceInfo() {
        const CustomSliderMarker = ({ currentValue }) => (
            <View style={{ alignItems: 'center' }}>
                <View style={{
                    width: 18.0, height: 18.0, borderRadius: 9.0, backgroundColor: Colors.primaryColor, borderWidth: 1.5,
                    borderColor: Colors.whiteColor, elevation: 2.0,
                    marginTop: Sizes.fixPadding - 5.0
                }} />
                <Text style={{ position: 'absolute', top: 30.0, ...Fonts.grayColor14Bold }}>
                    {`$`}{currentValue}
                </Text>
            </View>
        )
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Regular }}>
                    Price
                </Text>
                <View>
                    <MultiSlider
                        values={[5, 20]}
                        min={0}
                        max={50}
                        isMarkersSeparated={true}
                        customMarkerLeft={(e) => {
                            return (<CustomSliderMarker
                                currentValue={e.currentValue} />)
                        }}
                        customMarkerRight={(e) => {
                            return (<CustomSliderMarker
                                currentValue={e.currentValue} />)
                        }}
                        sliderLength={width - 40}
                        selectedStyle={{ backgroundColor: Colors.primaryColor, height: 8.0, borderRadius: Sizes.fixPadding }}
                        unselectedStyle={{ backgroundColor: Colors.lightGrayColor, height: 8.0, borderRadius: Sizes.fixPadding }}
                    />
                </View>
            </View>
        )
    }

    function headerWithSearchFieldAndFilterIcon() {
        const textInputRef = createRef();
        return (
            <View style={styles.headerWithSearchFieldAndFilterIconWrapStyle}>
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
                            onChangeText={(value) => updateState({ search: value })}
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
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showFilterSheet: true })}
                    style={styles.filterIconWrapStyle}
                >
                    <Feather
                        name="filter"
                        color={Colors.primaryColor}
                        size={22}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function mapViewWithParkingSpot() {
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
                {
                    availableParkingSpotsList.map((item) => (
                        <Marker
                            key={`${item.id}`}
                            coordinate={item.coordinate}
                        >
                            <ImageBackground
                                source={require('../../assets/images/icons/marker2.png')}
                                style={{ width: 35.0, height: 35.0, paddingTop: Sizes.fixPadding - 5.0, alignItems: 'center' }}
                                resizeMode='contain'
                            >
                                <Text style={{ ...Fonts.blackColor12Bold }}>
                                    {item.price}
                                </Text>
                            </ImageBackground>
                        </Marker>
                    ))
                }
            </MapView>
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
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.blackColor18SemiBold }}>
                    Select Delivery Address
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textFieldWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        justifyContent: 'space-between',
        borderRadius: Sizes.fixPadding,
        height: 50.0,
        paddingHorizontal: Sizes.fixPadding,
        ...CommonStyles.shadow
    },
    filterIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        height: 50.0,
        width: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
        ...CommonStyles.shadow
    },
    headerWithSearchFieldAndFilterIconWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: Sizes.fixPadding * 4.0,
        right: 20.0,
        left: 20.0,
    },
    bottomSheetWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
    },
    sliderThumbStyle: {
        width: 18,
        height: 18,
        borderRadius: 9.0,
        backgroundColor: Colors.primaryColor,
        borderWidth: 1.5,
        borderColor: Colors.whiteColor,
        elevation: 1.5,
    },
    inactiveSliderStyle: {
        flex: 1,
        height: 8.0,
        borderRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightGrayColor,
    },
    selectedSliderStyle: {
        height: 8,
        backgroundColor: Colors.primaryColor,
    },
    priceSliderLabelWrapStyle: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.primaryColor,
        borderRadius: 20,
    },
    sliderNotchStyle: {
        width: 10,
        height: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: Colors.primaryColor,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 15,
        marginBottom: -7.0,
        marginTop: -1.0,
    },
    bottomSheetIndicatorStyle: {
        backgroundColor: Colors.primaryColor,
        height: 2.0,
        width: '30%',
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    },
    ratingNumberWrapStyle: {
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    filterCommonStyle: {
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    },
    applyButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        flex: 1,
        ...CommonStyles.butonShadow,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
    },
    applyAndClearAllInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
    },
    priceRangeWrapStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default SearchResultsScreen;