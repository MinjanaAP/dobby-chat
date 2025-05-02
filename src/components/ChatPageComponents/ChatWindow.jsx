import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import { Star, Pin } from 'lucide-react';
import { PinnedMessages } from "./PinnedMessages";
import { useState, useEffect } from "react";
import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";

const MOCK_MESSAGES = [
    {
    id: 1,
    content: "Hey! How's the project going?",
    timestamp: '12:30 PM',
    senderId: 'glUi6harqPWDNsT4jyUiY3Z0UXA3', 
    status: 'read',
    },
    {
    id: 2,
    content: "It's coming along great! I've just finished the main features.",
    timestamp: '12:31 PM',
    senderId: 'JEs0f3YT0yePpIQT65H7ZEv7u6E2', 
    status: 'read',
    },
    {
    id: 3,
    content: "That's awesome! Can you show me a demo tomorrow?",
    timestamp: '12:32 PM',
    senderId: 'glUi6harqPWDNsT4jyUiY3Z0UXA3', 
    status: 'read',
    },
    {
    id: 4,
    content: "Sure thing! I'll prepare it tonight.",
    timestamp: '12:33 PM',
    senderId: 'JEs0f3YT0yePpIQT65H7ZEv7u6E2', 
    status: 'read',
    },
    {
    id: 5,
    content: "Great, looking forward to it!",
    timestamp: '12:34 PM',
    senderId: 'glUi6harqPWDNsT4jyUiY3Z0UXA3', 
    status: 'read',
    },
];
  

export const ChatWindow = ({ conversation, onBack, authUser }) => {
    const {
        senderDetails,
        receiverDetails,
        typingStatus,
    } = conversation;

    const [pinnedClose, setPinnedClose] = useState(false);
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

    const closePinnedMessages = () => {
        setPinnedClose(true);
    }
    return (
        <Box display="flex" flexDirection="column" height="100vh">
            {/* Chat header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={2}
                py={1.5}
                sx={{
                    borderBottom: '1px solid #2a2a4a',
                    backgroundColor: 'rgba(10,10,31,0.8)',
                    backdropFilter: 'blur(10px)',
                    position: 'relative' // Added for proper positioning
                }}
            >
                {/* Left side - Back button and user info */}
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton
                        onClick={onBack}
                        sx={{
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                            },
                            p: 1 
                        }}
                    >
                        <ArrowBackIosNewRounded fontSize="small" />
                    </IconButton>
                    
                    <Avatar 
                        src={receiver.profileImage} 
                        alt={receiver.name} 
                        sx={{ 
                            width: 40, 
                            height: 40,
                            border: '2px solid rgba(255,255,255,0.1)'
                        }} 
                    />
                    
                    <Box justifyContent="start" >
                        <Typography fontWeight={500} color="white">
                            {receiver.name}
                        </Typography>
                        { receiver.typing ? (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#4f46e5',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                typing...
                            </Typography>
                        ):(
                            <Typography variant="body2" color="gray" sx={{ textAlign:"start" }}>
                                {conversation.online ? 'Online' : 'Offline'}
                            </Typography>
                        )}
                        
                        
                    </Box>
                </Box>

                {/* Right side - Action buttons */}
                <Box display="flex" gap={1}>
                    <IconButton sx={{ 
                        color: 'gray', 
                        '&:hover': { 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white'
                        } 
                    }}>
                        <Star size={20} />
                    </IconButton>
                    <IconButton sx={{ 
                        color: 'gray', 
                        '&:hover': { 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white'
                        } 
                    }}>
                        <Pin size={20} />
                    </IconButton>
                </Box>
            </Box>

            {/* //? Pinned messages */}
            {!pinnedClose && (
                <PinnedMessages handleClose={closePinnedMessages} />
            ) }

            <Box sx={{ flex:.8, overflowY:'auto', padding: 2 }} >
                {MOCK_MESSAGES.map((message) => (
                    <Message key={message.id} message={message} authUser={authUser}/>
                ))}
                {!receiver.typing && (
                    <TypingIndicator/>
                )}
            </Box>
            <ChatInput conversation={conversation} authUser={authUser} />
        </Box>
    )
}