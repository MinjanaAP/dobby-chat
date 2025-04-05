import React from "react";
import WaveBackground from "../components/WaveBackground";
import Navbar from "../components/NAvbar";
import { Box, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";


const LoginPage = ({user}) =>{
    return(
        <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0, position: "relative", }} >
            <WaveBackground/>
            <Navbar authUser={user}/>
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "calc(100vh - 4rem)",
                }}
            >
                <LoginForm/>
            </Box>
        </Box>
    )
}

export default LoginPage;