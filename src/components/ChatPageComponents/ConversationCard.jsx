import { Avatar, Typography, Box } from "@mui/material";
import { CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const ConversationCard = ({ conversation, onClick, authUser }) => {

    const {
        senderDetails,
        receiverDetails,
        timestamp,
        pinned
    } = conversation;

    const [online, setOnline]  = useState(false);
    const [lastMessage, setLastMessage] = useState('');
    const [unreadCount, setUnreadCount] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [typingStatus, setTypingStatus] = useState({});

    const [receiver, setReceiver] = useState({
        id:"",
        name:"",
        profileImage:"",
        typing:""
    });

    useEffect(() => {
        if (!conversation) return;
        // console.error("authUser", JSON.stringify(authUser, null, 2));
    
        if (senderDetails.id === authUser.uid) {
            setReceiver({
                id: receiverDetails.id,
                name: receiverDetails.name,
                profileImage: receiverDetails.profileImg,
                typing: typingStatus[receiverDetails.id]
            });
        } else {
            setReceiver({
                id: senderDetails.id,
                name: senderDetails.name,
                profileImage: senderDetails.profileImg,
                typing: typingStatus[senderDetails.id]
            });
        }
        
    }, [conversation, authUser]);

    useEffect(() => {
        if (!conversation || !authUser?.uid) return;
    
        const conversationRef = doc(db, "conversations", conversation.id);

        const unsubscribe = onSnapshot(conversationRef, (docSnap) => {
            if(!docSnap.exists()) return;

            const data = docSnap.data();
            setTypingStatus(data.typingStatus || {});
            setLastMessage(data.lastMessage || "");
            setUnreadCount(
                data.lastMessageSenderId === authUser.uid ? 0 : data.unreadCount || 0
            );
            if(data.timestamp){
                setLastUpdate(new Date(data.timestamp.second*1000));
            }

        });

        return () => unsubscribe();
    }, [conversation?.id, authUser?.uid]);

    const otherUserTyping = Object.entries(typingStatus).some(
        ([userId, isTyping]) => userId !== authUser.uid && isTyping
    );

     const formattedTimestamp = new Date(timestamp?.seconds*1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })


    return (
        <Box
            onClick={() => onClick(conversation)}
            position="relative"
            width="100%"
            px={2}
            py={2}
            borderBottom="1px solid #2a2a4a"
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
            }}
            
        >
            {/* Pinned conversations */}
            {pinned && (
                <Box
                    position="absolute"
                    top={8}
                    right={8}
                    width={6}
                    height={6}
                    borderRadius="50%"
                    bgcolor="#4f46e5"
                />
            )}

            {/* Layout */}
            <Box display="flex" alignContent="center" gap={2} >
                <Box position="relative">
                    <Avatar src={receiver.profileImage} alt={receiver.name} sx={{ width: 48, height: 48 }} />
                    {online && (
                        <Box
                            position="absolute"
                            bottom={0}
                            right={0}
                            width={12}
                            height={12}
                            bgcolor="green"
                            border="2px solid #0a0a1f"
                            borderRadius="50%"
                        />
                    )}
                </Box>

                {/* Main content */}
                <Box flex={1} minWidth={0} >
                    <Box display="flex" justifyContent="space-between" alignContent="center" mb={0.5} >
                        <Typography fontWeight={500} noWrap color="white">
                            {receiver.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: 'gray', marginLeft: 1, whiteSpace: 'nowrap' }}
                        >
                            {formattedTimestamp}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={0.5}>
                        {(unreadCount === 0 && !otherUserTyping && lastMessage )&& (
                            <CheckCheck size={16} color="#4f46e5" style={{ flexShrink: 0 }} />
                        )}
                        <Typography
                            variant="body2"
                            sx={{
                                color: otherUserTyping ? '#4f46e5' : 'gray',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {otherUserTyping? 'typing...' : lastMessage}
                        </Typography>
                        {!lastMessage && (
                            <Typography variant="body2" 
                                sx={{
                                    color: 'gray',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >💬 No messages yet. Say hi 👋 to begin the chat.</Typography>
                        )}
                    </Box>
                </Box>

                {/* Unread badge */}
                {unreadCount > 0 && (
                <Box
                    minWidth={20}
                    height={20}
                    bgcolor="#4f46e5"
                    color="white"
                    borderRadius="9999px"
                    fontSize={12}
                    px={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {unreadCount}
                </Box>
                )}
            </Box>
        </Box>
    )
}