import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';

const SplashScreen = () => {    
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: '#6D214F',
                color: "white",
                textAlign: "center"
            }}
        >
            <img
                src="/images/app_logo.png"
                alt="Salon Logo"
                style={{ height: "100%", maxHeight: "10vh" }}
                width="auto"
                sx={{ height: { xs: 40, sm: 50, md: 60 } }}
            />
            <CircularProgress sx={{ mt: 2, color: '#F8C8DC' }} size={15} />
        </Box>
    )
}

export default SplashScreen;
