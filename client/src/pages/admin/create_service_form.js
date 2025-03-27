import {
    Container, TextField, Typography, Button, Select,
    MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel,
    Avatar, Box
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createService } from '../../actions/services';

const CreateServiceForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        duration: "",
        category: "Hair",
        isActive: true,
    });
    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setFormData((prev) => ({ ...prev, isActive: e.target.checked }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }));
            };
        }
    };

    const clearForm = () => {
        setFormData({ title: "", description: "", image: "", price: "", duration: "", category: "Hair", isActive: true });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createService(formData));
        console.log("Form Data:", formData);
        navigate("/servicesAdmin");
        clearForm();
    };

    return (
        <Container sx={{ marginY: '15px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                {"Create Service"}
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} margin="normal" />

                <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                    {selectedImage && (
                        <>
                            <Avatar
                                src={URL.createObjectURL(selectedImage)}
                                alt="Preview" variant='rounded'
                                sx={{ width: 100, height: 100 }} />
                            <Typography variant="body2" color="textSecondary">{selectedImage.name}</Typography>
                            <Button variant='text' color='error' onClick={() => {
                                setSelectedImage(null);
                                setFormData((prev) => ({ ...prev, image: "" }));
                            }}>✖</Button>
                        </>
                    )}
                </Box>
                <Button variant='contained' component="label" sx={{ marginY: '15px' }}> <input type='file' accept='image/' hidden onChange={handleImageChange} />Upload Image</Button>




                <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="normal" multiline rows={3} />
                <TextField fullWidth label="Price" name="price" type="number" value={formData.price} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Duration (mins)" name="duration" type="number" value={formData.duration} onChange={handleChange} margin="normal" />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select name="category" value={formData.category || ""} onChange={handleChange}>
                        <MenuItem value="Hair">Hair</MenuItem>
                        <MenuItem value="Nails">Nails</MenuItem>
                        <MenuItem value="Facial">Facial</MenuItem>
                        <MenuItem value="Makeup">Makeup</MenuItem>
                    </Select>
                </FormControl>

                <FormControlLabel control={<Checkbox checked={formData.isActive} onChange={handleCheckboxChange} />} label="Service Available" />


                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Create Service
                </Button>
            </form>
        </Container>
    )
}

export default CreateServiceForm;
