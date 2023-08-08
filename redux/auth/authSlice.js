import { createSlice, nanoid } from "@reduxjs/toolkit";
import { login, register } from "./authOperations";

const handleRejected = (state, { payload }) => {
    state.isLoggedIn = false;
    state.isAuthLoading = false;
    state.authError = payload;
};

const initialState = {
    name: '',
    email: '',
    avatar: '',
    id: null,

    isLoggedIn: false,
    isAuthLoading: false,
    authError: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            id: payload.id,
        })
    },
    extraReducers: builder => {
        builder
            .addCase(register.pending, (state) => {
                state.isAuthLoading = 'register';
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.name = payload.name;
                state.email = payload.email;
                state.id = payload.id;
                // state.avatar = action.payload.url;
                state.isLoggedIn = true;
                state.isAuthLoading = false;
                state.authError = null;
            })
            .addCase(register.rejected, handleRejected)

            .addCase(login.pending, (state) => {
                state.isAuthLoading = 'login';
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.name = payload.name;
                state.email = payload.email;
                state.id = payload.id;
                // state.avatar = action.payload.url;
                state.isLoggedIn = true;
                state.isAuthLoading = false;
                state.authError = null;
            })
            .addCase(login.rejected, handleRejected)

            // .addCase(logout.pending, (state) => {
            //     state.isAuthLoading = 'logout';
            // })
            // .addCase(logout.fulfilled, (state) => {
            //     state.user = { name: null, email: null };
            //     state.token = null;
            //     state.isLoggedIn = false;
            //     state.isAuthLoading = false;
            //     state.authError = null;
            // })
            // .addCase(logout.rejected, handleRejected)

            // .addCase(refresh.pending, (state) => {
            //     state.isRefreshing = true;
            //     state.isAuthLoading = 'refresh';
            // })
            // .addCase(refresh.fulfilled, (state, { payload }) => {
            //     state.user = payload;
            //     state.isLoggedIn = true;
            //     state.isRefreshing = false;
            //     state.isAuthLoading = false;
            //     state.authError = null;
            // })
            // .addCase(refresh.rejected, (state, { payload }) => {
            //     state.isRefreshing = false;
            //     state.isAuthLoading = false;
            // })
    },
})

export const authReducer = authSlice.reducer;
export const { updateUserProfile } = authSlice.actions;