import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';


const pages = ['Home', 'Features', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({authUser}) {
const [anchorElNav, setAnchorElNav] = React.useState(null);
const [anchorElUser, setAnchorElUser] = React.useState(null);

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

return (
    <AppBar position="static" sx={{ backgroundColor:"#0A0A1F", borderBottom:"1px solid", borderBottomColor:"#2A2A4A" }}>
    <Container maxWidth="xl">
        <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
            ))}
            </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            }}
        >
            Dobby
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:"flex-end", mr:3 }}>
            {pages.map((page) => (
            <Typography
                key={page}
                onClick={()=>{alert(page)}}
                sx={{ my: 3, color: '#F5F5F5C5', display: 'block', mx:2, px:1, textTransform:"none",
                    fontSize:'1.3em',
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
                    <Button variant="text" color="white" sx={{
                        background: 'linear-gradient(90deg, #4F46E5, #9F7AEA)', 
                        borderRadius:'32px',
                        textTransform: 'none',
                        px:2,
                        py:1,
                        fontSize:'1.2em',
                        fontWeight:'300',
                    }}>
                        SignIn / SignUp
                    </Button>
                </>
            ):(
                <>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Dobby" src="/static/images/avatar/2.jpg" />
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
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
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
