import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'Natali Romanova',
    email: 'email@example.com',
    avatar: '../../assets/images/avatar.jpg',
    isLogged: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addName: (state, action) => ({
            ...state,
            name: action.payload,
        }),
        addEmail: (state, action) => ({
            ...state,
            email: action.payload,
        }),
        addAvatar: (state, action) => ({
            ...state,
            avatar: action.payload,
        }),
        // addName: (state, action) => {
        //     state.name = action.payload;
        // },
        // addEmail: (state, action) => {
        //     state.email = action.payload;
        // },
        // addAvatar: (state, action) => {
        //     state.avatar = action.payload;
        // },
    }
})

export const authReducer = authSlice.reducer;