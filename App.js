import { AppRegistry, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, REHYRATE, PURGE, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // or whatever storage you are using


const config = {
    key: 'primary',
    storage,
}

// Import the reducer and create a store
import { reducer } from './store/'

let combinedReducer = persistCombineReducers(config, [reducer])

// Add the autoRehydrate middleware to your redux store
const store = createStore(combinedReducer)

// Enable persistence
persistStore(store, null)

// Import the App container component
import Schedule from './components/'

console.log("STORE", store);

// Pass the store into the Provider
const AppWithStore = () => (
  <Provider store={store}>
    <Schedule />
  </Provider>
)

AppRegistry.registerComponent('App', () => AppWithStore)
