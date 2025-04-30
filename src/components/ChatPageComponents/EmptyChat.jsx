import React from 'react';
import { Box, Typography } from '@mui/material';
import { MessageSquare } from 'lucide-react';
import { keyframes } from '@emotion/react';

// Animation definitions
const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;

const float = keyframes`
0%, 100% { transform: translateY(0); }
50% { transform: translateY(-8px); }
`;

const EmptyChat = () => {
return (
    <Box
    height="100%"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    px={4}
    position="relative"
    >
    {/* Spinner layers */}
    <Box position="relative" mb={4}>
        {/* Outer ring */}
        <Box
        sx={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            border: '4px solid rgba(79,70,229,0.2)',
            animation: `${spin} 10s linear infinite`,
        }}
        />
        {/* Middle ring */}
        <Box
        sx={{
            position: 'absolute',
            inset: 0,
            width: 96,
            height: 96,
            borderRadius: '50%',
            border: '4px solid rgba(159,122,234,0.2)',
            borderTopColor: '#9f7aea',
            animation: `${spin} 8s linear infinite`,
        }}
        />
        {/* Icon circle */}
        <Box
        sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
        <Box
            sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'linear-gradient(to bottom right, rgba(79,70,229,0.1), rgba(159,122,234,0.1))',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            {/* <MessageSquare
            className="pulse"
            size={32}
            color="#4f46e5"
            style={{ animation: 'pulse 2s infinite' }}
            /> */}
            <img src="https://res.cloudinary.com/dtv1nvsx9/image/upload/v1743941152/dobby-logo-enhanced_t5mdxk.png" alt="dobby-logo" width='40px' />

        </Box>
        </Box>
        {/* Glowing effect */}
        <Box
        sx={{
            position: 'absolute',
            top: -16,
            bottom: -16,
            left: -16,
            right: -16,
            backgroundColor: 'rgba(79,70,229,0.2)',
            borderRadius: '50%',
            filter: 'blur(16px)',
            opacity: 0.5,
            animation: 'pulse 2s infinite',
        }}
        />
    </Box>

    {/* Heading */}
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
        Welcome to Dobby ~ Chat
    </Typography>

    {/* Subtext */}
    <Typography color="gray" textAlign="center" maxWidth={400}>
        Select a conversation to start chatting
    </Typography>

    {/* Floating bubbles */}
    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Box
        sx={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'rgba(79,70,229,0.4)',
            animation: `${float} 6s ease-in-out infinite`,
            animationDelay: '1s',
        }}
        />
        <Box
        sx={{
            position: 'absolute',
            top: '33%',
            right: '33%',
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: 'rgba(159,122,234,0.4)',
            animation: `${float} 5s ease-in-out infinite`,
            animationDelay: '2s',
        }}
        />
        <Box
        sx={{
            position: 'absolute',
            bottom: '25%',
            right: '25%',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'rgba(79,70,229,0.4)',
            animation: `${float} 4.5s ease-in-out infinite`,
            animationDelay: '3s',
        }}
        />
    </Box>
    </Box>
);
};

export default EmptyChat;
