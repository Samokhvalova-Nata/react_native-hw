import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer, authSlice } from "./auth/authReducer";
import { postReducer, postSlice } from "./post/postReducer";

const rootReducer = combineReducers({
    [authSlice.name]: authReducer,
    [postSlice.name]: postReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);