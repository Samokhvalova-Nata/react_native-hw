import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "./auth/authSlice";
import { postReducer, postSlice } from "./post/postSlice";

const rootReducer = combineReducers({
    [authSlice.name]: authReducer,
    [postSlice.name]: postReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});