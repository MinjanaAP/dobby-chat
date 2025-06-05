import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import { Star, Pin, EllipsisVertical } from 'lucide-react';
import { PinnedMessages } from "./PinnedMessages";
import { useState, useEffect, useRef } from "react";
import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db, rtdb } from "../../firebase";
import EmptyConversation from "./EmptyConversation";
import { onValue, ref } from "firebase/database";

export const ChatWindow = ({ conversation, onBack, authUser }) => {
    const {
        senderDetails,
        receiverDetails,
    } = conversation;

    const [pinnedClose, setPinnedClose] = useState(false);
    const [online, setOnline] = useState(false);
    const [receiver, setReceiver] = useState({
        id: "",
        name: "",
        profileImage: "",
        typing: ""
    });
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState({});
    const boxRef = useRef(null);

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (!conversation) return;
        // console.error("conversation", JSON.stringify(conversation, null, 2));

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

    }, [conversation]);

    //? get receiver online status
    useEffect(() => {
        if (!receiver?.id) return;

        const statusRef = ref(rtdb, `/status/${receiver.id}`);

        const unsubscribe = onValue(statusRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // console.log("🔥 Got data:", data);
                setOnline(data.state === 'online');
            } else {
                // console.log("⚠️ No snapshot at:", `/status/${receiver.id}`);
                setOnline(false);
            }
        },
            (error) => { console.error("❌ Firebase listener error:", error); }
        );

        return () => unsubscribe();
    }, [receiver?.id]);

    //? Fetch messages real-time
    useEffect(() => {
        if (!conversation?.id) return;

        const messageRef = collection(db, "conversations", conversation.id, "messages");
        const q = query(messageRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const msgs = [];
            const updates = [];

            snapshot.forEach((docSnap) => {
                const msg = { id: docSnap.id, ...docSnap.data() };
                msgs.push(msg);

                if (msg.status !== "seen" && msg.senderId !== authUser.uid) {
                    const msgRef = doc(db, "conversations", conversation.id, "messages", msg.id);
                    updates.push(updateDoc(msgRef, { status: "seen" }));
                }
            });

            setMessages(msgs);

            try {
                await Promise.all(updates);
            } catch (error) {
                console.error("❌ Error updating seen status:", error);
            }
        });

        return () => unsubscribe();
    }, [conversation?.id, authUser.uid]);


    //? catch typing status change real-time
    useEffect(() => {
        const conversationRef = doc(db, 'conversations', conversation?.id);

        const unsubscribe = onSnapshot(conversationRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTypingStatus(data.typingStatus || {});
            }
        });

        return () => unsubscribe();
    }, [conversation?.id]);

    const otherUserTyping = Object.entries(typingStatus).some(
        ([userId, isTyping]) => userId !== authUser.uid && isTyping
    );

    const closePinnedMessages = () => {
        setPinnedClose(true);
    }

    //? Group messages by date
    const groupMessages = (messages) => {

        return messages.reduce((groups, message) => {
            if (!message.timestamp?.seconds) return groups;

            const date = new Date(message.timestamp?.seconds * 1000);
            const dataKey = date.toDateString();

            if (!groups[dataKey]) {
                groups[dataKey] = [];
            }
            groups[dataKey].push(message);
            return groups;
        }, {});
    };

    //? Format Date Labels
    const formatDateLabels = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

        return date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
        });
    };


    return (
        <Box display="flex" flexDirection="column"
            width="100%" 
            maxWidth="100vw"
            sx={{
                height: '100dvh',
                overflowX: 'hidden',
                backgroundColor: '#0a0a1f'
            }}>
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
                    position: 'sticky'
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

                    <Box justifyContent="start" >
                        <Typography fontWeight={500} color="white">
                            {receiver.name}
                        </Typography>
                        {receiver.typing ? (
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
                        ) : (
                            <Typography variant="body2" color="gray" sx={{ textAlign: "start" }}>
                                {online ? 'Online' : 'Offline'}
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
                    <IconButton sx={{
                        color: 'gray',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white'
                        }
                    }}>
                        <EllipsisVertical size={20} />
                    </IconButton>
                </Box>
            </Box>

            {/* //? Pinned messages */}
            {!pinnedClose && (
                <PinnedMessages handleClose={closePinnedMessages} />
            )}

            <Box sx={{ flex: .8, overflowY: 'auto', padding: 2 }} ref={boxRef}>
                {messages.length === 0 ? (
                    <EmptyConversation />
                ) : (
                    <>
                        {Object.entries(groupMessages(messages)).map(([date, msgs]) => (
                            <Box key={date}>
                                <Box textAlign="center" my={2} >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: 'gray',
                                            backgroundColor: '#1a1a2e',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: '20px',
                                            display: 'inline-block'
                                        }}
                                    >
                                        {formatDateLabels(date)}
                                    </Typography>
                                </Box>
                                {msgs.map((message) => (
                                    <Message key={message.id} message={message} authUser={authUser} />
                                ))}
                            </Box>
                        ))}
                        {otherUserTyping && (
                            <TypingIndicator receiver={receiver?.name} />
                        )}
                    </>
                )}

            </Box>
            <Box
                sx={{
                    paddingBottom: 'env(safe-area-inset-bottom)',
                    backgroundColor: '#0a0a1f',
                }}
            >
                <ChatInput
                    conversation={conversation}
                    authUser={authUser}
                    receiverId={receiver.id}
                    status={online}
                />
            </Box>
        </Box>
    )
}