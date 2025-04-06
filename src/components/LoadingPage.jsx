import { Typography, Box, CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";
import WaveBackground from "../components/WaveBackground";
import React from "react";

const LoadingPage = () => {
return (
    <Box
    sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        position: "relative",
    }}
    >
    {/* Background */}
    <WaveBackground />

    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="#0f172a"
    >
        
        <Box position="relative">
        
        <CircularProgress sx={{ color: "#4f46e5" }} size={100} />
        
        
        <Box
            component="img"
            src="https://res.cloudinary.com/dtv1nvsx9/image/upload/v1743941152/dobby-logo-enhanced_t5mdxk.png"
            alt="logo"
            sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 50,  
            height: "auto",
            }}
        />
        </Box>

        <Typography mt={2} color="white">
        Dobby is Loading ...
        </Typography>
    </Box>
    </Box>
);
};

export default LoadingPage;
