import { Box, Paper, Typography, Button, Divider, TextField, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { CheckBox } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ArrowRight from '@mui/icons-material/ArrowForward';

const LoginForm = ()=>{
    const [checked, setChecked] = useState(false);

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    }
    return(
        <Paper
        elevation={3}
        sx={{
            width:'100%',
            maxWidth: 400,
            p:4,
            borderRadius: 4,
            background: 'linear-gradient(to bottom right, rgba(26,26,63,0.4), rgba(42,42,74,0.3))',
            border:'1px solid rgba(58, 58, 106, 0.3)',
            boxShadow: '0 0 40px rgba(79,70,229,0.15)'
        }}
        >
            <Box textAlign='center' mb={4} >
                <Typography variant="h4" fontWeight="bold" 
                    sx={{
                        background: 'linear-gradient(to right, white, #c7d2fe, #a5b4fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Welcome Back
                </Typography>
                <Typography variant="body2" color="gray" mt={1}>
                    Sign in to continue to Dobby ~ Chat
                </Typography>
            </Box>

            <Button
            fullWidth
            variant='outlined'
            onClick={()=>{
                alert('Google login')
            }}
            startIcon={<img src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} />}
            sx={{
                color: 'white',
                textTransform:'none',
                borderColor: 'rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                },
                py:1.5,
                borderRadius: '12px',
                fontSize: '1em'
            }}
            >
                Continue with Google
            </Button>

            <Divider sx={{ my: 3, borderColor: 'gray' ,
                '&::before, &::after': {
                    borderColor: 'gray', 
                    },
            }} orientation="horizontal">
                <Typography variant="caption" color="gray" fontSize={14}>
                    Or continue with
                </Typography>
            </Divider>

            <Box component='form' noValidate autoComplete="off" display='flex' flexDirection='column' gap={2} >
                <Box position='relative'>
                    <MailOutlineIcon style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', color: 'gray' }} />
                    <TextField
                        fullWidth
                        placeholder="Email Address"
                        type="email"
                        variant="outlined"
                        InputProps={{
                            sx: {
                            pl: 5,
                            letterSpacing:'.8px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                                '& input::placeholder': {
                                color: '#F5F5F563',
                                opacity: 1,
                            },
                            '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '12px', 
                            },
                        },
                        }}
                    />
                </Box>

                <Box position='relative'>
                    <LockOutlineIcon style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', color: 'gray' }} />
                    <TextField
                        fullWidth
                        placeholder="Password"
                        type="password"
                        variant="outlined"
                        InputProps={{
                            sx: {
                            pl: 5,
                            letterSpacing:'.8px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                                '& input::placeholder': {
                                color: '#F5F5F563',
                                opacity: 1,
                            },
                            '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '12px', 
                            },
                        },
                        }}
                    />
                </Box>

                <Box display='flex' justifyContent='space-between' alignContent='center' >
                    <FormControlLabel 
                        control={ <Checkbox sx={{ color: '#4f46e5' }} checked={checked} onChange={handleCheck} /> }
                        label={ <Typography color="gray" >Remember me</Typography> }
                    />

                    <Link href="#" underline="hover" color="#4f46e5" >
                        Forgot Password ?
                    </Link>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    onClick={(e)=>{
                        e.preventDefault();
                        alert("Call Login function")
                    }}
                    sx={{
                        py: 1.5,
                        fontWeight: 500,
                        fontSize: '1rem',
                        borderRadius: '8px',
                        textTransform:'none',
                        background: 'linear-gradient(to right, #4f46e5, #9f7aea)',
                        '&:hover': {
                        background: 'linear-gradient(to right, #5f56f5, #af8afa)',
                        },
                    }}
                    endIcon={<ArrowRight size={16} />}
                >
                    Sign in
                </Button>

            </Box>
        </Paper>
    )
}

export default LoginForm;