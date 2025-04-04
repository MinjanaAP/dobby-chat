import React from "react";
import { Box } from "@mui/material";

const WaveBackground = () => {
return (
    <Box
    sx={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background: "linear-gradient(to bottom, #0a0a1f, #1a1a3f, #0a0a1f)",
    }}
    >
    {/* Animated Background Layer */}
        <Box
            sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.2,
            backgroundImage:
                "url('https://raw.githubusercontent.com/adrianhajdin/project_3D_developer_portfolio/main/src/assets/herobg.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            }}
        />

        {/* Glowing Orbs */}
        <Box
            sx={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            backgroundColor: "#4f46e5",
            borderRadius: "50%",
            opacity: 0.1,
            filter: "blur(100px)",
            }}
        />
        <Box
            sx={{
            position: "absolute",
            top: "30%",
            right: "-80px",
            width: "300px",
            height: "300px",
            backgroundColor: "#9f7aea",
            borderRadius: "50%",
            opacity: 0.1,
            filter: "blur(100px)",
            }}
        />
        <Box
            sx={{
            position: "absolute",
            bottom: "-160px",
            left: "30%",
            width: "300px",
            height: "300px",
            backgroundColor: "#4f46e5",
            borderRadius: "50%",
            opacity: 0.1,
            filter: "blur(100px)",
            }}
        />
    </Box>
);
};

export default WaveBackground;
