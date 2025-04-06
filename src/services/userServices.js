import { collection, doc, getDoc, getDocs } from "firebase/firestore"
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