import { useTheme } from '@mui/material/styles';
import { ArrowBackIosRounded } from '@mui/icons-material';
import { Box, IconButton, useMediaQuery } from '@mui/material'
import Typography from '@mui/material/Typography'
export const ChatSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box
            component="section"
            position="fixed"
            zIndex={10}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 4rem)",
                py: 4,
            }}
        >
            {/* //? back button for mobile */}
            {isMobile && (
                <IconButton
                    onClick={onclose}
                    sx={{
                        position: 'fixed',
                        top: 16,
                        left: 16,
                        zIndex: 50,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        },
                    }}
                >
                    <ArrowBackIosRounded/>
                </IconButton>
            )}

            {/* //? Main Layout */}
            <Box
                display="flex"
                width="100%"
                height="100%"
            >
                {/* //* side bar */}
                <Box
                    width={{ xs: '100%', md: 380, lg: 420 }}
                    height="100%"
                    borderRight="1px solid #2a2a4a"
                    sx={{
                        backgroundColor: 'rgba(10,10,31,0.95)',
                        backdropFilter: 'blur(12px)',
                    }}
                    >
                    {/* <ConversationList /> */}
                    <Typography variant="body1" color="initial">chat side bar</Typography>
                </Box>

                {/* //* chat window */}
                {!isMobile && (
                    <Box
                        flex={1}
                        sx={{
                            backgroundColor: 'rgba(10,10,31,0.8)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        <Typography variant="body1" color="initial">chat window</Typography>
                    </Box>
                )}
            </Box>

        </Box>
    )
}