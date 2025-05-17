import React, { useEffect, useState } from 'react';
import { Lock, Key, Shield } from 'lucide-react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Button,
    Paper,
    Stack,
} from '@mui/material';
import { updateUserPassword } from '../../services/userServices';
import SnackBarAlert from '../SnackBarAlert';

const SecurityTab = ({ authUser }) => {

    const [open, setOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [apiError, setApiError] = useState('');
    const [severity, setSeverity] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);


    useEffect(() => {
        if (!authUser) return;

        if (authUser.providerData[0].providerId === 'password') {
            setOpen(true);
        }
    }, [authUser]);

    const validate = () => {
        const newErrors = { currentPassword:'', newPassword:'', confirmPassword: '' }

        if (!currentPassword.trim() ) {
            newErrors.currentPassword='Current Password is required.';
        }
        if (!newPassword.trim()) {
            newErrors.newPassword='New Password can\'t be empty.';
        }
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword='Confirm Password can\'t be empty.';
        }

        if (!validatePassword(newPassword)) {
            newErrors.newPassword = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
        }

        if (newPassword.trim() !== confirmPassword.trim()) {
            newErrors.confirmPassword='Confirm Password didn\'t match with new password.';
        }

        setErrors(newErrors);
        return !newErrors.confirmPassword && !newErrors.newPassword && !newErrors.currentPassword
    }

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        return regex.test(password);
    }

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            const response = await updateUserPassword(currentPassword, newPassword);
            console.log(response);
            if (response.success) {
                setApiError('Password Update successfully.');
                setSeverity('success');
                setAlertOpen(true);
            }
            else {
                setApiError(response.message);
                setSeverity('error');
                setAlertOpen(true);
            }

        } catch (error) {
            console.log(error);
            setApiError(error || error.message);
            setSeverity('error');
            setAlertOpen(true);
        }
    }


    return (
        <Box display="flex" flexDirection="column" gap={6}>
            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                    background: 'linear-gradient(to right, white, #c7d2fe, #a5b4fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Security Settings
            </Typography>

            {/* Change Password */}
            {open && (
                <Box display="flex" flexDirection="column" gap={4}>
                    <Typography variant="h6" color="#ffffff" fontWeight={500} >
                        Change Password
                    </Typography>

                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            type="password"
                            placeholder="Current Password"
                            variant="outlined"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            error={errors.currentPassword}
                            helperText={errors.currentPassword}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock size={20} color="#888" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                borderRadius: 2,
                                input: {
                                    color: '#ffffff',
                                    '&::placeholder': {
                                        color: '#ffffff',
                                        opacity: 1,
                                    },
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255,255,255,0.1)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4f46e5',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4f46e5',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'rgba(156,163,175,1)', // placeholder-gray-500 equivalent
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            type="password"
                            placeholder="New Password"
                            error={errors.newPassword}
                            helperText={errors.newPassword}
                            variant="outlined"
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Key size={20} color="#888" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                borderRadius: 2,
                                input: {
                                    color: '#ffffff',
                                    '&::placeholder': {
                                        color: '#ffffff',
                                        opacity: 1,
                                    },
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255,255,255,0.1)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4f46e5',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4f46e5',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'rgba(156,163,175,1)',
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            type="password"
                            placeholder="Confirm New Password"
                            variant="outlined"
                            error={errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Key size={20} color="#888" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                borderRadius: 2,
                                input: {
                                    color: '#ffffff',
                                    '&::placeholder': {
                                        color: '#ffffff',
                                        opacity: 1,
                                    },
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255,255,255,0.1)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4f46e5',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4f46e5',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'rgba(156,163,175,1)',
                                },
                            }}
                        />

                        <Button
                            sx={{
                                px: 6,
                                py: 1.5,
                                borderRadius: 2,
                                background: 'linear-gradient(to right, #4f46e5, #9f7aea)',
                                textTransform: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    background: 'linear-gradient(to right, #5f56f5, #af8afa)',
                                },
                            }}
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Update Password
                        </Button>
                    </Stack>
                </Box>
            )}

            {/* Two-Factor Authentication */}
            <Paper
                elevation={0}
                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(6px)',
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={2}>
                        <Box
                            sx={{
                                p: 1,
                                borderRadius: 2,
                                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Shield size={20} color="#4f46e5" />
                        </Box>
                        <Box>
                            <Typography fontWeight={500} color="#ffffff" textAlign='start'>Two-Factor Authentication</Typography>
                            <Typography variant="body2" color="#FFFFFF5F" textAlign='start'>
                                Add an extra layer of security
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        variant="outlined"
                        disabled
                        sx={{
                            borderColor: '#4f46e5',
                            color: '#4f46e5',
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            '&:hover': {
                                backgroundColor: '#4f46e5',
                                color: '#fff',
                                borderColor: '#4f46e5',
                            },
                        }}
                    >
                        Enable
                    </Button>
                </Box>
            </Paper>
            <SnackBarAlert
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                message={apiError}
                severity={severity}
            />
        </Box>
    );
};

export default SecurityTab;
