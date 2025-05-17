import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackBarAlert = ({ open, onClose, severity = 'info', message }) => {
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

    const currentColor = colors[severity] || colors.info;

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                sx={{
                    background: currentColor.bg,
                    color: currentColor.border,
                    boxShadow: `0 0 20px ${currentColor.border}`,
                    borderRadius: '12px',
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBarAlert;
