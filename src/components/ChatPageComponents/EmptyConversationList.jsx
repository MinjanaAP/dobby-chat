import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { MessageSquareDashed } from 'lucide-react';

// Floating animation
const float = keyframes`
0%, 100% { transform: translateY(0); }
50% { transform: translateY(-6px); }
`;

const EmptyConversationList = () => {
return (
    <Box
    height="100%"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    px={3}
    py={6}
    textAlign="center"
    color="gray"
    position="relative"
    >
    {/* Icon in bubble */}
    <Box
        sx={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'linear-gradient(to bottom right, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
        animation: `${float} 3s ease-in-out infinite`,
        }}
    >
        <MessageSquareDashed size={32} color="#7c3aed" />
    </Box>

    {/* Title */}
    <Typography variant="h6" fontWeight="bold" sx={{
        background: 'linear-gradient(to right, #c7d2fe, #a5b4fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 1,
    }}>
        No Conversations Yet
    </Typography>

    {/* Subtext */}
    <Typography variant="body2" color="#F7F4F071" maxWidth={300}>
        Start a new conversation or wait for someone to message you.
    </Typography>
    </Box>
);
};

export default EmptyConversationList;
