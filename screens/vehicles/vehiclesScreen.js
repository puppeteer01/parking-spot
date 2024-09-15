import React, { useState } from "react";
import {  View,  FlatList, TouchableOpacity, Image, Dimensions, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('window');

const vehiclesList = [
    {
        id: '1',
        vehicleName: 'Toyota Matrix',
        vehicleImage: require('../../assets/images/cars/car1.png'),
        vehicleType: 'Hatchback',
        vehicleNumber: 'GJ05NC1710',
    },
    {
        id: '2',
        vehicleName: 'RNX Dulex',
        vehicleImage: require('../../assets/images/cars/car2.png'),
        vehicleType: 'Sports car',
        vehicleNumber: 'GJ05NC2508',
    },
    {
        id: '3',
        vehicleName: 'Baleno',
        vehicleImage: require('../../assets/images/cars/car3.png'),
        vehicleType: 'Hatchback',
        vehicleNumber: 'GJ05NC1017',
    },
];

const VehiclesScreen = ({ navigation }) => {

    const [selectedVehicaleIndex, setselectedVehicaleIndex] = useState(0)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {vehicles()}
                {addNewVehicleButton()}
            </View>
        </View>
    )

    function addNewVehicleButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('AddNewVehicle')}
                style={styles.addNewVehicleButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Add New Vehicle
                </Text>
            </TouchableOpacity>
        )
    }

    function vehicles() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setselectedVehicaleIndex(index)}
                style={{
                    backgroundColor: selectedVehicaleIndex == index ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.carDetailWrapStyle
                }}
            >
                <View style={{ flex: 1, }}>
                    <Text style={selectedVehicaleIndex == index ? { ...Fonts.whiteColor14Regular } : { ...Fonts.blackColor14Regular }}>
                        {item.vehicleName}
                    </Text>
                    <Text style={selectedVehicaleIndex == index ? { ...Fonts.whiteColor12Regular } : { ...Fonts.grayColor12Medium }}>
                        {item.vehicleType} | {item.vehicleNumber}
                    </Text>
                </View>
                <View style={{ width: width / 3.0, }}>
                    <Image
                        source={item.vehicleImage}
                        style={{ width: '100%', resizeMode: 'contain', }}
                    />
                </View>
            </TouchableOpacity>
        )
        return (
            <View>
                <FlatList
                    data={vehiclesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
                />
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
                    My Vehicles
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
    carDetailWrapStyle: {
        ...CommonStyles.shadow,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingRight: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
    },
    addNewVehicleButtonStyle: {
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

export default VehiclesScreen;