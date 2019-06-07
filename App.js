'use strict';

/* react */

import React from 'react';

/* redux */

import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';

import { AppLoading, Font } from 'expo';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

/* redux-persist */

import { persistStore, persistCombineReducers } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

/* app */

import Schedule from './components/';
import DetailsScreen from './components/Details';
import BaseApp from './components/BaseApp';
import primaryReducer from './reducers'; // Import the reducer and create a store

import { createStackNavigator } from 'react-navigation';

const config = {
    key: 'primary',
    storage: storage,
    stateReconciler: hardSet,
};


// console.log()
const persistedReducer = persistCombineReducers(config, primaryReducer);
// console.log("Persisted reducer: " + persistedReducer);

// Add the autoRehydrate middleware to your redux store
const store = createStore(persistedReducer);

// Enable persistence
const persistor = persistStore(store);

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Schedule',
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
        await Font.loadAsync({...FontAwesome.font, 'Ionicons': Ionicons.font.ionicons, 'MaterialIcons': MaterialIcons.font.material});
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

export default createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
    }
);
