import { Done, DoneAllOutlined } from "@mui/icons-material";
import { Box, Typography, Paper } from '@mui/material';

export const Message = ({authUser, message}) => {
    // console.log("Messgaes", message);
    const {
        content,
        timestamp,
        senderId,
        status
    } = message;

    const isMine = senderId === authUser.uid;

    const formattedTimestamp = new Date(timestamp?.seconds*1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <Box display="flex" justifyContent={isMine ? 'flex-end' : 'flex-start'} >
            <Box maxWidth="70%" order={isMine ? 1:0} >
                <Paper
                    elevation={0}
                    sx={{
                        p: 1.5,
                        px: 2,
                        borderRadius: '20px',
                        background: isMine
                        ? 'linear-gradient(to right, #4f46e5, #6366f1)'
                        : 'rgba(255, 255, 255, 0.1)',
                        color: isMine ? 'white' : 'white',
                        backdropFilter: isMine ? undefined : 'blur(4px)',
                    }}
                >
                    <Typography variant="body2" sx={{ textAlign:'start' }}>{content}</Typography>
                </Paper>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={isMine ? 'flex-end' : 'flex-start'}
                    gap={0.5}
                    mt={0.5}
                    >
                    <Typography variant="caption" color="gray">
                        {formattedTimestamp}
                    </Typography>
                    {isMine && status === 'delivered' && (
                        <DoneAllOutlined fontSize="small" sx={{ color: '#FFFFFF95' }} />
                    )}
                    {isMine && status === 'sent' && (
                        <Done fontSize="small" sx={{ color: '#FFFFFF95' }} />
                    )}
                    {isMine && status === 'seen' && (
                        <DoneAllOutlined fontSize="small" sx={{ color: '#4f46e5' }} />
                    )}
                </Box>
            </Box>
        </Box>
    )
}