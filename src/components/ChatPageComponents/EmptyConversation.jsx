import React from 'react';
import { Box, Typography } from '@mui/material';
import { MessageSquare } from 'lucide-react';
import { keyframes } from '@emotion/react';

// Animation: pulse and scale
const scaleIn = keyframes`
0% { transform: scale(0.8); opacity: 0; }
100% { transform: scale(1); opacity: 1; }
`;

const floatUp = keyframes`
0%, 100% { transform: translateY(0); opacity: 0.7; }
50% { transform: translateY(-12px); opacity: 1; }
`;

const EmptyChatAlt = () => {
return (
    <Box
    height="100%"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    px={4}
    position="relative"
    sx={{ animation: `${scaleIn} 1s ease-out` }}
    >
    {/* Floating ring layers */}
    <Box position="relative" mb={4}>
        {/* Outer ring */}
        <Box
        sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '3px dashed rgba(99,102,241,0.3)',
            animation: `${floatUp} 6s ease-in-out infinite`,
        }}
        />
        {/* Middle ring */}
        <Box
        sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            width: 76,
            height: 76,
            borderRadius: '50%',
            border: '2px solid rgba(165,180,252,0.4)',
            animation: `${floatUp} 5s ease-in-out infinite`,
            animationDelay: '1s',
        }}
        />
        {/* Center icon */}
        <Box
        sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(99,102,241,0.05)',
            borderRadius: '50%',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
        }}
        >
        <MessageSquare size={36} color="#4f46e5" />
        </Box>
    </Box>

    {/* Title */}
    <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{
        background: 'linear-gradient(to right, white, #c7d2fe, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        }}
    >
        Start a New Conversation
    </Typography>

    {/* Description */}
    <Typography color="gray" textAlign="center" maxWidth={400}>
        Nobody has messaged in this chat yet. Say hello to start the conversation.
    </Typography>
    </Box>
);
};

export default EmptyChatAlt;
