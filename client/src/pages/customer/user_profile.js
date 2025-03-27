import { Avatar, Box, Button, Card, CardContent, CircularProgress, Container, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../../actions/auth';
import FavoritesSection from './components/favorites_section';
import { deepPurple } from '@mui/material/colors';
import Header from './components/header';
import _ from 'lodash';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userProfile'));
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formValues, setFormValues] = useState({
        name: user.result.name || "",
        email: user.result.email || "",
        profilePicture: user.result.profilePicture || "",
        phoneNumber: user.result.phoneNumber || "",
        location: user.result.location || ""
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result);
                setFormValues((prevValues) => ({
                    ...prevValues,
                    profilePicture: reader.result,
                }))
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => {
        setImage(null);
        setPreview(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile(user?.result._id, formValues));
        console.log("Form Data:", formValues);
        setLoading(true);
        _.delay(() => {
            navigate("/");
        }, 1000);
    };

    return (
        <>
            <Header pageTitle="Manage Profile"/>
            <Container maxWidth="md" sx={{ mt: 12 }}>
                <Card sx={{ p: 4, borderRadius: 4, boxShadow: 4 }}>
                    <CardContent>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Avatar src={user?.result?.profilePicture} sx={{ bgcolor: deepPurple[500], width: 150, height: 150, fontSize: '3rem' }}>
                                    {user?.result?.name?.charAt(0).toUpperCase()}
                                </Avatar>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4" gutterBottom fontWeight={600} color="text.primary">
                                    My Profile
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField fullWidth label="Name" name="name" value={formValues.name} onChange={handleChange} margin="normal" variant="outlined" />

                                    <TextField fullWidth label="Email" name="email" value={formValues.email} onChange={handleChange} margin="normal" variant="outlined" disabled />

                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, my: 1 }}>
                                        {preview ? (
                                            <>
                                                <Avatar src={preview} alt="Preview" sx={{ width: 150, height: 150, borderRadius: 1000 }} />
                                                <IconButton onClick={handleRemove} color="error">
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <input accept="image/*" style={{ display: 'none' }} id="upload-button" type="file" onChange={handleImageChange} />
                                                <label htmlFor="upload-button">
                                                    <Button component="span" color='text.primary' variant="outlined" startIcon={<CloudUploadIcon />}>
                                                        Upload Profile picture
                                                    </Button>
                                                </label>
                                                <Typography variant="caption" color="text.secondary">
                                                    JPG or PNG (Max: 5MB)
                                                </Typography>
                                            </>
                                        )}
                                    </Box>

                                    <TextField fullWidth label="Phone Number" name="phoneNumber" value={formValues.phoneNumber} onChange={handleChange} margin="normal" variant="outlined" />

                                    <TextField fullWidth label="Location" name="location" value={formValues.location} onChange={handleChange} margin="normal" variant="outlined" />

                                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, width: '100%' }}>
                                        Save Changes 
                                        {loading && <CircularProgress size={20} sx={{ ml: 1 }} color='text.primary' />}
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                        {/* <Divider sx={{ my: 4 }} />
                        <Typography variant="h5" gutterBottom fontWeight={500} color="text.secondary">
                            Your Favorites
                        </Typography> */}
                    </CardContent>
                    {/* <FavoritesSection favorites={user?.result.favorites} /> */}
                </Card>
            </Container>
        </>
    )
}

export default UserProfile
