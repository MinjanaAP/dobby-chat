import { Box } from "@mui/material"
import WaveBackground from "../components/WaveBackground";
import Navbar from "../components/Navbar";
import UserSearchSection from "../components/UserSearchSection";

const UserSearchPage = ({user})=>{
    return(
        <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0, position: "relative", }} >
            <WaveBackground/>
            <Navbar authUser={user}/>

            <UserSearchSection currentUser={user}/>
        </Box>
    )
}

export default UserSearchPage;