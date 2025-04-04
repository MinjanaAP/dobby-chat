import { Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import React from "react"
import { Height, Padding } from "@mui/icons-material";

export const HomePage =()=>{
    return(
        <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden", margin:0}} >
            <Navbar authUser={false} />
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" >
                    HomePage
                </Typography>
            </Box>
        </Box>
    )
}

