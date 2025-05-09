import { AttachFileOutlined, InsertEmoticonOutlined } from "@mui/icons-material"
import { Box, IconButton, Paper } from "@mui/material"
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { MicIcon, SendIcon, Send } from "lucide-react"
import { useCallback, useRef, useState } from "react";
import { sendMessages, updateTypingStatus } from "../../api/firebase.service";
import _ from "lodash"; 
import { sendPushNotification } from "../../api/pushNotificationApi";

export const ChatInput = ({conversation, authUser, receiverId}) => {
    const [message, setMessage] = useState('');
    const typingTimeoutRef = useRef(null);
    const isDesktop = window.innerWidth > 768;
    
    const handleKeyDown = (e) => {
        if(e.key === 'Enter' && !e.shiftKey && isDesktop){
            handleSend();
        }
    }

    const handleSend = async () => {
        if (message.trim()) {
            // console.log("Message : ", message + "\n Conversation id : " + JSON.stringify(conversation, null, 2) + "\n authUser id : " +authUser.uid);
            const result = await sendMessages(message,conversation.id,authUser.uid);
            // alert(JSON.stringify(authUser));
            const username = authUser.displayName ? authUser.displayName : authUser.email;
            const messageData = {
                userId : receiverId,
                title : "New Message",
                body: `${username} : ${message}`
            }
            console.log("Message Data", messageData);

            setMessage('');
            if(result.status){
                console.log('Message send.');
                //? Send push notification to receiver
                const response = await sendPushNotification(messageData);
                if (response) console.log("Push notification send", response);
            }else{
                console.error("Error in sending message : ", result);
            }
        }
    }

    const handleTyping = (e) => {
        const val = e.target.value;
        setMessage(val);
        throttledTyping(true);

        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            throttledTyping(false);
        }, 2000);
        
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const throttledTyping = useCallback(
        _.throttle((isTyping) => {
            updateTypingStatus(conversation.id, authUser.uid, isTyping);
        }, 500),
        [conversation.id, authUser.uid]
    );

    return (
        <Paper
            elevation={2}
            sx={{
            p: 2,
            borderTop: '1px solid #2a2a4a',
            bgcolor: 'rgba(10,10,31,0.8)',
            backdropFilter: 'blur(10px)',
            }}  
        >
            <Box sx={{ display: 'flex', alignItems:'center', gap:1.5 }} >
                {isDesktop && (
                    <IconButton sx={{ color:"gray" }}>
                        <InsertEmoticonOutlined/>
                    </IconButton>
                )}
                <IconButton sx={{ color:"gray" }} >
                    <AttachFileOutlined/>
                </IconButton>
                <Box sx={{ flex: 1 }}>
                <TextareaAutosize
                    minRows={1}
                    maxRows={6}
                    placeholder="Type a message..."
                    value={message}
                    onChange={handleTyping}
                    onKeyDown={handleKeyDown}
                    style={{
                    width: '100%',
                    resize: 'none',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    fontFamily: 'inherit',
                    outline: 'none',
                    }}
                />
                </Box>
                {/* <IconButton sx={{ color: 'gray' }} >
                    <MicIcon/>
                </IconButton> */}
                <IconButton
                    onClick={handleSend}
                    sx={{
                        bgcolor: '#4f46e5',
                        color: 'white',
                        '&:hover': {
                        bgcolor: '#5f56f5',
                        transform: 'translate(0.125rem, -0.125rem)',
                        transition: 'transform 0.2s',
                        },
                    }}
                    >
                    <Send className="w-5 h-5" />
                </IconButton>
            </Box>
        </Paper>
    )
}