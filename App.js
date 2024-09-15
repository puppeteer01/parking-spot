import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import { LogBox } from 'react-native';
import searchScreen from "./screens/search/searchScreen";
import searchResultsScreen from "./screens/searchResults/searchResultsScreen";
import filterResultsScreen from "./screens/filterResults/filterResultsScreen";
import parkingPlaceDetailScreen from "./screens/parkingPlaceDetail/parkingPlaceDetailScreen";
import bookSlotScreen from "./screens/bookSlot/bookSlotScreen";
import vehiclesScreen from "./screens/vehicles/vehiclesScreen";
import addNewVehicleScreen from "./screens/addNewVehicle/addNewVehicleScreen";
import bookingSuccessfullScreen from "./screens/bookingSuccessfull/bookingSuccessfullScreen";
import getDirectionScreen from "./screens/getDirection/getDirectionScreen";
import extendParkingTimeScreen from "./screens/extendParkingTime/extendParkingTimeScreen";
import extendedTimeSuccessfullScreen from "./screens/extendedTimeSuccessfull/extendedTimeSuccessfullScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import walletScreen from "./screens/wallet/walletScreen";
import notificationsScreen from "./screens/notifications/notificationsScreen";
import favoritesScreen from "./screens/favorites/favoritesScreen";
import inviteFriendsScreen from "./screens/inviteFriends/inviteFriendsScreen";
import supportScreen from "./screens/support/supportScreen";
import privacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import splashScreen from "./screens/splashScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";
import loginScreen from "./screens/auth/loginScreen";
// import verificationScreen from "./screens/auth/verificationScreen";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

ExpoSplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_Regular: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto_Medium: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto_Bold: require("./assets/fonts/Roboto-Bold.ttf"),
    Roboto_Black: require("./assets/fonts/Roboto-Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Splash" component={splashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Onboarding" component={onboardingScreen} />
          <Stack.Screen name="Login" component={loginScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          {/* <Stack.Screen name="Verification" component={verificationScreen} /> */}
          <Stack.Screen name="BottomTabBar" component={bottomTabBarScreen} />
          <Stack.Screen name="EditProfile" component={editProfileScreen} />
          <Stack.Screen name="Search" component={searchScreen} />
          <Stack.Screen name="SearchResults" component={searchResultsScreen} />
          <Stack.Screen name="FilterResults" component={filterResultsScreen} />
          <Stack.Screen name="ParkingPlaceDetail" component={parkingPlaceDetailScreen} />
          <Stack.Screen name="BookSlot" component={bookSlotScreen} />
          <Stack.Screen name="Vehicles" component={vehiclesScreen} />
          <Stack.Screen name="AddNewVehicle" component={addNewVehicleScreen} />
          <Stack.Screen name="BookingSuccessfull" component={bookingSuccessfullScreen} />
          <Stack.Screen name="GetDirection" component={getDirectionScreen} />
          <Stack.Screen name="ExtendParkingTime" component={extendParkingTimeScreen} />
          <Stack.Screen name="ExtendedTimeSuccessfull" component={extendedTimeSuccessfullScreen} />
          <Stack.Screen name="Wallet" component={walletScreen} />
          <Stack.Screen name="Notifications" component={notificationsScreen} />
          <Stack.Screen name="Favorites" component={favoritesScreen} />
          <Stack.Screen name="InviteFriends" component={inviteFriendsScreen} />
          <Stack.Screen name="Support" component={supportScreen} />
          <Stack.Screen name="PrivacyPolicy" component={privacyPolicyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;