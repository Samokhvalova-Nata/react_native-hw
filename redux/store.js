import { configureStore } from "@reduxjs/toolkit";
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
import { authReducer, authSlice } from "./auth/authSlice";
import { postReducer, postSlice } from "./post/postSlice";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["postsList"],
};

const persistedPostsreducer = persistReducer(persistConfig, postReducer);

const reducer = {
    auth: authReducer,
    posts: persistedPostsreducer,
};

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