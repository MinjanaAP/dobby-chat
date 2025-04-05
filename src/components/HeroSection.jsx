import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

const HeroSection = ({ authUser }) => {
    const navigate = useNavigate();
    const onGetStarted=()=>{
        if(authUser){
            navigate('/search-users')
        }else{
            navigate('/login')
        }
    }

return (
    <Box
    component="section"
    sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 4rem)",
        py: 4,
    }}
    >
    {/* Hero Box */}
    <Box
        sx={{
        width: "100%",
        maxWidth: "900px",
        backdropFilter: "blur(10px)",
        background: "linear-gradient(to bottom right, rgba(26, 26, 63, 0.4), rgba(42, 42, 74, 0.3))",
        p: { xs: 4, md: 6 },
        borderRadius: "16px",
        border: "1px solid rgba(58, 58, 106, 0.3)",
        boxShadow: "0 0 40px rgba(79, 70, 229, 0.15)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        }}
    >
        {/* Gradient Overlay */}
        <Box
        sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom right, rgba(79, 70, 229, 0.05), rgba(159, 122, 234, 0.05))",
            opacity: 0.5,
        }}
        />

        {/* Hero Content */}
        <Box sx={{ position: "relative", zIndex: 10 }}>
        <Typography
            variant="h3"
            sx={{
            fontWeight: "bold",
            background: "linear-gradient(to right, white, #c7d2fe, #a5b4fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
            fontFamily:'unset'
            }}
        >
            Dobby ~ Chat : The Future of Real-Time Conversations
        </Typography>

        <Typography
            variant="h6"
            sx={{
            color: "#d1d5db",
            mb: 4,
            maxWidth: "600px",
            mx: "auto",
            fontFamily:"unset",
            fontWeight:'300'
            }}
        >
            Secure, fast, and AI-powered messaging in a beautifully designed chat platform.
        </Typography>

        {/* Get Started Button */}
        <Button
            onClick={onGetStarted}
            sx={{
            px: 4,
            py: 1.5,
            borderRadius: "50px",
            fontSize: "1rem",
            fontWeight: "500",
            background: "linear-gradient(to right, #4f46e5, #9f7aea)",
            color: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 20px rgba(79, 70, 229, 0.5)",
            },
            }}
        >
            Get Started
            <ArrowForwardIcon style={{ marginLeft: 8 }} />
        </Button>
        </Box>
    </Box>
    </Box>
);
};

export default HeroSection;
