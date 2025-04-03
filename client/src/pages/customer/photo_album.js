import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Masonry from 'react-masonry-css'
import { useDispatch, useSelector } from 'react-redux';
import { getGallery } from '../../actions/feedback';
import Header from './components/header';

const PhotoAlbum = () => {
    const dispatch = useDispatch();
    const galleryItems = useSelector((state) => state.feedbackReducer);
    const [loadedItems, setLoadedItems] = useState([]);
    const [page, setPage] = useState(1);
    const observerRef = useRef(null);

    useEffect(() => {
        dispatch(getGallery());
    }, [dispatch]);

    useEffect(() => {
        setLoadedItems(galleryItems.slice(0, 2));
    }, [galleryItems]);

    useEffect(() => {
        if (!galleryItems.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const lastItem = entries[0];
                if (lastItem.isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [loadedItems]);

    useEffect(() => {
        const newItems = galleryItems.slice(0, page * 2);
        setLoadedItems(newItems);
    }, [page, galleryItems]);

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
                        {loadedItems.reverse().map((item, index) => (
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
                    <div ref={observerRef} style={{ height: 1 }} />
                </Container>
            </Box>
        </>
    )
}

export default PhotoAlbum
