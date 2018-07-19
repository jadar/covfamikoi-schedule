'use strict';

import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer, REHYRATE, PURGE, persistCombineReducers } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using


const config = {
    key: 'primary',
    storage,
};

// Import the reducer and create a store
import { reducer } from './store/';

// let combinedReducer = persistCombineReducers(config, [reducer]);
let combinedReducer = reducer;

const persistedReducer = persistReducer(config, combinedReducer);

// Add the autoRehydrate middleware to your redux store
const store = createStore(persistedReducer);

// Enable persistence
const persistor = persistStore(store);

// Import the App container component
import Schedule from './components/';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.store = store;
        // console.log("STORE", this.store);
    }

    render() {
        const store = this.store;
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Schedule />
                </PersistGate>
            </Provider>
        );
    }
}