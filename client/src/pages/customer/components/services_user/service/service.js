import { Card, CardMedia, Typography, Box, CardContent, Button, CardActions } from '@mui/material'
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addtoFavorites, deleteService } from '../../../../../actions/services';
import { Favorite, FavoriteBorder, FavoriteOutlined } from '@mui/icons-material';

const Service = ({ service }) => {
    const defaultImage = "/images/default_service.png";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('userProfile'));
    const favoriteServices = useSelector(() => user?.result.favorites || []);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (favoriteServices.includes(service._id)) {
            setIsFavorite(true);
        }
    }, [service._id]);

    const handleAddToFavorites = async (e) => {
        e.stopPropagation();

        const updatedFavorite = !isFavorite;
        dispatch(addtoFavorites(service._id));
        setIsFavorite(updatedFavorite);
        // if (response.success) {
        //     isFavorite
        //         ? message.success("Removed recipe from favorites") : message.success(response.message);
        //     
        // } else {
        //     message.error(response.message);
        // }
    }

    return (
        <Card sx={{
            width: 345, borderRadius: 2, height: 350,
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
                    WebkitLineClamp: 2,
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
                    <Typography variant="body2" color="text.secondary">💅 {service.category}</Typography>
                </Box>
                {/* <Button variant="contained" fullWidth sx={{ mt: 2 }}>Book Now</Button> 
                <CardActions sx={{ justifyContent: "center", mt: 1 }}>
                    {isFavorite
                        ? <Button variant='outlined' size="small" startIcon={<Favorite />} color="text.primary" onClick={handleAddToFavorites}>
                            Added to favorites
                        </Button>
                        : <Button variant='contained' size="small" startIcon={<FavoriteBorder />} color="text.primary" onClick={handleAddToFavorites}>
                            Add to favorites
                        </Button>}
                </CardActions>*/}
            </CardContent>
        </Card>
    )
}

export default Service;