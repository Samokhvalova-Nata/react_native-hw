import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { authLogOut, authStateChange, updateUserProfile } from "./authSlice";

// --------------------REGISTRATION-----------------------------------
export const register = (name, email, password) =>
    async (dispatch) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser;

            await updateProfile(user, {
                displayName: name,
            });

            const { uid, displayName, email } = await auth.currentUser;
            const userUpdateData = { userId: uid, name: displayName, email };

            dispatch(updateUserProfile(userUpdateData));
            return user;
        } catch (e) {
            console.log("e.message", e.message);
            return e.message;
        }
};

// -----------------LOGIN--------------------------------------------
export const login = (email, password) =>
    async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // console.log('userCredential', userCredential);

            return userCredential;
        } catch (e) {
            console.log('e.message', e.message)
            return e.message;
        }
    };

// ---------------SET AUTH STATE---------------
export const authStateChangeUser = () => async (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userUpdateData = {
                userId: user.uid,
                name: user.displayName,
                email: user.email,
            };

            dispatch(authStateChange({ stateChange: true }));
            dispatch(updateUserProfile(userUpdateData));
        }
    })
};

// ----------------LOGOUT--------------------------------------
export const logout = () => async (dispatch) => {
    await signOut(auth);
    dispatch(authLogOut());
};