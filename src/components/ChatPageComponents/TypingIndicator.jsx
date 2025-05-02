import React from 'react';
import { Box, Typography } from '@mui/material';

const bounceAnimation = {
'@keyframes bounce': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-6px)' },
},
};

export const TypingIndicator = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'gray', fontSize: '14px' }}>
    <Box sx={{ display: 'flex', gap: 0.5 }}>
        {[0, 150, 300].map((delay, index) => (
        <Box
            key={index}
            sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: '#4f46e5',
            animation: 'bounce 1s infinite',
            animationDelay: `${delay}ms`,
            ...bounceAnimation,
            }}
        />
        ))}
    </Box>
    <Typography variant="body2">Alex is typing...</Typography>
    </Box>
    )
}