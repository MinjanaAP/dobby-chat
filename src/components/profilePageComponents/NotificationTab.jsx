import React, { useState } from 'react';
import {
    Typography,
    Switch,
    Paper,
    Stack,
    Box,
} from '@mui/material';
import { Bell, MessageSquare, AtSign } from 'lucide-react';
import SnackBarAlert from '../SnackBarAlert';

const notifications = [
    {
        icon: <MessageSquare size={20} color="#4f46e5" />,
        title: 'Direct Messages',
        description: 'Get notified when you receive messages',
        checked: true,
    },
    {
        icon: <AtSign size={20} color="#4f46e5" />,
        title: 'Mentions',
        description: "Get notified when you're mentioned",
        checked: true,
    },
    {
        icon: <Bell size={20} color="#4f46e5" />,
        title: 'App Updates',
        description: 'Get notified about new features',
        checked: false,
    },
];

const NotificationsTab = () => {
    const [alertOpen, setAlertOpen]= useState(false);
    return (
        <Stack spacing={4}>
            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                    background: 'linear-gradient(to right, white, #c7d2fe, #a5b4fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Notification Settings
            </Typography>

            <Stack spacing={3}>
                {notifications.map((item, index) => (
                    <Paper
                        key={index}
                        elevation={2}
                        onClick={() => setAlertOpen(true)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 2,
                            backdropFilter: 'blur(6px)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                            color:"#ffffff"
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={2}>
                            <Box
                                sx={{
                                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                    padding: 1,
                                    borderRadius: 1.5,
                                }}
                            >
                                {item.icon}
                            </Box>
                            <Box display="flex" alignItems="start" flexDirection='column'>
                                <Typography fontWeight={500}>{item.title}</Typography>
                                <Typography variant="body2" color="#F5F5F573" textAlign='start'>
                                    {item.description}
                                </Typography>
                            </Box>
                        </Box>
                        <Switch defaultChecked={item.checked} color="primary" disabled />
                    </Paper>
                ))}
            </Stack>
            <SnackBarAlert
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                severity="warning"
                message="These functions are not allowed yet to users."
            />
        </Stack>
        
    );
};

export default NotificationsTab;
