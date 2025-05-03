import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { keyframes } from '@emotion/react';

// Floating animation
const float = keyframes`
0%, 100% { transform: translateY(0); }
50% { transform: translateY(-6px); }
`;

const ConversationCardSkeleton = ({ count = 5 }) => {
return (
    <Box
    px={2}
    pt={2}
    position="relative"
    width="100%"
    >
    {Array.from({ length: count }).map((_, index) => (
        <Box
        key={index}
        display="flex"
        alignItems="center"
        gap={2}
        mb={2}
        sx={{
            animation: `${float} 3s ease-in-out infinite`,
            animationDelay: `${index * 0.2}s`,
        }}
        >
        {/* Avatar shimmer */}
        <Skeleton
            variant="circular"
            width={48}
            height={48}
            sx={{
            bgcolor: 'rgba(255,255,255,0.08)',
            }}
        />

        {/* Text shimmer */}
        <Box flex={1}>
            <Skeleton
            variant="text"
            width="60%"
            height={20}
            sx={{
                bgcolor: 'rgba(255,255,255,0.08)',
            }}
            />
            <Skeleton
            variant="text"
            width="80%"
            height={14}
            sx={{
                bgcolor: 'rgba(255,255,255,0.05)',
            }}
            />
        </Box>

        {/* Badge shimmer */}
        <Skeleton
            variant="circular"
            width={20}
            height={20}
            sx={{
            bgcolor: 'rgba(255,255,255,0.08)',
            }}
        />
        </Box>
    ))}
    </Box>
);
};

export default ConversationCardSkeleton;
