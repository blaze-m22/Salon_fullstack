import { Avatar, Box, Button, Card, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import AddIcon from '@mui/icons-material/Add';
import Header from './components/header';
import { Close } from '@mui/icons-material';
import { createGalleryItem, deleteGalleryItem, getGallery } from '../../actions/feedback';
import { useDispatch, useSelector } from 'react-redux';

const GalleryAdmin = () => {
    const dispatch = useDispatch();
    const [isPop, setIsPop] = useState(false);
    const [confirmDeletePop, setConfirmDeletePop] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const user = JSON.parse(localStorage.getItem('adminProfile'));
    const galleryItems = useSelector((state) => state.feedbackReducer);
    const [formData, setFormData] = useState({
        clientImage: "",
        clientName: ""
    });

    useEffect(() => {
        dispatch(getGallery());
    }, [dispatch]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => setFormData((prev) => ({
                ...prev, clientImage: reader.result
            }));
        }
    };

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            clientName: e.target.value
        }));
    };

    const clearForm = () => {
        setFormData({ clientImage: "", clientName: "" });
    }

    const openConfirmDeleteDialog = (item) => {
        setSelectedItem(item);
        setConfirmDeletePop(true);
    }

    const handleRemoveImage = () => {
        if (selectedItem) {
            dispatch(deleteGalleryItem(selectedItem._id));
            setConfirmDeletePop(false);
            setSelectedItem(null);
        }
    }

    const handleOpen = () => setIsPop(true);
    const handleClose = () => setIsPop(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createGalleryItem(formData));
        console.log("Form Data:", formData);
        clearForm();
        handleClose();
    };

    return (
        <>
            <Header pageTitle="Dashboard - Galery" />
            <Box sx={{ py: 2, width: "100%", maxWidth: "1200px", mx: "auto" }}>
                <Container>
                    <Grid container spacing={2}>
                        {galleryItems.map((item) => (
                            <Grid item key={item._id} xs={12}>
                                <Card sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: 3,
                                    boxShadow: 0,
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": { boxShadow: "0px 8px 24px rgba(0,0,0,0.1)" }
                                }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { xs: 140, sm: 180 },
                                            height: { xs: 100, sm: 120 },
                                            borderRadius: "8px 0 0 8px",
                                            objectFit: "cover"
                                        }}
                                        image={item.clientImage}
                                        alt={item.name}
                                    />
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography variant="body1" fontWeight="bold">
                                            {item.clientName}
                                        </Typography>
                                    </CardContent>
                                    {user && <Button
                                        variant="contained"
                                        onClick={() => openConfirmDeleteDialog(item)}
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: 8,
                                            fontWeight: "bold",
                                            boxShadow: "none",
                                            color: "white",
                                            mr: 1,
                                            backgroundColor: "error.main",
                                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                            padding: { xs: "4px 4px", sm: "6px 12px" },
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                            }
                                        }}
                                    >
                                        Remove
                                    </Button>}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {user && <Fab
                        color='primary'
                        onClick={handleOpen}
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                            boxShadow: 3,
                        }}
                    >
                        <AddIcon />
                    </Fab>}
                </Container>

                <Modal open={isPop}>
                    <Box sx={{
                        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                        width: 400, bgcolor: "background.paper", boxShadow: 24, p: 3, borderRadius: 2
                    }}>
                        <IconButton onClick={handleClose} sx={{ position: "absolute", right: 10, top: 10 }}>
                            <Close />
                        </IconButton>
                        <Typography variant="h6" textAlign="center" gutterBottom color='text.primary'>
                            Add Client Photo
                        </Typography>
                        <Box mt={2}>
                            <form onSubmit={handleSubmit}>
                                {!formData.clientImage && (<>
                                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} id="image-upload" />
                                    <label htmlFor="image-upload">
                                        <Button variant="outlined" sx={{ borderColor: "text.primary", color: 'text.primary' }} component="span">Choose Image</Button>
                                    </label>
                                </>
                                )}
                                {formData.clientImage && (
                                    <Box sx={{
                                        display: "flex", alignItems: "center", gap: 2, p: 2, borderRadius: 2,
                                        backgroundColor: "rgba(0, 0, 0, 0.05)", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                                        position: "relative", maxWidth: 350,
                                    }}>
                                        <Avatar
                                            src={formData.clientImage}
                                            alt="Preview"
                                            variant='rounded'
                                            sx={{ width: 80, height: 80, border: "1px solid white", boxShadow: 1 }}
                                        />
                                        <Button variant='text' color='error' onClick={() => { setFormData((prev) => ({ ...prev, clientImage: "" })) }}
                                            sx={{ minWidth: 32, height: 32, borderRadius: "50%", }}
                                        >
                                            ✖
                                        </Button>
                                    </Box>
                                )}
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    fullWidth sx={{ my: 2 }}
                                    value={formData.clientName}
                                    onChange={handleInputChange}
                                />
                                <Button variant="contained" color="primary">Submit</Button>
                            </form>
                        </Box>
                    </Box>
                </Modal>

                <Dialog open={confirmDeletePop} onClose={() => setConfirmDeletePop(false)}>
                    <DialogTitle sx={{ color: "text.primary" }}>Confirm Deletion</DialogTitle>
                    <DialogContent sx={{ color: "text.secondary" }}>
                        Are you sure you want to delete {selectedItem?.clientName}'s image?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDeletePop(false)} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleRemoveImage} color="error" variant="contained">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    )
}

export default GalleryAdmin;
