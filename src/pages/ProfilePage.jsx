import { Box, Container } from "@mui/material";
import ProfileHeader from "../components/profilePageComponents/ProfileHeader";
import ProfileTabs from "../components/profilePageComponents/ProfileTabs";
import WaveBackground from "../components/WaveBackground";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getUserDetails } from "../services/userServices";

const ProfilePage = ({user}) => {
    const [userDetails,setUserDetails] = useState({});
    useEffect(()=> {
        if (!user) return;

        const GetUserDetails = async () => {
            const userDetails = await getUserDetails(user.uid);
            // console.log("User details",JSON.stringify(userDetails, null, 2));
            setUserDetails(userDetails);
        }
        GetUserDetails();
    }, [user]);
    return (
        <Box
            sx={{ width: "100vw", minHeight:"100vh", overflow: "hidden", margin: 0, position: "relative", paddingBottom:10 }}
        >
            <WaveBackground/>
            <Navbar authUser={user} />
            
                {userDetails && ( <ProfileHeader authUser={user}  userDetails={userDetails}/> )}
                <Container
                    maxWidth="lg"
                    sx={{
                    px: 2,
                    mt: 16,
                    position: 'relative',
                    zIndex: 10,
                    }}
                >
                    <ProfileTabs userDetails={userDetails} authUser={user}/>
                </Container>
            
            
        </Box>
    )
}

export default ProfilePage;