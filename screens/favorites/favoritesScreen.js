import React, { useState } from "react"
import { View, Animated, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from "../../components/myStatusBar";

const favoritesList = [
    {
        key: '1',
        parkingSpotName: 'BDA Complex',
        parkingSpotAddress: '4517 Washington Ave. Manchester, Kentucky 39495',
    },
    {
        key: '2',
        parkingSpotName: 'Teacher’s Colony',
        parkingSpotAddress: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    },
    {
        key: '3',
        parkingSpotName: 'Jaggasandra',
        parkingSpotAddress: '2464 Royal Ln. Mesa, New Jersey 45463',
    },
    {
        key: '4',
        parkingSpotName: 'Lawnfield Parks',
        parkingSpotAddress: '6391 Elgin St. Celina, Delaware 10299',
    },
];

const rowSwipeAnimatedValues = {};

Array(favoritesList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const FavoritesScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(favoritesList);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 50],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons
                        name="delete"
                        size={22}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'center' }}
                    />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setShowSnackBar(true);
        setListData(newData);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
        <TouchableHighlight
            style={{ backgroundColor: Colors.whiteColor }}
            activeOpacity={0.9}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={styles.favoriteItemWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {data.item.parkingSpotName}
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        {data.item.parkingSpotAddress}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    function noFavoriteItemsInfo() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/icons/favorite.png')}
                    style={{ width: 50.0, height: 50.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    No items in favorites
                </Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <View style={{ flex: 1, }}>
                    {listData.length == 0 ?
                        <>
                            {noFavoriteItemsInfo()}
                        </>
                        :
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-50}
                            onSwipeValueChange={onSwipeValueChange}
                            useNativeDriver={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0, }}
                        />
                    }
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                    >
                        <Text style={{ ...Fonts.whiteColor14Medium }}>
                            Item Remove From Favorites.
                        </Text>
                    </Snackbar>
                </View>
            </View>
        </View>
    );

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
                    Favorites
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
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 10,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 50,
        backgroundColor: Colors.redColor,
        right: 0,
        borderTopLeftRadius: Sizes.fixPadding,
        borderBottomLeftRadius: Sizes.fixPadding,
    },
    favoriteItemWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        ...CommonStyles.shadow,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 3.0,
        marginBottom: Sizes.fixPadding,
    }
});

export default FavoritesScreen;