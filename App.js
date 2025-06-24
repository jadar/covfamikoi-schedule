"use strict";

/* react */

import { useCallback } from "react";
import { Button, View } from "react-native";

/* redux */

import { Provider } from "react-redux";

import { useFonts } from "expo-font";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

/* app */

import Schedule from "./components/";
import DetailsScreen from "./components/Details";
import BaseApp from "./components/BaseApp";
import store from "./reducers";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const HomeScreen = ({ navigation }) => {
  return (
    <BaseApp>
      <Provider store={store}>
          <Schedule navigation={navigation} />
      </Provider>
    </BaseApp>
  );
};

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, error] = useFonts({
    ...FontAwesome.font,
    Ionicons: Ionicons.font.ionicons,
    MaterialIcons: MaterialIcons.font.material,
    "Material Icons": MaterialIcons.font.material,
  });

  const onLayoutRootView = useCallback(() => {
    console.log("onLayoutRootView called");
    if (error) {
      console.log("Error loading fonts:", error);
    }
    if (fontsLoaded) {
      console.log("Fonts loaded successfully");
      SplashScreen.hide();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    console.log("Fonts not loaded yet");
    return null; // or a loading indicator
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Schedule",
              headerRight: () => <Button title="Now" />,
            }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
