import React, { useState } from "react";
import { View, TextInput, ScrollView, TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Menu } from 'react-native-material-menu';
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('window');

const vehicleTypesList = [
    'Sedan', 'Coupe', 'Sports Car', 'Station Wagon', 'Hatchback', 'Convertible', 'Sport-Utility Vehicle',
];

const AddNewVehicleScreen = ({ navigation }) => {

    const [state, setState] = useState({
        vehicleName: null,
        vehicleNumber: null,
        selectedVehicleType: null,
        showVehicleTypeOptions: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        vehicleName,
        vehicleNumber,
        selectedVehicleType,
        showVehicleTypeOptions,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                >
                    {vehicleTypeInfo()}
                    {vehicleNameInfo()}
                    {vehicleNumberInfo()}
                    {addButton()}
                </ScrollView>
            </View>
        </View>
    )

    function addButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.addButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Add
                </Text>
            </TouchableOpacity>
        )
    }

    function vehicleNumberInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, ...styles.addInfoCommonStyle }}>
                <TextInput
                    value={vehicleNumber}
                    onChangeText={(value) => updateState({ vehicleNumber: value })}
                    selectionColor={Colors.primaryColor}
                    placeholder="Vehicle Number"
                    placeholderTextColor={Colors.grayColor}
                    style={{ ...Fonts.blackColor14Regular, height: 20.0, }}
                />
            </View>
        )
    }

    function vehicleNameInfo() {
        return (
            <View style={styles.addInfoCommonStyle}>
                <TextInput
                    value={vehicleName}
                    onChangeText={(value) => updateState({ vehicleName: value })}
                    selectionColor={Colors.primaryColor}
                    placeholder="Vehicle Name"
                    placeholderTextColor={Colors.grayColor}
                    style={{ ...Fonts.blackColor14Regular, height: 20.0, }}
                />
            </View>
        )
    }

    function vehicleTypeInfo() {
        return (
            <Menu
                visible={showVehicleTypeOptions}
                anchor={
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showVehicleTypeOptions: true })}
                        style={{ ...styles.addInfoCommonStyle, ...styles.vehicleTypeWrapStyle, }}
                    >
                        <Text style={selectedVehicleType ? { ...Fonts.blackColor14Regular, flex: 1 } : { ...Fonts.grayColor14Regular }}>
                            {selectedVehicleType ? selectedVehicleType : 'Vehicle Type'}
                        </Text>
                        <FontAwesome
                            name="caret-down"
                            color={Colors.grayColor}
                            size={18}
                        />
                    </TouchableOpacity>
                }
                onRequestClose={() => updateState({ showVehicleTypeOptions: false })}
                style={{ left: 30, }}
            >
                <View style={{ width: width - 60 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
                    >
                        {
                            vehicleTypesList.map((item, index) => (
                                <Text
                                    onPress={() => {
                                        updateState({ selectedVehicleType: item, showVehicleTypeOptions: false })
                                    }}
                                    key={`${index}`} style={{
                                        ...Fonts.blackColor14Regular,
                                        paddingHorizontal: Sizes.fixPadding * 2.0,
                                        paddingVertical: Sizes.fixPadding - 5.0,
                                    }}
                                >
                                    {item}
                                </Text>
                            ))
                        }
                    </ScrollView>
                </View>
            </Menu>
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
                    Add New Vehicle
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
    addInfoCommonStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        paddingHorizontal: Sizes.fixPadding,
        ...CommonStyles.shadow
    },
    addButtonStyle: {
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
    vehicleTypeWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Sizes.fixPadding * 2.0,
        justifyContent: 'space-between',
    }
});

export default AddNewVehicleScreen;