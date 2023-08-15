import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAvPA7b2K4S5c7QpvLyTFTUtMRx35dvPAU",
    authDomain: "rn-social-ed3b9.firebaseapp.com",
    // databaseURL:
    //     "https://rn-social-ed3b9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rn-social-ed3b9",
    storageBucket: "rn-social-ed3b9.appspot.com",
    messagingSenderId: "78172023334",
    appId: "1:78172023334:web:f66c6b7a7a4f3d8ac354e7",
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);