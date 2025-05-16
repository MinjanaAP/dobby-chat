import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, logoutUser } from '../services/userServices';
import { auth } from '../firebase';
import { saveFCMTokenToUser } from '../api/firebase.service';


const pages = ['Home','Chats', 'New Chat', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({authUser}) {
const [anchorElNav, setAnchorElNav] = React.useState(null);
const [anchorElUser, setAnchorElUser] = React.useState(null);
const [name, setName] = useState('');
const [profileImageUrl, setProfileImageUrl] = useState('');

const fcmToken = localStorage.getItem('fcmToken');

useEffect(()=>{
    if(!authUser) return;
    // console.log(JSON.stringify(authUser, null, 2))
    const GetUserDetails = async ()=>{
        const user = await getUserDetails(authUser?.uid);
        // console.log('user details',JSON.stringify(user, null, 2));
        setName( user ? user.name : authUser.displayName);
        setProfileImageUrl(user ? user.profileImageUrl : authUser.photoURL);
    }

    const saveFCMToken = async () => {
        await saveFCMTokenToUser(authUser.uid, fcmToken);
    }

    GetUserDetails();
    saveFCMToken();
},[authUser, fcmToken]);


let navigate = useNavigate();

const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
};
const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
};

const handleCloseNavMenu = () => {
    setAnchorElNav(null);
};

const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    
};

const handleClick = (setting) => {
    console.log("settings", setting);
}

const handleLogout = async () => {
    
    await logoutUser(auth.currentUser);
    console.log("Logout successful.");
}


return (
    <AppBar position="static" sx={{ backgroundColor:"#0A0A1F", borderBottom:"1px solid", borderBottomColor:"#2A2A4A" }}>
    <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={()=> { navigate('/') }}>
            <img src="https://res.cloudinary.com/dtv1nvsx9/image/upload/v1743941152/dobby-logo-enhanced_t5mdxk.png" alt="dobby-logo" width='40px' />
        </Box>
        
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
            mx: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            }}
            onClick={()=> {
                navigate('/')
            }}
        >
            Dobby
            
        </Typography>
        {/* //! Mobile view */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', } }}>
            <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            >
            <MenuIcon />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
            >
            {pages.map((page) => (
                <MenuItem key={page} 
                onClick={()=>{
                    handleCloseNavMenu
                    if(page === 'Home'){
                        navigate('/')
                    }else if (page === "Chats"){
                        navigate('/conversations')
                    }
                }}
                sx={{
                    backgroundColor:"#0A0A1F", borderBottom:"1px solid", borderBottomColor:"#2A2A4A",color:'#FFFFFFAF',
                    '&:hover':{
                        color:'#FFFFFFFF',
                        backgroundImage:
                            "url('https://raw.githubusercontent.com/adrianhajdin/project_3D_developer_portfolio/main/src/assets/herobg.png')",
                        backgroundRepeat: "repeat",
                        
                    },
                    '&:hover::after': {
                        backgroundColor:"#0A0A1F", 
                },
                }}
                >
                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
            ))}
            </Menu>
        </Box>
        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} onClick={()=> { navigate('/') }} >
            <img src="https://res.cloudinary.com/dtv1nvsx9/image/upload/v1743941152/dobby-logo-enhanced_t5mdxk.png" alt="dobby-logo" width='40px' />
        </Box>
        <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            fontSize: '1.3em'
            }}
            onClick={()=>{
                navigate('/')
            }}
        >
            Dobby
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:"flex-end", mr:3 }}>
            {pages.map((page) => (
            <Typography
                key={page}
                onClick={()=>{
                    if(page === 'Home'){
                        navigate('/')
                    }else if (page === "Chats"){
                        navigate('/conversations')
                    }
                }}
                sx={{ my: 3, color: '#F5F5F5C5', display: 'block', mx:2, px:1, textTransform:"none",
                    fontSize:'1.1em',
                    position: 'relative',
                    fontWeight: '400',
                    fontFamily: 'unset',
                    cursor:'pointer',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 0, 
                        height: '2px', 
                        background: 'linear-gradient(90deg, #4F46E5, #9F7AEA)', 
                        transition: 'width 0.4s ease-in-out',
                    },
                    '&:hover::after': {
                        width: '100%', 
                    },
                    '&:hover':{
                        color: '#FFFFFF'
                    }
                }}
            >
                {page}
            </Typography>
            ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
            {!authUser ? (
                <>
                    <Button variant="text" color="white" 
                    onClick={()=>{
                        navigate('/login');
                    }}
                    sx={{
                        background: 'linear-gradient(90deg, #4F46E5, #9F7AEA)', 
                        borderRadius:'32px',
                        textTransform: 'none',
                        px:2,
                        py:1,
                        fontSize:'1.1em',
                        fontWeight:'300',
                        display: { xs: 'none', md: 'flex' }, mr: 1 ,
                    }}>
                        LogIn / SignUp
                    </Button>
                    <Button variant="text" color="white"
                    onClick={()=>{
                        navigate('/login');
                    }}
                    sx={{
                        background: 'linear-gradient(90deg, #4F46E5, #9F7AEA)', 
                        borderRadius:'32px',
                        textTransform: 'none',
                        px:2,
                        fontSize:'1em',
                        fontWeight:'300',
                        display: { xs: 'flex', md: 'none' }
                    }}>
                        Login
                    </Button>
                </>
            ):(
                <>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={name} src={profileImageUrl} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem 
                        key={setting} 
                        onClick={() => {
                            handleCloseUserMenu();
                            if (setting === "Logout") {
                                handleLogout();
                            } else if (setting === "Profile") {
                                navigate('/profile');
                            }
                            else {
                                handleClick(setting);
                            }
                        }}
                        sx={{
                            backgroundColor:"#0A0A1F", borderBottom:"1px solid", borderBottomColor:"#2A2A4A",color:'#FFFFFFAF',
                            '&:hover':{
                                color:'#FFFFFFFF',
                                backgroundImage:
                                    "url('https://raw.githubusercontent.com/adrianhajdin/project_3D_developer_portfolio/main/src/assets/herobg.png')",
                                backgroundRepeat: "repeat",
                                
                            },
                            '&:hover::after': {
                                backgroundColor:"#0A0A1F", 
                    },
                        }}
                        >
                        <Typography sx={{ textAlign: 'center' }} onClick={handleClick} >{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </>
            )}
            
        </Box>
        </Toolbar>
    </Container>
    </AppBar>
);
}
export default Navbar;
