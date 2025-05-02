import { CloseOutlined, PushPinOutlined } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

export const PinnedMessages = ({handleClose}) => {
    
    return (
        <Box
            sx={{
                p: 2,
                borderBottom: '1px solid #2a2a4a',
                backgroundColor: 'rgba(26, 26, 63, 0.3)',
            }}
        >
            <Box display="flex" alignItems="center"justifyContent="space-between" >
                <Box display="flex" alignItems="center"gap={1} >
                    <PushPinOutlined fontSize="small" sx={{ color: '#4f46e5' }} />
                    <Typography variant="body2" color="gray" >
                        2 pinned messages
                    </Typography>
                </Box>
                <IconButton
                    size="small"
                    sx={{
                        color: 'gray',
                        '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                    onClick={handleClose}      
                >
                    <CloseOutlined fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    )
}