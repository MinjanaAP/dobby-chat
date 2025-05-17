import React, { useEffect, useState } from 'react'
import { Eye, EyeOff, Users } from 'lucide-react'
import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Switch,
    FormControlLabel,
    Paper,
} from '@mui/material'
import SnackBarAlert from '../SnackBarAlert'

const PrivacyTab = () => {
    const [profileVisibility, setProfileVisibility] = useState('public')
    const [onlineStatus, setOnlineStatus] = useState(true)
    const [readReceipts, setReadReceipts] = useState(true)
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        if (!onlineStatus || !readReceipts) {
            setAlertOpen(true);
            setOnlineStatus(true);
            setReadReceipts(true);
        }
    },[onlineStatus, readReceipts]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, white, #c7d2fe, #a5b4fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Privacy Settings
            </Typography>

            {/* Profile Visibility */}
            <Paper
                variant="outlined"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: 'rgba(79, 70, 229, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Eye size={20} color="#4f46e5" />
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='start'>
                        <Typography variant="subtitle1" fontWeight={500} color='#ffffff'>
                            Profile Visibility
                        </Typography>
                        <Typography variant="body2" color="#F5F5F56A" textAlign='start'>
                            Control who can see your profile
                        </Typography>
                    </Box>
                </Box>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                    <InputLabel id="profile-visibility-label">Visibility</InputLabel>
                    <Select
                        labelId="profile-visibility-label"
                        value={profileVisibility}
                        onChange={(e) => setProfileVisibility(e.target.value)}
                        label="Visibility"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.05)',
                            borderRadius: 1,
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255,255,255,0.1)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4f46e5',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4f46e5',
                                boxShadow: '0 0 5px #4f46e5',
                            },
                        }}
                    >
                        <MenuItem value="public">Public</MenuItem>
                        <MenuItem value="friends" disabled>Friends Only</MenuItem>
                        <MenuItem value="private" disabled>Private</MenuItem>
                    </Select>
                </FormControl>
            </Paper>

            {/* Online Status */}
            <Paper
                variant="outlined"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: 'rgba(79, 70, 229, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Users size={20} color="#4f46e5" />
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='start' >
                        <Typography variant="subtitle1" fontWeight={500} color='#ffffff'>
                            Online Status
                        </Typography>
                        <Typography variant="body2" color="#F5F5F572" textAlign='start'>
                            Show when you're active
                        </Typography>
                    </Box>
                </Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={onlineStatus}
                            onChange={() => setOnlineStatus(!onlineStatus)}
                            color="primary"
                        />
                    }
                    label={onlineStatus ? 'On' : 'Off'}
                    labelPlacement="start"
                    sx={{ color: 'white' }}
                />
            </Paper>

            {/* Read Receipts */}
            <Paper
                variant="outlined"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: 'rgba(79, 70, 229, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <EyeOff size={20} color="#4f46e5" />
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='start'>
                        <Typography variant="subtitle1" fontWeight={500} color='#ffffff'>
                            Read Receipts
                        </Typography>
                        <Typography variant="body2" color="#F5F5F57C" textAlign='start'>
                            Show when you've read messages
                        </Typography>
                    </Box>
                </Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={readReceipts}
                            onChange={() => setReadReceipts(!readReceipts)}
                            color="primary"
                        />
                    }
                    label={readReceipts ? 'On' : 'Off'}
                    labelPlacement="start"
                    sx={{ color: 'white' }}
                />
            </Paper>
            <SnackBarAlert
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                severity="warning"
                message="These functions are not allowed yet to users."
            />
        </Box>
        
    )
}

export default PrivacyTab
