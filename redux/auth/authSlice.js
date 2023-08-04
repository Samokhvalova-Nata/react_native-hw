import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    name: 'Natali Romanova',
    email: 'email@example.com',
    avatar: '../../assets/images/avatar.jpg',
    isLogged: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: {
            reducer(state, action) {
                state.auth.push(action.payload);
            },
            prepare(name, email) {
                    return{
                        payload: {
                            name,
                            email,
                        },
                    };
            },
        },
        addAvatar: {
            reducer (state, action) {
            state.auth.avatar.push(action.payload);
        }, 
        }, 
    }
})

export const authReducer = authSlice.reducer;
export const { addUser, addAvatar } = authSlice.actions;