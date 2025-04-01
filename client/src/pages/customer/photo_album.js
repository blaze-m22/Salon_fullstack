import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { useDispatch, useSelector } from 'react-redux';
import { getGallery } from '../../actions/feedback';
import Header from './components/header';

const PhotoAlbum = () => {
    const dispatch = useDispatch();
    const galleryItems = useSelector((state) => state.feedbackReducer);

    useEffect(() => {
        dispatch(getGallery());
    }, [dispatch]);

    // const galleryItems = [
    //     { src: "https://images.pexels.com/photos/696285/pexels-photo-696285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", user: "Jane Doe" },
    //     { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzIwk1Q9LbmAtKfKeJUgvrjPbGCOMzlInjlw&s", user: "Wise Men" },
    //     { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcjc0BF7OI5QvnHB8aHa8VSqzfQEupy5TVxQ&s", user: "I Can't" },
    //     { src: "https://cdn.prod.website-files.com/6103d7500a0d507d3f6f48a7/66aa19c84f116b89b4c86505_64e8d8d816d944e9a23dc11a_Customized%2520durations%2520work%2520for%2520appointments.webp", user: "Say Only" },
    //     { src: "https://i0.wp.com/www.rosysalonsoftware.com/wp-content/uploads/2020/08/Salon-Mirror.jpg?resize=1387%2C926&ssl=1", user: "Fools Rush" },
    //     { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ethfWUjSfzFiD3REQU4-PLfivpCAfSCXag&s", user: "In But" },
    // ];

    return (
        <>
            <Header pageTitle="Our happy clients" />
            <Box sx={{ py: 3, width: "100%", maxWidth: "1200px", mx: "auto" }}>
                <Container>
                    <Masonry
                        breakpointCols={{ default: 3, 1100: 3, 700: 2 }}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {galleryItems.reverse().map((item, index) => (
                            <Box key={index} sx={{ position: "relative", overflow: "hidden", borderRadius: 2, mb: 2 }}>
                                <img
                                    src={item.clientImage} alt="Gallery" style={{ width: "100%", display: "block", borderRadius: "8px" }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute", bottom: 0, left: 0, width: "100%",
                                        background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
                                        color: "white", pb: 2, display: "flex", alignItems: "center", justifyContent: "center"
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                        {item.clientName}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Masonry>
                </Container>
            </Box>
        </>
    )
}

export default PhotoAlbum
