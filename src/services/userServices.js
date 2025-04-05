import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

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