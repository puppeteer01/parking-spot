import React, { useState, createRef } from "react";
import { View, TouchableOpacity, FlatList, TextInput, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const recentSearchesList = [
    {
        id: '1',
        place: 'New York',
        address: '4140 Parker Rd. Allentown, New Mexico 31134',
    },
    {
        id: '2',
        place: 'Jordern Park',
        address: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
    },
    {
        id: '3',
        place: 'Illinois',
        address: '4517 Washington Ave. Manchester, Kentucky 39495',
    },
    {
        id: '4',
        place: 'Lawnfield Parks',
        address: '3517 W. Gray St. Utica, Pennsylvania 57867',
    },
];

const SearchScreen = ({ navigation }) => {

    const [search, setSearch] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {headerWithSearchField()}
                {recentSearch()}
            </View>
        </View>
    )

    function recentSearch() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('SearchResults')}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', marginBottom: Sizes.fixPadding, }}
            >
                <MaterialIcons
                    name="history"
                    color={Colors.primaryColor}
                    size={20}
                />
                <View style={{ marginLeft: Sizes.fixPadding, flex: 1, }}>
                    <Text style={{ ...Fonts.blackColor14Regular }}>
                        {item.place}
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        {item.address}
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={recentSearchesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}
                automaticallyAdjustKeyboardInsets={true}
            />
        )
    }

    function headerWithSearchField() {
        const textInputRef = createRef();
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <View style={styles.textFieldAndSearchIconWrapStyle}>
                    <TextInput
                        ref={textInputRef}
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                        placeholder="Search location"
                        placeholderTextColor={Colors.grayColor}
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor14Regular, flex: 1, height: 20.0, }}
                    />
                    <MaterialIcons
                        name="search"
                        color={Colors.primaryColor}
                        size={20}
                        onPress={() => search === null || search.match(/^ *$/) !== null ? textInputRef.current.focus() : navigation.push('SearchResults')}
                    />
                </View>
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
    textFieldAndSearchIconWrapStyle: {
        marginLeft: Sizes.fixPadding + 5.0,
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
    }
});

export default SearchScreen;