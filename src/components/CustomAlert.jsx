import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

const CustomAlert = ({ severity = 'info', title, message }) => {
    const colors = {
        success: {
            bg: 'rgba(34,197,94,0.1)', 
            border: '#22c55e',
        },
        error: {
            bg: 'rgba(239,68,68,0.1)', 
            border: '#ef4444',
        },
        warning: {
            bg: 'rgba(234,179,8,0.1)', 
            border: '#eab308',
        },
        info: {
            bg: 'rgba(79,70,229,0.1)', 
            border: '#4f46e5',
        },
    };

    return (
        <Box
            sx={{
                bgcolor: colors[severity].bg,
                borderLeft: `4px solid ${colors[severity].border}`,
                p: 2,
                borderRadius: 2,
                backdropFilter: 'blur(6px)',
                color: 'white',
                boxShadow: '0 0 20px rgba(79,70,229,0.15)',
            }}
        >
            <AlertTitle sx={{ fontWeight: 'bold', color: colors[severity].border }}>
                {title}
            </AlertTitle>
            {message}
        </Box >
    );
};

export default CustomAlert;