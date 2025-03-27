import React, { useEffect, useState } from 'react';
import { Button, Fab, Grid2, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../../actions/services';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import Services from './components/services_adm/services';
import Header from './components/header';

const ServicesAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('adminProfile'));

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

    return (
        <>
        <Header/>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "text.primary",
                    mt: 3,
                    mb: 2,
                    textTransform: "uppercase",
                    letterSpacing: 1.5
                }}
            >
                Admin Dashboard
            </Typography>
            <Services />
            {user && <Fab
                color='primary'
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' },
                    boxShadow: 3,
                }}
                onClick={() => navigate('/create')}
            >
                <AddIcon />
            </Fab>}
        </>
    )
}

export default ServicesAdmin;

const Shortcuts = () => {
    const navigate = useNavigate();
    return (
        <Grid2 container spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
            {/*            <Grid2>
                <Button variant='contained' sx={{
                    width: '250px',
                    color: 'text.primary',
                    '&:hover': {
                        backgroundColor: 'text.secondary',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '16px',
                }}
                    onClick={() => navigate('/create')}>
                    Create Service
                </Button>
            </Grid2>
 
            <Grid2>
                <Button variant='contained' sx={{
                    width: '250px',
                    color: 'text.primary',
                    '&:hover': {
                        backgroundColor: 'text.secondary',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '16px',
                }}>
                    Manage Reviews
                </Button>
            </Grid2>

            <Grid2>
                <Button variant='contained' sx={{
                    width: '250px',
                    color: 'text.primary',
                    '&:hover': {
                        backgroundColor: 'text.secondary',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '16px',
                }}>
                    View Registered Users
                </Button>
            </Grid2> */}
        </Grid2>
    )
}
