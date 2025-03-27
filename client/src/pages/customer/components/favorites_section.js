import { Avatar, Box, Card, CardContent, CardMedia, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addtoFavorites, getServices } from '../../../actions/services';
import { getUser } from '../../../actions/auth';

const FavoritesSection = () => {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services);
    const authState = useSelector((state) => state.auth);
    console.log('AuthReducer: ', authState);
    const user = useSelector((state) => state.authReducer?.user);
    const [favoriteServices, setFavoriteServices] = useState([]);

    useEffect(() => {
        if (user?.id) {
            dispatch(getUser(user._id));
        }
        dispatch(getServices());
    }, []);

    console.log("User Favorite IDs:", user?.favorites);
    console.log("User Data:", user);
    console.log("User ID:", user?.id);
    console.log("Fetched Services:", services);


    useEffect(() => {
        if (user?.favorites.length > 0 && services.length > 0) {
            const filteredServices = services.filter((service) =>
                user.favorites.includes(service._id.toString()));
            setFavoriteServices(filteredServices);
            console.log("Filtered Services:", filteredServices);
            console.log('user?.favorites: ', user?.favorites);
        }
    }, [user, services]);

    const toggleFavorite = (id) => {
        dispatch(addtoFavorites(id));
    };

    if (!user?.favorites || !services?.length) {
        return <Typography variant="h6" align="center">You have no favorite services yet.</Typography>;
    }

    return (
        <>
            <List sx={{ mt: 4 }}>
                {favoriteServices.map((service) => (
                    <Card key={service._id} sx={{ mb: 2, boxShadow: 4, borderRadius: 3 }}>
                        <CardContent>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={service.image || '/images/default_service.png'} alt={service.title} sx={{ width: 80, height: 80, borderRadius: 2 }} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" fontWeight={600} color="primary.main">
                                            {service.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {service.description}
                                            </Typography>
                                            <Typography variant="h6" color="secondary.main">
                                                ${service.price}
                                            </Typography>
                                        </Box>
                                    }
                                />
                                <IconButton onClick={() => toggleFavorite(service._id)} sx={{ color: user?.favorites.includes(service._id) ? 'red' : 'grey' }}>
                                    {user?.favorites.includes(service._id) ? <Favorite /> : <FavoriteBorder />}
                                </IconButton>
                            </ListItem>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </>
    )
}

export default FavoritesSection;
