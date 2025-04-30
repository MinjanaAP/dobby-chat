import { Box } from "@mui/material"
import WaveBackground from "../components/WaveBackground"
import Navbar from "../components/NAvbar"
import { ChatSection } from "../components/ChatPageComponents/ChatSection"

export const ChatPage = ({user}) => {
    return (
        <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0, position: "relative", }}>
            <WaveBackground/>
            <Navbar authUser={user}/>

            <ChatSection/>
        </Box>
    )
}