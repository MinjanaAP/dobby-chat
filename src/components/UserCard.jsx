import { Avatar, Box, Card, Typography, IconButton } from "@mui/material"
import ChatIcon from '@mui/icons-material/ChatBubbleOutline';
import { createConversation } from "../api/firebase.service";
import { useEffect, useState } from "react";
import { getUserDetails } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { rtdb } from "../firebase";


const UserCard = ({user, authUser}) =>{
    const [isOnline, setIsOnline] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const navigate = useNavigate();

    //? get receiver online status
        useEffect(() => {
            if (!user) return;
            
            const statusRef = ref(rtdb, `/status/${user?.id}`);
    
            const unsubscribe = onValue(statusRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    console.log("🔥 Got data:", data);
                    setIsOnline(data.state === 'online');
                } else {
                    console.log("⚠️ No snapshot at:", `/status/${user?.id}`);
                    setIsOnline(false); 
                }
            },
            (error) => { console.error("❌ Firebase listener error:", error); }
            );
    
            return () => unsubscribe();
        }, [user]);

    const createNewConversation = async () => {
        const getUser = await getUserDetails(authUser?.uid);
        // console.log("logged user get details : ", JSON.stringify(getUser,null,2));
        // console.log("logged user : ", JSON.stringify(authUser,null,2));
        // console.log("Other user : ", JSON.stringify(user,null,2));
        try {
            const newConversationId = await createConversation(authUser.uid, getUser, user);
            if (newConversationId) {
                setConversationId(newConversationId);
                console.log("Conversation Id : ", newConversationId);
                navigate(`/conversations?conversationId=${newConversationId}`);
            }else{
                console.error("Error in creating conversation.");
            }
        } catch (error) {
            console.error("Error in creating conversation.", error);
        }
    }

    const timestamp = user.lastActive?.seconds ? new Date(user.lastActive.seconds * 1000)  : null;

    let formattedDateTime = '';

    if (timestamp) {
        const now = new Date();

        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const messageDate = new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate());

        const timeString = timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        if (messageDate.getTime() === today.getTime()) {
            formattedDateTime = `Today at ${timeString}`;
        } else if (messageDate.getTime() === yesterday.getTime()) {
            formattedDateTime = `Yesterday at ${timeString}`;
        } else {
            const dateString = timestamp.toLocaleDateString([], {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            formattedDateTime = `${dateString} at ${timeString}`;
        }
    }


    return(
        <Card
        onClick={createNewConversation}
        sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(135deg, rgba(26,26,63,0.4), rgba(42,42,74,0.3))",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            border: "1px solid rgba(58, 58, 106, 0.3)",
            p: 2,
            transition: "all 0.3s",
            "&:hover": {
            borderColor: "#4f46e5",
            boxShadow: "0 0 20px rgba(79, 70, 229, 0.15)",
            },
            overflow: "visible",
            margin:"1em 0"
        }}
        >
            <Box position="relative" mr={2} >
                <Avatar
                    src= {user.profileImageUrl}
                    alt= {user.username}
                    sx={{ width: 48, height: 48 }}
                />
                {isOnline && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        border: "2px solid #0a0a1f",
                        backgroundColor:  "green",
                    }}
                />
                )}
                </Box>
                <Box flex={1}>
                    <Typography sx={{ color: "#fff", fontWeight: 500, textAlign:'start' }}>
                    {user.username}
                    </Typography>
                    <Typography sx={{ color: "gray", fontSize: "0.875rem", textAlign:'start' }}>
                    {isOnline ? (
                        "online"
                    ):(
                        user.lastActive ? formattedDateTime : 'offline'
                    )}
                    </Typography>
                </Box>

                <IconButton
                    onClick={()=>{}}
                    sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                    },
                    }}
                >
                    <ChatIcon
                    sx={{
                        color: "gray",
                        transition: "color 0.3s",
                        "&:hover": { color: "#4f46e5" },
                    }}
                    />
                </IconButton>

                <Box
                    sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 3,
                    background: "linear-gradient(to right, rgba(79,70,229,0), rgba(159,122,234,0))",
                    opacity: 0,
                    pointerEvents: "none",
                    transition: "opacity 0.3s",
                    "&:hover": {
                        opacity: 0.1,
                    },
                    }}
                />
                
        </Card>
    )
}

export default UserCard;