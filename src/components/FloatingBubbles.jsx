import React from "react";
import { Box } from "@mui/material";

//! Bubble configurations
const bubbles = [
{ size: 64, top: "20%", left: "10%", delay: "1s", opacity: 0.2 },
{ size: 96, top: "40%", left: "80%", delay: "2s", opacity: 0.1 },
{ size: 48, top: "70%", left: "20%", delay: "3s", opacity: 0.15 },
{ size: 80, top: "15%", left: "60%", delay: "4s", opacity: 0.1 },
{ size: 128, top: "80%", left: "75%", delay: "5s", opacity: 0.05 },
{ size: 64, top: "60%", left: "40%", delay: "6s", opacity: 0.15 },
];

const FloatingBubbles = () => {
return (
    <Box
    sx={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
    }}
    >
    {bubbles.map((bubble, index) => (
        <Box
        key={index}
        sx={{
            position: "absolute",
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            top: bubble.top,
            left: bubble.left,
            background: "linear-gradient(to bottom right, #4f46e5 20%, #9f7aea 80%)",
            borderRadius: "50%",
            opacity: bubble.opacity,
            filter: "blur(20px)",
            animation: `floatAnimation 5s infinite ease-in-out`,
            animationDelay: bubble.delay,
        }}
        />
    ))}
    </Box>
);
};

export default FloatingBubbles;
