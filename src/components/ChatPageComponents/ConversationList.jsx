import { SearchOutlined } from "@mui/icons-material";
import { Box, InputBase, List, ListItem, Paper } from "@mui/material";
import { ConversationCard } from "./ConversationCard";
import { useEffect, useState } from "react";
import { getLoggedUsersConversations } from "../../api/firebase.service";


export const ConversationList = ({ onSelectedConversation, authUser }) => {

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        if(!authUser) return;

        const getConversation = async () =>{
            try {
                const conversations = await getLoggedUsersConversations(authUser.uid);
                console.log("conversations", JSON.stringify(conversations, null,2));
                if(!conversations){
                    console.error("Error in getting conversations.");
                }
                setConversations(conversations);
            } catch (error) {
                console.error(error);
            }
        }

        getConversation();
    },[authUser]);

    return (
        <Box
            display='flex'
            flexDirection="column"
            height="100vh"
        >
            {/* search bar */}
            <Box
                p={2} borderBottom="1px solid #2a2a4a"
            >
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <SearchOutlined sx={{ color: 'gray', mr: 1 }} />
                    <InputBase
                        fullWidth
                        placeholder="Search Conversations"
                        sx={{
                            color: 'white',
                            '& input::placeholder': {
                                color: 'gray',
                            },
                        }}
                    />
                </Paper>
            </Box>

            {/* Conversation Items */}
            <Box flex={1} overflow="auto" >
                <List disablePadding>
                    {conversations.map((conversation) => (
                        <ListItem key={conversation.id} disableGutters >
                            <ConversationCard conversation={conversation} onClick={onSelectedConversation} authUser={authUser}/>
                        </ListItem>
                    ))}
                </List>
            </Box>

        </Box>
    )
}