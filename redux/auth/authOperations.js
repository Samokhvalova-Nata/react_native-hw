import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { authLogOut, authStateChange, updateAvatar, updateUserProfile } from "./authSlice";

// --------------------REGISTRATION-----------------------------------
export const register = (name, email, password, photo) =>
    async (dispatch) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser;

            await updateProfile(user, {
                displayName: name,
                photoURL: photo,
            });

            const {
                uid,
                displayName,
                email: emailBase,
                photoURL,
            } = await auth.currentUser;

            const userUpdateData = {
                userId: uid,
                name: displayName,
                email: emailBase,
                avatar: photoURL,
            };

            dispatch(updateUserProfile(userUpdateData));
            // console.log('user', user)
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

            console.log('userCredential', userCredential);

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
                avatar: user.photoURL,
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

// ---------------UPDATE AVATAR-----------------------
export const updateUserAvatar = (newServerAvatar) => async (dispatch) => {
    try {
        const user = auth.currentUser;

        await updateProfile(user, {
                photoURL: newServerAvatar,
            });

            const {
                uid,
                displayName,
                email: emailBase,
                photoURL,
            } = await auth.currentUser;

            const userUpdateData = {
                userId: uid,
                name: displayName,
                email: emailBase,
                avatar: photoURL,
            };

        dispatch(updateUserProfile(userUpdateData));
        return user;
    } catch (error) {
        console.log("updateUserAvatar: ", error.message);
    }
};