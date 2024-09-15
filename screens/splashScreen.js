import React, { useCallback } from "react";
import { Dimensions, View, Image, BackHandler } from "react-native";
import { Colors } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../components/myStatusBar";

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    setTimeout(() => {
        navigation.push('Onboarding')
    }, 2000);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={{ width: width / 2.0, height: 100.0, resizeMode: 'contain' }}
                />
            </View>
        </View>
    )
}

export default SplashScreen;