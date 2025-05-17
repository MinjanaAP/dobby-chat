import React, { useState } from 'react';
import { Mail, User, MapPin, Calendar, Lock } from 'lucide-react';
import {
    Box,
    Grid,
    Typography,
    TextField,
    InputAdornment,
    Button,
    CircularProgress,
} from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import SnackBarAlert from '../SnackBarAlert';
import CustomAlert from '../CustomAlert';


const ProfileInfo = ({ userDetails, authUser }) => {
    // console.log("User details in profile infoooooooooooooooo",JSON.stringify(userDetails, null, 2));
    const [username, setUsername] = useState(userDetails.username || '');
    const [location, setLocation] = useState(userDetails.location || '');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!authUser.uid) return;

        if (!username.trim()) {
            setError('Username can\'t be empty.');
            return;
        } else if ( username.trim().length < 3) {
            setError('Username must be at least 3 character long.');
            return;
        }
        setError('');

        try {
            setLoading(true);
            const userRef = doc(db, 'users', authUser.uid);
            await updateDoc(userRef, {
                username: username.trim(),
                location: location.trim()
            });
            setLoading(false);
            setAlertMessage('Profile updated successfully');
            setSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            console.error('Error updating profile:', error);
            setAlertMessage('Failed to update profile. Please try again.');
            setSeverity('error');
            setAlertOpen(true);
            setLoading(false);
        }
        // console.log("user details", username, location);
    }


    return (
        <Box display="flex" flexDirection="column" gap={4} >
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

            <Grid container spacing={3} sx={{ width: '100%' }}>
                {/* Username */}
                <Grid item xs={12} md={6} sx={{ minWidth:{ xs: '100%', md:'0%' } }}>
                    <Typography variant="body2" color="#ffffff" gutterBottom ml={2} sx={{ width: '100%', textAlign:'start' }}>
                        Username
                    </Typography>
                    <TextField
                        fullWidth
                        defaultValue={userDetails.username}
                        variant="outlined"
                        onChange={(e) => setUsername(e.target.value)}
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
                <Grid item xs={12} md={6} sx={{ minWidth:{ xs: '100%', md:'0%' } }} >
                    <Typography variant="body2" color="#ffffff" gutterBottom ml={2} sx={{ width: '100%', textAlign:'start' }}>
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
                            endAdornment: (
                                <InputAdornment position='end' >
                                    <Lock size={20} color="#888"/>
                                </InputAdornment>
                            )
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
                                WebkitTextFillColor: '#FFFFFF6D',
                            },
                            '& input::placeholder': {
                                color: '#ffffff',
                                opacity: 1,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4f46e5',
                            },
                        }}
                    />
                </Grid>

                {/* Location */}
                <Grid item xs={12} md={6} sx={{ minWidth:{ xs: '100%', md:'0%' } }} >
                    <Typography variant="body2" color="#ffffff" gutterBottom ml={2} sx={{ width: '100%', textAlign:'start' }}>
                        Location
                    </Typography>
                    <TextField
                        fullWidth
                        defaultValue= { userDetails.location ? userDetails.location : '' }
                        variant="outlined"
                        onChange={(e) => setLocation(e.target.value)}
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
                <Grid item xs={12} md={6} sx={{ minWidth:{ xs: '100%', md:'0%' } }} >
                    <Typography variant="body2" color="#ffffff" gutterBottom ml={2} sx={{ width: '100%', textAlign:'start' }} >
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
                            endAdornment: (
                                <InputAdornment position='end' >
                                    <Lock size={20} color="#888"/>
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                            cursor: 'not-allowed',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255,255,255,0.1)',
                            },
                            '& .Mui-disabled': {
                                WebkitTextFillColor: '#FFFFFF5A',
                            },
                            '& input::placeholder': {
                                color: '#ffffff',
                                opacity: 1,
                            },
                        }}
                    />
                </Grid>
            </Grid>
            {error && (
                <CustomAlert
                    severity='error'
                    title='Error'
                    message={error}
                />
            )}

            {/* Save Button */}
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    onClick={handleSubmit}
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
                    { loading ? 
                    <>
                        <Typography variant="body1" color="initial">Save Changes <CircularProgress color="inherit" size={18} /> </Typography>
                    </> : 'Save Changes'}
                </Button>
            </Box>
            <SnackBarAlert
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                severity={severity}
                message={alertMessage}
            />
        </Box>
    );
};

export default ProfileInfo;
