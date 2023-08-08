import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// --------------------REGISTRATION-----------------------------------
// POST @/users/signup
// body: { name, email, password }
export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, thunkAPI) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            const id = user.uid;
            return { name, email, id };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// -----------------LOGIN--------------------------------------------
// POST @/users/login
// body: { name, email }
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            const id = user.uid;

            return { email, id };
        } catch (e) {
            console.log('e.message', e.message)
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// ----------------LOGOUT--------------------------------------
// POST @/users/logout
// headers: Authorization: Bearer token
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            // await axios.post("/users/logout");
            // clearAuthHeader();
        } catch (e) {
            console.log('e.message', e.message)
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);