import { Avatar, Box, Button, Card, CardContent, CardMedia, Container, Grid, Grid2, Paper, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel'; import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../actions/services';
import Header from './components/header';
import Masonry from "react-masonry-css";
import { getGallery } from '../../actions/feedback';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services);
    const galleryItems = useSelector((state) => state.feedbackReducer);
    const defaultImage = "/images/default_service.png";
    const defaultProfile = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

    useEffect(() => { dispatch(getServices()); }, [dispatch]);

    useEffect(() => { dispatch(getGallery()); }, [dispatch]);

    const reviews = [
        { id: 1, name: 'John Doe', review: 'Amazing service! Highly recommend this salon.', image: '' },
        { id: 2, name: 'Jane Smith', review: 'The staff is very friendly and professional.', image: '' },
        { id: 3, name: 'Alice Johnson', review: 'One of the best haircuts I’ve ever had!', image: '' },
        { id: 4, name: 'Bob Brown', review: 'Great experience, will definitely come back.', image: '' },
        { id: 2, name: 'Jane Smith', review: 'The staff is very friendly and professional.', image: '' },
    ];

    // const galleryItems = [
    //     { src: "https://images.pexels.com/photos/696285/pexels-photo-696285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", user: "Jane Doe" },
    //     { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzIwk1Q9LbmAtKfKeJUgvrjPbGCOMzlInjlw&s", user: "Wise Men" },
    //     { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcjc0BF7OI5QvnHB8aHa8VSqzfQEupy5TVxQ&s", user: "I Can't" },
    //     { src: "https://cdn.prod.website-files.com/6103d7500a0d507d3f6f48a7/66aa19c84f116b89b4c86505_64e8d8d816d944e9a23dc11a_Customized%2520durations%2520work%2520for%2520appointments.webp", user: "Say Only" },
    //     { src: "https://i0.wp.com/www.rosysalonsoftware.com/wp-content/uploads/2020/08/Salon-Mirror.jpg?resize=1387%2C926&ssl=1", user: "Fools Rush" },
    //     { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ethfWUjSfzFiD3REQU4-PLfivpCAfSCXag&s", user: "In But" },
    // ];

    return (
        <Box>
            <Header />
            <Box sx={{
                backgroundImage: "url('https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                color: "white",
                textAlign: "left",
                alignContent: 'center',
                py: 10,
                px: 5,
                height: '80vh',
                overflow: "hidden",
                '&::before': {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(5px)",
                    zIndex: 1,
                },
            }}>
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6} sx={{ position: "relative", zIndex: 2 }}>
                            <Typography variant="h3" mb={2}>Jane Doe</Typography>
                            <Typography variant="body1">Expert in salon services with 10+ years of experience. We provide top-notch services to make you look and feel your best.</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ position: "relative", zIndex: 2, textAlign: 'center' }}>
                            <Box
                                component="img" src="https://images.pexels.com/photos/725255/pexels-photo-725255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Admin"
                                sx={{
                                    borderRadius: "50%", maxWidth: '100%',
                                    width: { xs: '200px', md: '400px' },
                                    height: { xs: '200px', md: '400px' },
                                }} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }} align="center" color="text.primary">
                    Our Services
                </Typography>
                <Grid container spacing={2}>
                    {services.slice(0, 6).map((service) => (
                        <Grid item key={service._id} xs={12} sm={6} md={4}>
                            <Card sx={{
                                height: '100%',
                                borderRadius: 3,
                                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
                                }
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={service.image || defaultImage}
                                    alt={service.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/services')}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 8,
                            color: "text.primary",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            background: "primary.main",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                            },
                        }}
                    >
                        View All Services
                    </Button>
                </Box>
            </Container>

            <Box sx={{ py: 5, backgroundColor: "white", alignContent: "center" }}>
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        {/* Left Side: Testimonials Content */}
                        <Grid item xs={12} md={5}>
                            <Typography variant="h4" gutterBottom color="text.primary">
                                What Our Clients Say
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Thanks to our client's regular reviews, testimonials, and comments we are able to improve our salon.
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Unlike other salons, we prefer to maintain a constant connection with our
                                customers and receive feedback on every service, whether it's a simple haircut or complex wedding makeup,
                                If you've already visited us, feel free to contact us and send your testimonial.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <Carousel
                                showArrows
                                autoPlay
                                showThumbs={false}
                                showIndicators
                                infiniteLoop
                                swipeable
                                showStatus={false}
                                stopOnHover
                                interval={4000}
                            >
                                {reviews.map((review) => (
                                    <Paper
                                        key={review.id}
                                        sx={{
                                            textAlign: "center",
                                            alignContent: 'center',
                                            p: 4,
                                            mx: 2,
                                            height: 250,
                                            borderRadius: 3,
                                            border: 1,
                                            borderColor: 'primary.main',
                                            bgcolor: "background.main",
                                            boxShadow: 0,
                                            maxWidth: 500,
                                            margin: "auto"
                                        }}
                                    >
                                        <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
                                            "{review.review}"
                                        </Typography>

                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
                                            <Avatar
                                                src={review.image || defaultProfile}
                                                alt={review.name}
                                                sx={{ width: 60, height: 60, mb: 1, border: "2px solid #F8C8DC" }}
                                            />
                                            <Typography variant="body1" fontWeight="bold">{review.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">{review.role || ""}</Typography>
                                        </Box>
                                    </Paper>
                                ))}
                            </Carousel>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ py: 5, width: "100%", maxWidth: "1200px", mx: "auto" }}>
                <Container>
                    <Typography
                        variant="h4"
                        align="center"
                        color="text.primary"
                        sx={{ mb: 3 }}
                    >
                        Our Photo Gallery
                    </Typography>

                    <Masonry
                        breakpointCols={{ default: 3, 1100: 3, 700: 2 }}
                        className="my-masonry-grid" style={{alignItems: "center"}}
                        columnClassName="my-masonry-grid_column"
                    >
                        {galleryItems.slice(-6).reverse().map((item) => (
                            <Box key={item._id} sx={{ position: "relative", overflow: "hidden", borderRadius: 2, mb: 2 }}>
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
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/gallery')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 8,
                                color: "text.primary",
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                background: "primary.main",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                                },
                            }}
                        >
                            View All Photos
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Box sx={{ backgroundColor: "white" }}>
                <Container sx={{ py: 4 }}>
                    <Grid container spacing={2} my={1}>
                        <Grid item xs={12} md={6} alignContent="center">
                            <Typography variant="h4" gutterBottom color="text.primary">
                                About Our Salon
                            </Typography>
                            <Typography variant="body1" paragraph color="text.secondary">
                                Located in the heart of the city, our salon offers a relaxing and luxurious experience. We use only the best products and techniques to ensure you leave feeling refreshed and beautiful.
                            </Typography>
                            <Typography variant="body1" paragraph color="text.secondary">
                                Address: 123 Salon Street, City, Country
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="iframe"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.81627974202167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d8a32f7f8c8!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1633033226787!5m2!1sen!2sus"
                                width="100%"
                                height="300px"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box sx={{
                backgroundImage: "url('https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                color: "white",
                textAlign: "left",
                py: 7,
                overflow: "hidden",
                '&::before': {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(5px)",
                    zIndex: 1,
                },
            }}
            >
                <Container sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                    <Typography variant="body1">
                        &copy; {new Date().getFullYear()} Salon Name. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}

export default Home
