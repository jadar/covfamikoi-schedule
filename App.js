'use strict';

/* react */

import * as React from 'react';
import { Button } from 'react-native';

/* redux */

import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';

import { Font } from 'expo';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

/* redux-persist */

import { persistStore, persistCombineReducers } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

/* app */

import Schedule from './components/';
import DetailsScreen from './components/Details';
import BaseApp from './components/BaseApp';
import primaryReducer from './reducers'; // Import the reducer and create a store

import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

const config = {
    key: 'primary',
    storage: AsyncStorage,
    // stateReconciler: hardSet,
};


// console.log()
const persistedReducer = persistCombineReducers(config, primaryReducer);
// console.log("Persisted reducer: " + persistedReducer);

// Add the autoRehydrate middleware to your redux store
const store = createStore(persistedReducer);

// Enable persistence
const persistor = persistStore(store);



// storage.removeItem('persist:root');

export class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Schedule',
            headerRight: (
                <Button
                    onPress={() => { navigation.getParam('scrollToNow')() }}
                    title="Now"
                />
            )
        }
    };

    state = {
        isReady: false
    };

    constructor(props) {
        super(props);
        this.store = store;
    }

    async _loadAssets() {
        //require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf')
        // console.log(MaterialIcons.font);
        // this is most definitely a bug. Key must capitalized.
        await Font.loadAsync({...FontAwesome.font, 'Ionicons': Ionicons.font.ionicons, 'MaterialIcons': MaterialIcons.font.material, 'Material Icons': MaterialIcons.font.material});
    }

    render() {
        const store = this.store;

        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssets}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }

        return (
            <BaseApp>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Schedule 
                           navigation={this.props.navigation}
                        />
                    </PersistGate>
                </Provider>
            </BaseApp>
        );
    }
}

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Details' component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
