import { Search } from "@mui/icons-material";
import { Box, InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import UserCard from "./UserCard";

const UserSearchSection = ()=>{
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
                        xs: "70%",
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
                <UserCard/>
                <UserCard/>
                <UserCard/>
            </Box>



        </Box>
    )
}

export default UserSearchSection;