import React from 'react';
import { Camera, Edit2 } from 'lucide-react';
import { Box, IconButton, Avatar } from '@mui/material';


const ProfileHeader = ({authUser, userDetails}) => {
    
    return (
        <Box position="relative">
            {/* Cover Image */}
            <Box
                height={200}
                width="100%"
                position="relative"
                overflow="hidden"
                sx={{
                    backgroundImage: 'linear-gradient(to bottom right, rgba(79,70,229,0.2), rgba(159,122,234,0.2))',
                    backdropFilter: 'blur(8px)',
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.3)',
                        },
                        backdropFilter: 'blur(4px)',
                    }}
                >
                    <Camera size={20} color="white" />
                </IconButton>
            </Box>
            {/* Profile Image */}
            <Box
                position="absolute"
                bottom={0}
                left="50%"
                sx={{
                    transform: 'translate(-50%, 50%)',
                }}
            >
                <Box position="relative" display="inline-block">
                    <Avatar
                        src={userDetails.profileImageUrl}
                        alt="Profile"
                        sx={{
                            width: 128,
                            height: 128,
                            border: '4px solid #0a0a1f',
                            objectFit: 'cover',
                        }}
                    />
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            p: 1,
                            borderRadius: '50%',
                            backgroundColor: '#4f46e5',
                            '&:hover': {
                                backgroundColor: '#4f46e5cc',
                            },
                        }}
                    >
                        <Edit2 size={16} color="white" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileHeader;