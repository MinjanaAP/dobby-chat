import React, { useState } from 'react';
import { User, Bell, Shield, Key } from 'lucide-react';
import { Box, Tabs, Tab, Paper, IconButton } from '@mui/material';
import NotificationsTab from './NotificationTab';
import ProfileInfo from './ProfileInfo';
import SecurityTab from './SecurityTabs';
import PrivacyTab from './PrivacyTabs';
// import ProfileInfo from './ProfileInfo';
// import NotificationsTab from './NotificationsTab';
// import SecurityTab from './SecurityTab';
// import PrivacyTab from './PrivacyTab';

const TABS = [
    {
        id: 'profile',
        label: 'Profile',
        icon: <User size={16} />,
    },
    {
        id: 'notifications',
        label: 'Notifications',
        icon: <Bell size={16} />,
    },
    {
        id: 'security',
        label: 'Security',
        icon: <Shield size={16} />,
    },
    {
        id: 'privacy',
        label: 'Privacy',
        icon: <Key size={16} />,
    },
];

const ProfileTabs = ({ userDetails, authUser }) => {
    const [activeTab, setActiveTab] = useState('profile');

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 4,
                overflow: 'hidden',
                background: 'linear-gradient(to bottom right, rgba(26,26,63,0.4), rgba(42,42,74,0.3))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(58,58,106,0.3)',
                boxShadow: '0 0 40px rgba(79,70,229,0.15)',
            }}
        >
            {/* Tabs */}
            <Box borderBottom="1px solid rgba(58,58,106,0.3)">
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="profile tabs"
                    sx={{
                        px: 2,
                        py: 1,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            minHeight: 40,
                            minWidth: 100,
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            color: 'rgba(255,255,255,0.6)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#4f46e5',
                                color: '#fff',
                            },
                        },
                    }}
                >
                    {TABS.map((tab) => (
                        <Tab key={tab.id} value={tab.id} icon={tab.icon} label={tab.label} iconPosition="start" />
                    ))}
                </Tabs>
            </Box>
            {/* Tab Content */}
            <Box p={3}>
                {activeTab === 'profile' && <ProfileInfo userDetails={userDetails} authUser={authUser}/>}
                {activeTab === 'notifications' && <NotificationsTab/>}
                {activeTab === 'security' && <SecurityTab authUser={authUser} />}
                {activeTab === 'privacy' && <PrivacyTab/>}
            </Box>
        </Paper>
    );
};

export default ProfileTabs;