import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore"
import { db } from "../firebase"
import { id } from "date-fns/locale";

/**
 * * create or return an existing conversation id between users
 * @param {{ authUserId: string }}
 * @param {{ profileImageUrl:string, email:string, username:string }} loggedUser
 * @param {{ id: string, profileImageUrl:string, username:string, email:string }} otherUser 
 * @returns {Promise<string|null>} 
 */
export const createConversation = async (authUserId, loggedUser, otherUser) => {
    try {
        const q = query(collection(db, "conversations"), where("participants", "array-contains", authUserId));
        const existingConversations = await getDocs(q);
        let conversationId = null;

        existingConversations.forEach((doc) => {
            if (doc.data().participants.includes(otherUser.id)) {
                conversationId = doc.id;
            }
        });

        if (!conversationId) {
            const newConversationRef = await addDoc(collection(db, "conversations"), {
                participants: [ authUserId, otherUser.id ],
                senderDetails : {
                    id : authUserId,
                    name : loggedUser.username,
                    profileImg : loggedUser?.profileImageUrl || null
                },
                receiverDetails : {
                    id : otherUser.id,
                    name : otherUser.username,
                    profileImg : otherUser?.profileImageUrl || null
                },
                lastMessage: "",
                unreadCount: 0,
                lastMessageSenderId : "",
                pinned: false,
                typingStatus: {
                    [authUserId]: false,
                    [otherUser.id]: false
                },
                timestamp : serverTimestamp(),
            });

            conversationId = newConversationRef.id;
        }

        return conversationId;

    } catch (error) {
        return error;
    }    
}

export const getLoggedUsersConversations = async (authUserId) => {
    try {
        const q = query(collection(db, "conversations"), where("participants", "array-contains", authUserId));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting conversations:", error);
        return error;
    }
}