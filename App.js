'use strict';

/* react */

import React from 'react';

/* redux */

import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';

import { Font } from 'expo';


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
    constructor(props) {
        super(props);
        this.store = store;
    }

    render() {
        const store = this.store;
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

export default createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
  },
    //{
  //Home: {
    //screen: HomeScreen
  //},
  //Details: {
    //screen: DetailsScreen,
  //},
//},{
   {
  initialRouteName: 'Home',
});
