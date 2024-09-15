import React, { useRef, useState, useCallback } from "react";
import { BackHandler, View, StyleSheet, Image, Dimensions, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import Swiper from 'react-native-swiper'
import MyStatusBar from "../../components/myStatusBar";

const { width, height } = Dimensions.get('window');

const onboardingScreenList = [
    {
        id: '1',
        onboardingImage: require('../../assets/images/onboardings/onboarding1.png'),
        title: 'No More Waiting for Parking Tickets',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit urna, neque justo leo mattis neque.`,
    },
    {
        id: '2',
        onboardingImage: require('../../assets/images/onboardings/onboarding2.png'),
        title: 'Explore Nearby Parking and Pay Online',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit urna, neque justo leo mattis neque..`,
    },
    {
        id: '3',
        onboardingImage: require('../../assets/images/onboardings/onboarding3.png'),
        title: 'Legal Parking Spots',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit urna, neque justo leo mattis neque.`,
    },
];

const OnboardingScreen = ({ navigation }) => {

    const backAction = () => {
        if (Platform.OS === "ios") {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
        } else {
            backClickCount == 1 ? BackHandler.exitApp() : _spring();
            return true;
        }
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            navigation.addListener("gestureEnd", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
                navigation.removeListener("gestureEnd", backAction);
            };
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);
    const [currentIndex, setcurrentIndex] = useState(0);
    const swiperRef = useRef();

    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar />
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <Swiper
                    ref={swiperRef}
                    onIndexChanged={(index) => { setcurrentIndex(index) }}
                    index={currentIndex}
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={3.5}
                    showsPagination
                    paginationStyle={{ position: 'absolute', bottom: 25.0, }}
                    dot={<View style={styles.dotStyle} />}
                    activeDot={<View style={styles.activeDotStyle} />}
                >
                    {page({ index: 0 })}
                    {page({ index: 1 })}
                    {page({ index: 2 })}
                </Swiper>
                {skipNextAndLogin()}
            </View>
            {exitInfo()}
        </View>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
                :
                null
        )
    }

    function page({ index }) {
        return (
            <>
                <View style={{ flex: 0.90, alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                        source={onboardingScreenList[index].onboardingImage}
                        style={{ width: width - 40.0, height: height / 2.5, resizeMode: 'contain' }}
                    />
                </View>
                <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.whiteColor20Bold }}>
                        {onboardingScreenList[index].title}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.whiteColor14Regular }}>
                        {onboardingScreenList[index].description}
                    </Text>
                </View>
            </>
        )
    }

    function skipNextAndLogin() {
        return (
            <View style={styles.skipAndLoginWrapStyle}>
                {currentIndex != 2
                    ?
                    <Text
                        onPress={() => navigation.push('Login')}
                        style={{ ...Fonts.whiteColor12Bold }}
                    >
                        SKIP
                    </Text>
                    :
                    <Text>
                    </Text>
                }
                {
                    currentIndex == 2
                        ?
                        <Text
                            onPress={() => navigation.push('Login')}
                            style={{ ...Fonts.whiteColor12Bold }}
                        >
                            LOGIN
                        </Text>
                        :
                        <Text
                            onPress={() => {
                                if (currentIndex == 0) {
                                    swiperRef.current.scrollBy(1, true)
                                }
                                else if (currentIndex == 1) {
                                    swiperRef.current.scrollBy(1, true)
                                }
                            }}
                            style={{ ...Fonts.whiteColor12Bold }}
                        >
                            NEXT
                        </Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dotStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding - 5.0,
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
    },
    activeDotStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 6.0,
        height: 12.0,
        width: 12.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    skipAndLoginWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 25.0,
        left: 20.0,
        right: 20.0,
    },
    nextAndLoginButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default OnboardingScreen;