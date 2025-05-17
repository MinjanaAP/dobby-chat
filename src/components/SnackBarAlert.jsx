import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackBarAlert = ({ open, onClose, severity = 'info', message }) => {
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
                    background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                    color: 'white',
                    boxShadow: '0 0 20px rgba(79,70,229,0.3)',
                    borderRadius: '12px',
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBarAlert;