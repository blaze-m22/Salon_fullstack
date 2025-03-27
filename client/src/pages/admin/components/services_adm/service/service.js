import { Card, CardMedia, Typography, Box, CardContent, Button, CardActions } from '@mui/material'
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteService } from '../../../../../actions/services';

const Service = ({ service }) => {
    const defaultImage = "/images/default_service.png";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('adminProfile'));

    return (
        <Card sx={{
            width: 345, borderRadius: 2, maxHeight: 378,
            boxShadow: 0, "&:hover": {
                boxShadow: "0px 0px 14px rgba(0,0,0,0.1)",
            }
        }}>
            <CardMedia
                component="img"
                height="200px"
                image={service.image || defaultImage}
                alt={service.name}
            />
            <CardContent sx={{ padding: "14px 16px", pb: 0 }}>
                <Typography variant="h6" gutterBottom>{service.title}</Typography>
                <Box sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    <Typography variant="body2" color="text.secondary">
                        {service.description}
                    </Typography>
                </Box>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" fontWeight="normal">$ {service.price}</Typography>
                    <Typography variant="body2" color="text.secondary">&#x231B; {service.duration} min</Typography>
                    <Typography variant="body2" color="text.secondary">{service.isActive ? 'Available' : 'Unavailable'}</Typography>
                </Box>
                {/* <Button variant="contained" fullWidth sx={{ mt: 2 }}>Book Now</Button> */}
                {user &&
                    <CardActions sx={{ justifyContent: "space-between", mt: 1 }}>
                        <Button variant='outlined' size="small" startIcon={<EditIcon />} color="text.primary" onClick={() => navigate(`/edit/${service._id}`)}>
                            Edit
                        </Button>
                        <Button variant='outlined' size="small" startIcon={<DeleteIcon />} color="error" onClick={() => dispatch(deleteService(service._id))}>
                            Delete
                        </Button>
                    </CardActions>}
            </CardContent>
        </Card>
    )
}

export default Service;
