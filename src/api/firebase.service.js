import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import { db } from "../firebase"


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

export const sendMessages = async (message, conversationId, userId) => {
    try {
        const messageRef = collection(db, "conversations", conversationId, "messages");

        await addDoc(messageRef, {
            senderId: userId,
            content:message,
            timestamp: serverTimestamp()
        });

        //? Update last message in conversation
        const conversationRef = doc(db, "conversations", conversationId);
        const conversationSnap = await getDoc(conversationRef);

        const unreadCount = conversationSnap.exists() ? (conversationSnap.data().unreadCount || 0) + 1: 1;

        await setDoc(conversationRef, {
            lastMessage: message,
            unreadCount,
            lastMessageSenderId: userId
        },{ merge: true });

        const response = {
            status: true,
            messageId: conversationId
        }

        return response;
    } catch (error) {
        console.error("Error sending messages : ", error);
        return error;
    }
}