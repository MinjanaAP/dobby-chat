import { Typography, Box, CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";
import WaveBackground from "../components/WaveBackground";
import React from "react";


const LoadingPage = () =>{
    return(
        <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0, position: "relative", }}>
            {/* Background */}
            <WaveBackground />
            {/* <FloatingBubbles/> */}

            {/* Foreground Content */}
            <Navbar authUser={false} />
            
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                height="100vh"
                bgcolor="#0f172a"
                >
                <CircularProgress sx={{ color: '#4f46e5' }} />
                <Typography mt={2} color="white">Loading...</Typography>
            </Box>
        </Box>
    )
}

export default LoadingPage;