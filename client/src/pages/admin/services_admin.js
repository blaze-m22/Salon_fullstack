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
        <Header pageTitle="Dashboard - Services"/>
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