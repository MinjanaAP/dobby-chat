import { Search } from "@mui/icons-material";
import { Box, InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import UserCard from "./UserCard";
import { useEffect, useMemo, useState } from "react";
import { getAllUsers } from "../services/userServices";
import ConversationCardSkeleton from "./Skeleton/ConversationCardSkeleton";
import EmptyConversationList from "./ChatPageComponents/EmptyConversationList";

const UserSearchSection = ({currentUser})=>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    
    useEffect(()=>{
        const GetAllUsers = async ()=>{
            try {
                setLoading(true);
                const allUsers = await getAllUsers();
                setUsers(allUsers);
                setLoading(false);
                // console.log(JSON.stringify(allUsers, null, 2));
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setLoading(false);
            }
        }

        GetAllUsers();
    },[]);

    const filteredUsers = useMemo(() => {
        if (!searchText) return users;

        return users.filter((user) => 
            user.username?.toLowerCase().includes(searchText) ||
            user.email?.toLowerCase().includes(searchText)
        );
    },[users, searchText]);

    return(
        <Box
            component='section'
            sx={{
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
                justifyContent:"start",
                minHeight: "calc(100vh - 4rem)",
                py: 4,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: {
                        xs: "80%",
                        sm: "60%",
                        md: "50%",
                        lg: "40%",
                        xl: "40em",
                    },
                }}
                
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for users..."
                    onChange={(e) => {
                        e.preventDefault();
                        setSearchText(e.target.value.toLowerCase());
                    }}
                    sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                        borderRadius: "1rem",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4f46e5",
                        },
                        "& .MuiInputBase-input::placeholder": {
                        color: "#9ca3af", // Tailwind's gray-500
                        },
                    }}
                    InputProps={{
                        startAdornment:(
                            <InputAdornment position="start" >
                                <SearchIcon sx={{ color: "#9ca3af", width: 20, height: 20 }} />
                            </InputAdornment>
                        )
                    }}
                />
                <Box flex={1} overflow="auto" maxHeight="75vh">
                    {!loading ? (
                        filteredUsers.length === 0 ?
                        <EmptyConversationList title={"No user found."} description={"Invite them to join dobby~chat."}/> :
                        filteredUsers?.filter((user) => user.id !== currentUser?.uid).map((user) => (       
                                <UserCard key={user.id} user={user} authUser={currentUser}/>
                        ))
                    ):(
                        <ConversationCardSkeleton count={10} />
                    )}
                </Box>
            </Box>



        </Box>
    )
}

export default UserSearchSection;