import React, { useEffect, useState } from 'react';
import Service from './service/service';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Container, Grid, Pagination, TextField, Typography } from '@mui/material';
import _ from "lodash";
import { useNavigate } from 'react-router-dom';
import Header from '../header';

const Services = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredServices, setFilteredServices] = useState(services);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    useEffect(() => {
        const debouncedFilter = _.debounce(() => {
            setFilteredServices(
                services
                    .filter((service) => service.isActive)
                    .filter((service) => service.title.toLowerCase().includes(searchTerm.toLowerCase())
                    ));
        }, 300);

        debouncedFilter();
        return () => debouncedFilter.cancel();
    }, [searchTerm, services]);

    const paginatedServices = filteredServices.slice(
        (currentPage - 1) * pageSize, currentPage * pageSize
    );

    return (
        !services.length
            ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 5 }}>
                <CircularProgress />
            </Box> :
            (
                <>
                    <Header pageTitle="our services" />
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 12 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search services..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ marginBottom: 2, width: "60%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", bgcolor: 'white' }}
                        />
                    </Box>
                    <Container sx={{ mb: 2 }}>
                        <Grid spacing={1} container sx={{ alignItems: "center", justifyContent: "center", marginY: "5px" }}>
                            {paginatedServices.map((service) => (
                                <Grid item key={service._id}>
                                    <Service service={service} />
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                            <Pagination
                                count={Math.ceil(filteredServices.length / pageSize)}
                                page={currentPage}
                                onChange={(event, page) => setCurrentPage(page)}
                                color="primary"
                            />
                        </Box>
                    </Container>
                </>
            )
    );
}

export default Services;
