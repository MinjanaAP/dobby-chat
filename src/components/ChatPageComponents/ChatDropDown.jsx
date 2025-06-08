
import { Box, Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import { Trash2, MessageSquareX } from "lucide-react";

export const ChatDropDown = ({ anchorEl, open, onClose, onDeleteChat, onClearChat }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'hidden',
                    backgroundColor: '#1a1a2e',
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.32)',
                    mt: 1.5,
                    p: 0, 
                    border: 'none',
                    '& .MuiMenu-list': {
                        padding: 0, 
                    },
                    '& .MuiMenuItem-root': {
                        borderBottom: '1px solid #2a2a4a', 
                        '&:last-child': {
                            borderBottom: 'none',
                        },
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: '#1a1a2e',                                        
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}

        >
            <MenuItem
                onClick={onClearChat}
                sx={{
                    color: 'white',
                    backgroundColor: '#1a1a2e',
                    '&:hover': {
                        backgroundColor: '#2a2a4a',
                    }
                }}
            >
                <ListItemIcon>
                    <MessageSquareX size={20} color="#9ca3af" />
                </ListItemIcon>
                <Typography variant="body2">Clear Chat</Typography>
            </MenuItem>
            <MenuItem
                onClick={onDeleteChat}
                sx={{
                    color: 'white',
                    backgroundColor: '#1a1a2e',
                    '&:hover': {
                        backgroundColor: '#2a2a4a',
                    }
                }}
            >
                <ListItemIcon>
                    <Trash2 size={20} color="#9ca3af" />
                </ListItemIcon>
                <Typography variant="body2">Delete Chat</Typography>
            </MenuItem>
        </Menu>
    );
};