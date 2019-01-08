'use strict';

/* react */

import React from 'react';

/* redux */

import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';

/* redux-persist */

import { persistStore, persistCombineReducers } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

/* app */

import Schedule from './components/';
import BaseApp from './components/BaseApp';
import primaryReducer from './reducers'; // Import the reducer and create a store

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

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.store = store;
        // console.log("STORE", this.store);
    }

    render() {
        const store = this.store;
        return (
            <BaseApp>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Schedule />
                    </PersistGate>
                </Provider>
            </BaseApp>
        );
    }
}
