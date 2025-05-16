import { SearchOutlined } from "@mui/icons-material";
import { Box, InputBase, List, ListItem, Paper, Button, Typography, useMediaQuery } from "@mui/material";
import { ConversationCard } from "./ConversationCard";
import { useEffect, useMemo, useState } from "react";
import { getLoggedUsersConversations } from "../../api/firebase.service";
import { useNavigate } from "react-router-dom";
import ConversationCardSkeleton from "../Skeleton/ConversationCardSkeleton";
import EmptyConversationList from "./EmptyConversationList";
import { useTheme } from '@mui/material/styles';
import { MessageSquarePlus } from "lucide-react";


export const ConversationList = ({ onSelectedConversation, authUser }) => {

    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if(!authUser) return;

        const getConversation = async () =>{
            try {
                setLoading(true);
                const conversations = await getLoggedUsersConversations(authUser.uid);
                // console.log("conversations", JSON.stringify(conversations, null,2));
                if(!conversations){
                    console.error("Error in getting conversations.");
                }
                setConversations(conversations);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        getConversation();
    },[authUser]);

    const handleSearch = (text) => {
        setSearchText(text.toLowerCase());
    }

    const filteredConversation = useMemo(() => {
        if (!searchText) return conversations;

        return conversations.filter(conversation => 
            conversation.receiverDetails.name?.toLowerCase().includes(searchText) ||
            conversation.senderDetails.name?.toLowerCase().includes(searchText)
        );
    }, [conversations, searchText]);

    const handleNavigate = () => {
        navigate('/search-users');
    }

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
                        onChange={(e) => {
                            e.preventDefault();
                            handleSearch(e.target.value);
                        }}
                    />
                </Paper>
                <Button
                    onClick={handleNavigate}
                    startIcon={<MessageSquarePlus size={20} />}
                    sx={{
                        px: 4,
                        py: 1.5,
                        mt: 2,
                        width: '100%',
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: '500',
                        background: 'linear-gradient(to right, #4f46e5, #9f7aea)',
                        color: '#FFFFFFAF',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 0 20px rgba(79, 70, 229, 0.5)',
                        },
                    }}
                    >
                    {isMobile ? 'Add conversation' : 'Create New Conversation'}
                </Button>
            </Box>

            {/* Conversation Items */}
            <Box flex={1} overflow="auto" paddingBottom={16}>
                {!loading ? (
                    filteredConversation.length === 0 ? (
                        <EmptyConversationList/>
                    ):(
                        <List disablePadding>
                            {filteredConversation.map((conversation) => (
                                <ListItem key={conversation.id} disableGutters >
                                    <ConversationCard conversation={conversation} onClick={onSelectedConversation} authUser={authUser}/>
                                </ListItem>
                            ))}
                        </List>
                    )
                ) : (
                    <ConversationCardSkeleton count={6} />
                )}
            </Box>
        </Box>
    )
}