import { Avatar, Typography, Box } from "@mui/material";
import { CheckCheck } from "lucide-react";

export const ConversationCard = ({ conversation, onClick }) => {
    const {
        name,
        profileImage,
        lastMessage,
        timestamp,
        unread,
        online,
        typing,
        pinned
    } = conversation;

    return (
        <Box
            onClick={() => onClick(conversation)}
            position="relative"
            width="100%"
            px={2}
            py={2}
            borderBottom="1px solid #2a2a4a"
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
            }}
            
        >
            {/* Pinned conversations */}
            {pinned && (
                <Box
                    position="absolute"
                    top={8}
                    right={8}
                    width={6}
                    height={6}
                    borderRadius="50%"
                    bgcolor="#4f46e5"
                />
            )}

            {/* Layout */}
            <Box display="flex" alignContent="center" gap={2} >
                <Box position="relative">
                    <Avatar src={profileImage} alt={name} sx={{ width: 48, height: 48 }} />
                    {online && (
                        <Box
                            position="absolute"
                            bottom={0}
                            right={0}
                            width={12}
                            height={12}
                            bgcolor="green"
                            border="2px solid #0a0a1f"
                            borderRadius="50%"
                        />
                    )}
                </Box>

                {/* Main content */}
                <Box flex={1} minWidth={0} >
                    <Box display="flex" justifyContent="space-between" alignContent="center" mb={0.5} >
                        <Typography fontWeight={500} noWrap color="white">
                            {name}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: 'gray', marginLeft: 1, whiteSpace: 'nowrap' }}
                        >
                            {timestamp}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={0.5}>
                        {!typing && (
                            <CheckCheck size={16} color="#4f46e5" style={{ flexShrink: 0 }} />
                        )}
                        <Typography
                            variant="body2"
                            sx={{
                                color: typing ? '#4f46e5' : 'gray',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {typing ? 'typing...' : lastMessage}
                        </Typography>
                    </Box>
                </Box>

                {/* Unread badge */}
                {unread > 0 && (
                <Box
                    minWidth={20}
                    height={20}
                    bgcolor="#4f46e5"
                    color="white"
                    borderRadius="9999px"
                    fontSize={12}
                    px={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {unread}
                </Box>
                )}
            </Box>
        </Box>
    )
}