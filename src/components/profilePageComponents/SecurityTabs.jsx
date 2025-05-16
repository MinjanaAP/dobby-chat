import React from 'react';
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

const SecurityTab = () => {
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
                        variant="outlined"
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
                    >
                        Update Password
                    </Button>
                </Stack>
            </Box>

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
                            <Typography fontWeight={500}>Two-Factor Authentication</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Add an extra layer of security
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        variant="outlined"
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
        </Box>
    );
};

export default SecurityTab;
