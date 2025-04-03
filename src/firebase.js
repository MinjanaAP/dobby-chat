import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_STORAGE_BUCKET",
messagingSenderId: "YOUR_SENDER_ID",
appId: "YOUR_APP_ID",
databaseURL: "YOUR_DATABASE_URL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

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