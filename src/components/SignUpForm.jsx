import { Box, Paper, Typography, Button, Divider, TextField, FormControlLabel, Checkbox,  IconButton, Avatar, Alert } from "@mui/material";
import React, { useRef, useState } from "react";
import { CheckBox, Email, Lock, Password, PasswordOutlined, Person3, Storage, Upload} from "@mui/icons-material";
import { Link } from "react-router-dom";
import ArrowRight from '@mui/icons-material/ArrowForward';
import {createUserWithEmailPassword, db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";

const SignUpForm = ()=>{
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [nameError, SetNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, SetPasswordError] = useState('');
    const [confirmPasswordError, SetConfirmPasswordError] = useState('');
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const handleSubmit = async (e) =>{
        
        e.preventDefault();

        setError('');
        SetNameError('');
        setEmailError('');
        SetPasswordError('');
        SetConfirmPasswordError('');

        if (!name.trim()) return SetNameError('Name is required');
        if (!email.trim()) return setEmailError('Email is required');
        if (!password.trim()) return SetPasswordError('Password is required');
        if (password.length < 6) return SetPasswordError('Password must be at least 6 characters');
        if (password !== confirmPassword) return SetConfirmPasswordError('Passwords do not match');

        try {
            const user = await createUserWithEmailPassword(email, password);

            //? Upload profile image to firebase Storage
            let profileImageUrl = null;
            if(profileImage){
                const imageRef = ref(storage, `profileImages/${user.uid}/${uuidv4()}`);
                await uploadBytes(imageRef, profileImage);
                profileImageUrl = await getDownloadURL(imageRef);
            }

            //? Save User Data in fireStore
            await setDoc(doc(db, "users", user.uid),{
                username:name,
                email:email,
                profileImageUrl: profileImageUrl,
            });

            console.log('User created and data saved.');
        } catch (error) {
            setError(error.message);
        }
    }

    const handleImageChange =(e) =>{
        const files = e.target?.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        setProfileImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
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
                    Create Account
                </Typography>
                <Typography variant="body2" color="gray" mt={1}>
                    Join Dobby ~ Chat today
                </Typography>
            </Box>

            {/* //? Profile Image Upload */}
            <Box display='flex' flexDirection='column' alignItems='center' mb={3} >
                <IconButton onClick={()=> fileInputRef.current?.click() } >
                    <Avatar
                        src={previewUrl || ''}
                        sx={{
                            width: 96,
                            height: 96,
                            border: '2px dashed #4f46e5',
                            backgroundColor: previewUrl ? 'transparent' : 'rgba(255,255,255,0.05)'
                        }}
                    >
                        {!previewUrl && <Upload style={{ color: 'gray' }} />}
                    </Avatar>
                </IconButton>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    hidden
                />
                <Typography variant="caption" color="gray">
                    Click to upload profile picture
                </Typography>
            </Box>

            <Box component='form' display='flex' flexDirection='column' gap={2} >
                <TextField
                    placeholder="Full name"
                    error={nameError}
                    label= {nameError ? 'Error' : ''}
                    helperText = {nameError}
                    type="text"
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    value={name}
                    InputProps={{
                        startAdornment: <Person3 style={{ marginRight: 8, color: 'gray' }}/>,
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
                                borderRadius: '8px', 
                            },
                    }
                    }}
                    fullWidth
                    variant="outlined"
                >
                </TextField>
                <TextField
                    placeholder="email"
                    type="email"
                    required
                    error={emailError}
                    label= {emailError ? 'Error' : ''}
                    helperText = {emailError}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    value={email}
                    InputProps={{
                        startAdornment: <Email style={{ marginRight: 8, color: 'gray' }}/>,
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
                                borderRadius: '8px', 
                            },
                    }
                    }}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    placeholder="Password"
                    type="password"
                    required
                    error={passwordError}
                    label= {passwordError ? 'Error' : ''}
                    helperText = {passwordError}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    value={password}
                    InputProps={{
                        startAdornment: <Lock style={{ marginRight: 8, color: 'gray' }}/>,
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
                                borderRadius: '8px', 
                            },
                    }
                    }}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    placeholder="Confirm password"
                    type="password"
                    required
                    error={confirmPasswordError}
                    label= {confirmPasswordError ? 'Error' : ''}
                    helperText = {confirmPasswordError}
                    onChange={(e)=>{
                        setConfirmPassword(e.target.value);
                    }}
                    value={confirmPassword}
                    InputProps={{
                        startAdornment: <Lock style={{ marginRight: 8, color: 'gray' }}/>,
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
                                borderRadius: '8px', 
                            },
                    }
                    }}
                    fullWidth
                    variant="outlined"
                />
                {error && (
                    <Alert severity="error" variant="outlined" color=""><Typography variant="error" color="error">{error}</Typography></Alert>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
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
                    Create Account
                </Button>

                <Box mt={4} textAlign="center">
                    <Typography variant="body2" color="gray">
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        component="button"
                        onClick={()=>{}}
                        sx={{ color: '#4f46e5', '&:hover': { color: '#6366f1' }, fontWeight: 500 }}
                    >
                        Sign in
                    </Link>
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default SignUpForm;