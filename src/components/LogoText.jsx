import React from 'react';
import { Link, Typography, Box } from '@mui/material';

const LogoText = () => {
return (
    <Link href="#" sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
    <Typography
        variant="h5"
        sx={{
        fontWeight: 'bold',
        backgroundImage: 'linear-gradient(to right, #4f46e5, #9f7aea)',
        backgroundClip: 'text',
        color: 'transparent',
        position: 'relative',
        }}
    >
        Dobby-Chat
        <Box
        sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(to right, rgba(79, 70, 229, 0.4), rgba(159, 122, 234, 0.4))',
            filter: 'blur(4px)',
            opacity: 0.7,
            '&:hover': {
            opacity: 1,
            },
            transition: 'opacity 0.3s',
        }}
        />
    </Typography>
    </Link>
);
};

export default LogoText;
