import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './store/rootReducer'
import { Provider } from 'react-redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import {PersistGate} from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler : autoMergeLevel2 
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)
ReactDOM.render(
    <Provider store={store}>
       <PersistGate persistor={persistor} loading={null}>
            <App />
        </PersistGate>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
