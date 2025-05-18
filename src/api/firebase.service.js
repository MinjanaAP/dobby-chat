import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where, writeBatch } from "firebase/firestore"
import { db } from "../firebase"


/**
 * * create or return an existing conversation_id between users
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

/**
 * * GET conversation details By ID
 * @param {string} conversationId 
 * @returns 
 */
export const getConversationById = async (conversationId) => {
    try {
        const conversationRef = doc(db, "conversations", conversationId);
        const conversationSnap = await getDoc(conversationRef);
        if(conversationSnap.exists()) {
            return {
                id: conversationSnap.id,
                ...conversationSnap.data()
            };
        }else {
            console.warn("No conversation found with ID:", conversationId);
            return null;
        }
    } catch (error) {
        console.error("Error getting conversation details :", error);
        return null;
    }
}

/**
 * * Send Messages to firebase
 * @param {* string} message 
 * @param {* string} conversationId 
 * @param {* string} userId 
 * @returns 
 */
export const sendMessages = async (message, conversationId, userId, status) => {
    try {
        const messageRef = collection(db, "conversations", conversationId, "messages");

        await addDoc(messageRef, {
            senderId: userId,
            content:message,
            status: status === true ? "delivered" : "sent",
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

/**
 * *real-time snapshot function for last-message update and unread-count update
 * @param {{ conversationId:string, userId:string }}
 * @returns {{ callback => lastMessage: string, unreadCount:number, timestamp: Date}}
 */
export const listenToConversationSummery = (conversationId, userId, callback) => {
    const conversationRef = doc(db, "conversation", conversationId);

    const unsubscribe = onSnapshot(conversationRef, (docSnapshot) => {
        if(docSnapshot.exists()){
            const data = docSnapshot.data();
            const isOwnMessage = data.lastMessageSenderId === userId;

            callback({
                lastMessage: data.lastMessage || "",
                unreadCount: isOwnMessage ? 0 : data.unreadCount || 0,
                timestamp: data.timestamp ? new Date(data.timestamp.seconds *1000) : null
            });
        }
    });

    return unsubscribe;
}

/**
 * * set unread count to zero when open the conversation
 * @param {{ conversationId: string, userId:string }}
 * @returns  null
 */
export const resetUnreadCount = async (conversationId, userId) => {
    try {
        const conversationRef = doc(db, "conversations", conversationId);
        const docSnap = await getDoc(conversationRef);  

        if(!docSnap.exists()) return;

        const data = docSnap.data();

        const lastSenderId = typeof data.lastMessageSenderId === "string" 
            ? data.lastMessageSenderId 
            : String(data.lastMessageSenderId || "");
            
        const currentUserId = typeof userId === "string" 
            ? userId 
            : String(userId || "");

        if(lastSenderId !== currentUserId && data.unreadCount > 0){
            await updateDoc(conversationRef, {  // Changed from update()
                unreadCount: 0
            });
        }

    } catch (error) {
        console.error("Error resetting unread count", error);
        throw error; 
    }
}

/**
 * * Update typing status
 * @param {{ conversationId:string, userId:string, isTyping:boolean }}
 */
export const updateTypingStatus = async (conversationId, userId, isTyping) => {
    try {
        const conversationRef = doc(db, 'conversations', conversationId);
        await updateDoc(conversationRef, {
            [`typingStatus.${userId}`]: isTyping
        });
    } catch (error) {
        console.error("Error updating typing status:", error);
    }
}

/**
 * * Save FCM Token to user docs
 * @param {{ userId:string, token: string }}
 */
export const saveFCMTokenToUser = async (userId, token) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if(userDocSnapshot.exists()){
            await updateDoc(userDocRef, {
                fcmToken: token
            });
            console.log('FCM Token saved successfully.');
        }else{
            console.error('User document not found.');
        }
    } catch (error) {
        console.error('Error saving FCM Token:', error);
    }
}

/**
 * * Update message status to delivered
 */
export const updateDeliveredMessages = async (loggedUserId) => {
    try {
        const conversationQuery = query(
            collection(db, "conversations"),
            where("participants", "array-contains", loggedUserId)
        );

        const conversationSnapshot = await getDocs(conversationQuery);

        for (const convoDoc of conversationSnapshot.docs) {
            const convoData = convoDoc.data();

            if (convoData.lastMessage && convoData.lastMessageSenderId && convoData.lastMessageSenderId !== loggedUserId) {
                const messageRef = collection(db, "conversations", convoDoc.id, "messages");

                const unreadQuery = query(messageRef,
                    where("senderId", "!=", loggedUserId),
                    where("status", "==", "sent")
                );

                const unreadSnapshot = await getDocs(unreadQuery);
                const batch = writeBatch(db);

                unreadSnapshot.forEach((msgDoc) => {
                    batch.update(msgDoc.ref, { status: "delivered" });
                });

                if (!unreadSnapshot.empty) {
                    await batch.commit();
                    console.log(`Updated delivered messages in conversation: ${convoDoc.id}`);
                }
            }
        }
        console.log("Message delivery status update complete.");
    }catch (error) {
        console.error("Failed to update delivered messages: ", error);
    }
}