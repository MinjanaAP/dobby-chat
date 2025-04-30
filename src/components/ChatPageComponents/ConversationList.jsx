import { SearchOutlined } from "@mui/icons-material";
import { Box, InputBase, List, ListItem, Paper } from "@mui/material";
import { ConversationCard } from "./ConversationCard";

const MOCK_CONVERSATIONS = [
    {
        id: 1,
        name: 'Alex Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        lastMessage: "Sure, let's meet tomorrow!",
        timestamp: '12:30 PM',
        unread: 2,
        online: true,
        typing: true,
        pinned: false
    },
    {
        id: 2,
        name: 'Sarah Wilson',
        avatar: 'https://i.pravatar.cc/150?img=2',
        lastMessage: 'The project is looking great!',
        timestamp: '10:15 AM',
        unread: 0,
        online: true,
        typing: false,
        pinned: true
    },
    {
        id: 3,
        name: 'Michael Brown',
        avatar: 'https://i.pravatar.cc/150?img=3',
        lastMessage: 'Can you review the documents?',
        timestamp: 'Yesterday',
        unread: 1,
        online: false,
        typing: false,
        pinned: false
    },
    {
        id: 4,
        name: 'Emily Davis',
        avatar: 'https://i.pravatar.cc/150?img=4',
        lastMessage: 'Thanks for your help!',
        timestamp: 'Yesterday',
        unread: 0,
        online: false,
        typing: false,
        pinned: true
    },
    {
        id: 5,
        name: 'David Miller',
        avatar: 'https://i.pravatar.cc/150?img=5',
        lastMessage: 'Meeting at 3 PM',
        timestamp: 'Monday',
        unread: 3,
        online: true,
        typing: false,
        pinned: false
    },
    {
        id: 6,
        name: 'Jessica Wilson',
        avatar: 'https://i.pravatar.cc/150?img=6',
        lastMessage: 'Did you see the email I sent?',
        timestamp: 'Sunday',
        unread: 0,
        online: false,
        typing: false,
        pinned: false
    },
    {
        id: 7,
        name: 'Daniel Taylor',
        avatar: 'https://i.pravatar.cc/150?img=7',
        lastMessage: 'Let me know when you are free',
        timestamp: 'Last week',
        unread: 0,
        online: true,
        typing: true,
        pinned: false
    },
    {
        id: 8,
        name: 'Olivia Martinez',
        avatar: 'https://i.pravatar.cc/150?img=8',
        lastMessage: 'The files have been uploaded',
        timestamp: 'Last week',
        unread: 1,
        online: false,
        typing: false,
        pinned: false
    }
];

export const ConversationList = ({onSelectedConversation}) => {
    return(
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
                    <SearchOutlined sx={{color: 'gray', mr:1 }} />
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
                    {MOCK_CONVERSATIONS.map((conversation) => (
                        <ListItem key={conversation.id} disableGutters >
                            <ConversationCard conversation={conversation} onClick={onSelectedConversation} />
                        </ListItem>
                    ))}
                </List>

            </Box>

        </Box>
    )
}