import { collection, doc, getDoc, getDocs, serverTimestamp as fsTimeStamp, updateDoc } from "firebase/firestore"
import { auth, db, rtdb } from "../firebase"
import { ref, serverTimestamp, set } from "firebase/database";
import { signOut } from "firebase/auth";

export const getUserDetails = async (userId)=>{
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if(userSnap){
            return userSnap.data();
        }else{
            throw new Error("No such user found in database");
        }
    } catch (error) {
        console.error("Error getting user details", error.message);
        throw error;
    }
}

export const getAllUsers = async ()=>{
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = [];
        querySnapshot.forEach((doc) =>{
            users.push({id:doc.id, ...doc.data()});
        });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw error;
    }
}

export const logoutUser = async (user) => {
    if (!user) return;

    // Update Realtime Database status
    const userStatusDBRef = ref(rtdb, `/status/${user.uid}`);
    await set(userStatusDBRef, {
        state: 'offline',
        lastActive: serverTimestamp(),
    });

    // Update Firestore status
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
        status: 'offline',
        lastActive: fsTimeStamp(),
    });

    await signOut(auth);
    
} 