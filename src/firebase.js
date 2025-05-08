import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || null,
storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
// console.log("Firebase auth domain:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
// console.log("projectId:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
// console.log("databaseURL:", import.meta.env.VITE_FIREBASE_DATABASE_URL );
// console.log("storageBucket", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
// console.log("messagingSenderId", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
// console.log("appId", import.meta.env.VITE_FIREBASE_APP_ID);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const rtdb = getDatabase();
export const googleProvider = new GoogleAuthProvider();
const messaging = getMessaging(app);
export { messaging, getToken, onMessage };




// Auth functions
export const signInWithGoogle = async () => {
try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
} catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
}
};

export const signInWithEmail = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        console.error("Email sign-in error:", error);
        throw error;
    }
};

export const createUserWithEmailPassword = async (email, password) =>{
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        console.error("Email sign-in error:", error);
        throw error;
    }
}