import { Box } from "@mui/material"
import WaveBackground from "../components/WaveBackground"
import Navbar from "../components/Navbar"
import { ChatSection } from "../components/ChatPageComponents/ChatSection"
import { useEffect } from "react"
import { UpdateDeliveredMessages } from "../api/firebase.service"

export const ChatPage = ({user}) => {
    useEffect(()=> {
        if (!user) return;
        
        const UpdateMessageStatus = async () => {
            await UpdateDeliveredMessages(user.uid);
        }

        UpdateMessageStatus();
    },[user])
    return (
        <Box 
        sx={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0, position: "relative", }}>
            <WaveBackground/>
            <Navbar authUser={user}/>

            <ChatSection authUser={user} />
        </Box>
    )
}