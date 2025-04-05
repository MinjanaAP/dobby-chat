import SignUpForm from "../components/SignUpForm";
import WaveBackground from "../components/WaveBackground";
import Navbar from "../components/NAvbar";
import { Box, Typography } from "@mui/material";

const SignUpPage = ({user})=>{
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
                <SignUpForm/>
            </Box>
        </Box>
    )
}

export default SignUpPage;