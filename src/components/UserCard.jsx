import { Avatar, Box, Card, Typography, IconButton } from "@mui/material"
import ChatIcon from '@mui/icons-material/ChatBubbleOutline';
import { createConversation } from "../api/firebase.service";
import { useState } from "react";
import { getUserDetails } from "../services/userServices";


const UserCard = ({user, authUser}) =>{
    const isOnline = true;
    const [conversationId, setConversationId] = useState(null);

    const createNewConversation = async () => {
        const getUser = await getUserDetails(authUser?.uid);
        console.log("logged user get details : ", JSON.stringify(getUser,null,2));
        console.log("logged user : ", JSON.stringify(authUser,null,2));
        console.log("Other user : ", JSON.stringify(user,null,2));
        try {
            const newConversationId = await createConversation(authUser.uid, getUser, user);
            if (newConversationId) {
                setConversationId(newConversationId);
                console.log("Conversation Id : ", newConversationId);
            }else{
                console.error("Error in creating conversation.");
            }
        } catch (error) {
            console.error("Error in creating conversation.", error);
        }
    }

    return(
        <Card
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
                <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    border: "2px solid #0a0a1f",
                    backgroundColor: isOnline ? "green" : "gray",
                }}
                />
                </Box>
                <Box flex={1}>
                    <Typography sx={{ color: "#fff", fontWeight: 500, textAlign:'start' }}>
                    {user.username}
                    </Typography>
                    <Typography sx={{ color: "gray", fontSize: "0.875rem", textAlign:'start' }}>
                    lastActive
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
                    onClick={createNewConversation}
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