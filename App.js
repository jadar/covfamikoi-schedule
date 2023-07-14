"use strict";

/* react */

import { useCallback } from "react";
import { Button } from "react-native";

/* redux */

import { createStore } from "redux";
import { Provider } from "react-redux";

import { useFonts } from "expo-font";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

/* redux-persist */

import { persistStore, persistCombineReducers } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

/* app */

import Schedule from "./components/";
import DetailsScreen from "./components/Details";
import BaseApp from "./components/BaseApp";
import primaryReducer from "./reducers"; // Import the reducer and create a store

import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

const config = {
  key: "primary",
  storage: AsyncStorage,
};

const persistedReducer = persistCombineReducers(config, primaryReducer);

// Add the autoRehydrate middleware to your redux store
const store = createStore(persistedReducer);

// Enable persistence
const persistor = persistStore(store);

SplashScreen.preventAutoHideAsync();

export const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    ...FontAwesome.font,
    Ionicons: Ionicons.font.ionicons,
    MaterialIcons: MaterialIcons.font.material,
    "Material Icons": MaterialIcons.font.material,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <BaseApp onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Schedule navigation={navigation} />
        </PersistGate>
      </Provider>
    </BaseApp>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
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
  );
};

export default App;
