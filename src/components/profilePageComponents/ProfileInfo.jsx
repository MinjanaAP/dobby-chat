import React from 'react';
import { Mail, User, MapPin, Calendar } from 'lucide-react';
import {
    Box,
    Grid,
    Typography,
    TextField,
    InputAdornment,
    Button,
} from '@mui/material';

const ProfileInfo = ({ userDetails, authUser }) => {
    //  console.log("User details in profile infoooooooooooooooo",JSON.stringify(authUser, null, 2));
    return (
        <Box display="flex" flexDirection="column" gap={4}>
            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                    background: 'linear-gradient(to right, white, #c7d2fe, #a5b4fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Profile Information
            </Typography>

            <Grid container spacing={3}>
                {/* Username */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="#ffffff" gutterBottom>
                        Username
                    </Typography>
                    <TextField
                        fullWidth
                        defaultValue={userDetails.username}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <User size={20} color="#888" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
                        }}
                    />
                </Grid>

                {/* Email */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="#ffffff" gutterBottom>
                        Email
                    </Typography>
                    <TextField
                        fullWidth
                        defaultValue={userDetails.email}
                        disabled
                        variant="outlined"
                        type="email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Mail size={20} color="#888" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
                            '& .Mui-disabled': {
                                WebkitTextFillColor: '#ffffff',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4f46e5',
                            },
                        }}
                    />
                </Grid>

                {/* Location */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="#ffffff" gutterBottom>
                        Location
                    </Typography>
                    <TextField
                        fullWidth
                        defaultValue="San Francisco, CA"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MapPin size={20} color="#888" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
                        }}
                    />
                </Grid>

                {/* Joined Date */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="#ffffff" gutterBottom>
                        Joined
                    </Typography>
                    <TextField
                        fullWidth
                        value={
                            authUser?.metadata?.creationTime
                            ? new Date(authUser.metadata.creationTime).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })
                            : ''
                        }
                        disabled
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Calendar size={20} color="#888" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                            cursor: 'not-allowed',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255,255,255,0.1)',
                            },
                            '& .Mui-disabled': {
                                WebkitTextFillColor: '#ffffff',
                            },
                            '& input::placeholder': {
                                color: '#ffffff',
                                opacity: 1,
                            },
                        }}
                    />
                </Grid>
            </Grid>

            {/* Save Button */}
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        background: 'linear-gradient(to right, #4f46e5, #9f7aea)',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                            background: 'linear-gradient(to right, #5f56f5, #af8afa)',
                        },
                    }}
                >
                    Save Changes
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileInfo;
