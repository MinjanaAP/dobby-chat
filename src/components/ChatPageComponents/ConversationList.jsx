import { SearchOutlined } from "@mui/icons-material";
import { Box, InputBase, List, ListItem, Paper } from "@mui/material";
import { ConversationCard } from "./ConversationCard";
import { useEffect, useState } from "react";
import { getLoggedUsersConversations } from "../../api/firebase.service";

const MOCK_CONVERSATIONS = [{ id: 'conv_1', participants: ['user_1', 'user_2'], senderDetails: { id: 'user_1', name: 'You', profileImg: 'https://i.pravatar.cc/150?img=1' }, receiverDetails: { id: 'user_2', name: 'Alex Johnson', profileImg: 'https://i.pravatar.cc/150?img=2' }, lastMessage: "Sure, let's meet tomorrow!", lastMessageSenderId: 'user_2', unreadCount: 2, pinned: false, typingStatus: { user_1: false, user_2: true }, timestamp: '12:30 PM' }, { id: 'conv_2', participants: ['user_1', 'user_3'], senderDetails: { id: 'user_1', name: 'You', profileImg: 'https://i.pravatar.cc/150?img=1' }, receiverDetails: { id: 'user_3', name: 'Sarah Wilson', profileImg: 'https://i.pravatar.cc/150?img=3' }, lastMessage: 'The project is looking great!', lastMessageSenderId: 'user_3', unreadCount: 0, pinned: true, typingStatus: { user_1: false, user_3: false }, timestamp: '10:15 AM' }, { id: 'conv_3', participants: ['user_1', 'user_4'], senderDetails: { id: 'user_1', name: 'You', profileImg: 'https://i.pravatar.cc/150?img=1' }, receiverDetails: { id: 'user_4', name: 'Michael Brown', profileImg: 'https://i.pravatar.cc/150?img=4' }, lastMessage: 'Can you review the documents?', lastMessageSenderId: 'user_4', unreadCount: 1, pinned: false, typingStatus: { user_1: false, user_4: false }, timestamp: 'Yesterday' }, { id: 'conv_4', participants: ['user_1', 'user_5'], senderDetails: { id: 'user_1', name: 'You', profileImg: 'https://i.pravatar.cc/150?img=1' }, receiverDetails: { id: 'user_5', name: 'Emily Davis', profileImg: 'https://i.pravatar.cc/150?img=5' }, lastMessage: 'Thanks for your help!', lastMessageSenderId: 'user_5', unreadCount: 0, pinned: true, typingStatus: { user_1: false, user_5: false }, timestamp: 'Yesterday' }, { id: 'conv_5', participants: ['user_1', 'user_6'], senderDetails: { id: 'user_1', name: 'You', profileImg: 'https://i.pravatar.cc/150?img=1' }, receiverDetails: { id: 'user_6', name: 'David Miller', profileImg: 'https://i.pravatar.cc/150?img=6' }, lastMessage: 'Meeting at 3 PM', lastMessageSenderId: 'user_6', unreadCount: 3, pinned: false, typingStatus: { user_1: false, user_6: false }, timestamp: 'Monday' }, { id: 'conv_6', participants: ['user_1', 'user_7'], senderDetails: { id: 'user_1', name: 'You', profileImg: 'https://i.pravatar.cc/150?img=1' }, receiverDetails: { id: 'user_7', name: 'Jessica Wilson', profileImg: 'https://i.pravatar.cc/150?img=7' }, lastMessage: 'Did you see the email I sent?', lastMessageSenderId: 'user_7', unreadCount: 0, pinned: false, typingStatus: { user_1: false, user_7: false }, timestamp: 'Sunday' }, { id: 'conv_7', participants: ['user_1', 'user_8'], senderDetails: { id: 'user_1', name: 'You', profileImg: 'https://i.pravatar.cc/150?img=1' }, receiverDetails: { id: 'user_8', name: 'Daniel Taylor', profileImg: 'https://i.pravatar.cc/150?img=8' }, lastMessage: 'Let me know when you are free', lastMessageSenderId: 'user_8', unreadCount: 0, pinned: false, typingStatus: { user_1: false, user_8: true }, timestamp: 'Last week' }, { id: 'conv_8', participants: ['user_1', 'user_9'], senderDetails: { id: 'user_1', name: 'You', profileImg: 'https://i.pravatar.cc/150?img=1' }, receiverDetails: { id: 'user_9', name: 'Olivia Martinez', profileImg: 'https://i.pravatar.cc/150?img=9' }, lastMessage: 'The files have been uploaded', lastMessageSenderId: 'user_9', unreadCount: 1, pinned: false, typingStatus: { user_1: false, user_9: false }, timestamp: 'Last week' }];

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