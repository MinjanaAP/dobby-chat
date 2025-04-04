import { Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import WaveBackground from "../components/WaveBackground";
import React from "react";
import FloatingBubbles from "../components/FloatingBubbles";
import HeroSection from "../components/HeroSection";

export const HomePage =()=>{
    return(
        <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0, position: "relative", }}>
            {/* Background */}
            <WaveBackground />
            {/* <FloatingBubbles/> */}

            {/* Foreground Content */}
            <Navbar authUser={false} />
            {/* <Box sx={{ padding: 2, position: "relative", zIndex: 10 }}>
                <Typography variant="h4">HomePage</Typography>
            </Box> */}
            <HeroSection/>
        </Box>
    )
}

