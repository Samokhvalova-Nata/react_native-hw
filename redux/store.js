import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {
//     persistReducer,
//     persistStore,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer, authSlice } from "./auth/authReducer";
import { postReducer, postSlice } from "./post/postReducer";

// const persistAuthConfig = {
//     key: 'auth',
//     storage: AsyncStorage,
// };

// const persistPostConfig = {
//     key: 'posts',
//     storage: AsyncStorage,
// };

// const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
// const persistedPostReducer = persistReducer(persistPostConfig, postReducer);

// const reducer = {
//     auth: persistedAuthReducer,
//     posts: persistedPostReducer,
// };

// export const store = configureStore({
//     reducer,
//     middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//         serializableCheck: {
//             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//     }),
// });

// export const persistor = persistStore(store);


const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer,
});

export const store = configureStore({
    reducer: rootReducer
});