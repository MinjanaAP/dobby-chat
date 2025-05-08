import { useTheme } from '@mui/material/styles';
import { ArrowBackIosRounded } from '@mui/icons-material';
import { Box, IconButton, useMediaQuery } from '@mui/material'
import Typography from '@mui/material/Typography'
import { ConversationList } from './ConversationList';
import { useState } from 'react';
import { ChatWindow } from './ChatWindow';
import EmptyChat from './EmptyChat';
import { resetUnreadCount } from '../../api/firebase.service';

export const ChatSection = ({ authUser }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedConversation, setSelectedConversation] = useState(null);

    const handleSelectedConversation = async (conversation) => {
        setSelectedConversation(conversation);
        // console.log("Selected Conversation Details :", conversation);
        await resetUnreadCount( conversation?.id,  authUser.uid );
    }

    const handleBack = () => {
        setSelectedConversation(null);
        console.log("Selected conversation is null");
    }
    
    return (
        <Box
            component="section"
            position="fixed"
            zIndex={10}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 4rem)",
                width: "100%",
                
                py: {
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 4,
                },
            }}
        >

            <Box
                sx={{
                    width: '100%',
                    maxWidth: { lg: 1500 }, 
                    margin: '0 auto',
                }}
            >

                {/* Main Layout */}
                <Box
                    display="flex"
                    width="100%"
                    height="100%"
                >
                    {isMobile ? (
                        selectedConversation ? (
                            <>
                                <Box
                                    flex={1}
                                    sx={{
                                        backgroundColor: 'rgba(10,10,31,0.008)',
                                        backdropFilter: 'blur(12px)',
                                    }}
                                >
                                    {selectedConversation && (
                                        <ChatWindow conversation={selectedConversation} onBack={handleBack} authUser={authUser}/>
                                    )}
                                </Box>
                            </>
                        ):(
                            <>
                                <Box
                                    width={{ xs: '100%', md: 380, lg: 420 }}
                                    height="100%"
                                    borderRight="1px solid #2a2a4a"
                                    sx={{
                                        backgroundColor: 'rgba(10,10,31,0.0095)',
                                        backdropFilter: 'blur(12px)',
                                    }}
                                >
                                    <ConversationList onSelectedConversation={handleSelectedConversation} authUser={authUser}/>
                                </Box> 
                            </>
                        )
                    ):(
                        <>
                            {/* Side bar */}
                            <Box
                                width={{ xs: '100%', md: 380, lg: 420 }}
                                height="100%"
                                borderRight="1px solid #2a2a4a"
                                sx={{
                                    backgroundColor: 'rgba(10,10,31,0.0095)',
                                    backdropFilter: 'blur(12px)',
                                }}
                            >
                                <ConversationList onSelectedConversation={handleSelectedConversation} authUser={authUser}/>
                                <Typography variant="body1" color="initial">chat side bar</Typography>
                            </Box>
                             {/* Chat window */}
                            <Box
                                flex={1}
                                sx={{
                                    backgroundColor: 'rgba(10,10,31,0.008)',
                                    backdropFilter: 'blur(12px)',
                                }}
                            >
                                {selectedConversation ? (
                                    <ChatWindow conversation={selectedConversation} onBack={handleBack} authUser={authUser}/>
                                ) : (
                                    <EmptyChat/>
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}