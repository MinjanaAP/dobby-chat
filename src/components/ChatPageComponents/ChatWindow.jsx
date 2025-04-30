import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import { Star, Pin } from 'lucide-react';

export const ChatWindow = ({ conversation, onBack }) => {
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
                        src={conversation.avatar} 
                        alt={conversation.name} 
                        sx={{ 
                            width: 40, 
                            height: 40,
                            border: '2px solid rgba(255,255,255,0.1)'
                        }} 
                    />
                    
                    <Box>
                        <Typography fontWeight={500} color="white">
                            {conversation.name}
                        </Typography>
                        <Typography variant="body2" color="gray">
                            {conversation.online ? 'Online' : 'Offline'}
                        </Typography>
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

            {/* Rest of your chat window content would go here */}
        </Box>
    )
}