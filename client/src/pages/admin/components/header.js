import React, { useEffect, useState } from 'react'
import {
    AppBar, Toolbar, Typography, IconButton,
    MenuItem, Avatar, useMediaQuery,
    useTheme, Drawer, List,
    ListItem, ListItemButton, ListItemText,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeRounded, Login, LoginRounded, LogoutRounded, ManageSearch } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { ADMIN_LOGOUT } from '../../../constants/action_types';

const Header = ({ pageTitle }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openDrawer, setOpenDrawer] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('adminProfile')));

    const logout = () => {
        dispatch({ type: ADMIN_LOGOUT });
        navigate('/servicesAdmin');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
                window.location.reload();
            };
        }

        const storedUser = JSON.parse(localStorage.getItem('adminProfile'));
        if (storedUser?.token !== user?.token) {
            setUser(storedUser);
        }
    }, [location]);

    return (
        <AppBar position="static" sx={{ backgroundColor: 'primary.main', color: 'text.primary', justifyContent: 'center', height: '8vh' }}>
            <Toolbar>
                <Box sx={{ display: "flex", alignItems: "center", my: "3px", background: 'transparent', flexGrow: 1 }}>
                    <img src="/images/app_logo.png" alt="Salon Logo" style={{ maxHeight: '6vh' }} />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            ml: { xs: 1, sm: 2 },
                            color: "text.primary",
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" }
                        }}
                    >
                        {pageTitle}
                    </Typography>
                </Box>

                {!isMobile && (
                    <Box sx={{ display: "flex", alignItems: "center", ml: "auto", letterSpacing: 1 }}>
                        <MenuItem component={Link} sx={{ fontWeight: 'bold' }} to="/servicesAdmin">SERVICES</MenuItem>
                        <MenuItem component={Link} sx={{ fontWeight: 'bold' }} to="/galleryAdmin">GALLERY</MenuItem>
                        {user
                            ? <>
                                <MenuItem>
                                    <Avatar
                                        sx={{
                                            fontWeight: "bold",
                                            bgcolor: "text.primary",
                                            color: "white",
                                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                                        }}
                                    >
                                        {user.result?.name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Typography variant="body1" sx={{ ml: 2, fontWeight: "bold" }}>
                                        {user.result?.name + " (Admin)"}
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <LogoutRounded alt="Log Out" onClick={logout} />
                                </MenuItem>
                            </>
                            : <MenuItem>
                                <LoginRounded alt="Log In" onClick={() => navigate('/adminAuth')} />
                            </MenuItem>}
                    </Box>
                )}

                {isMobile && (
                    <>
                        <Box sx={{ flexDirection: 'row', display: 'flex' }}>
                            {user
                                ? <>
                                    <MenuItem sx={{ p: 0 }}>
                                        <Avatar
                                            sx={{
                                                mx: 2,
                                                fontWeight: "bold",
                                                bgcolor: "text.primary",
                                                color: "white",
                                                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            {user.result?.name?.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </MenuItem>
                                </>
                                : <MenuItem>
                                    <LoginRounded alt="Log In" onClick={() => navigate('/adminAuth')} />
                                </MenuItem>}
                            <MenuItem sx={{ px: 0 }} onClick={() => setOpenDrawer(true)}>
                                <MenuIcon />
                            </MenuItem>
                        </Box>

                        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{ "& .MuiDrawer-paper": { backgroundColor: '#5A3E55', color: "#F8E8EE" } }}>
                            <List sx={{ width: 250 }}>

                                <ListItem>
                                    <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: 'center', width: '100%', my: "3px", background: 'transparent' }}>
                                        <img src="/images/app_logo.png" alt="Salon Logo" style={{ maxHeight: '20vw' }} />
                                        {user && <Typography variant="body1" sx={{ m: 2, fontWeight: "bold" }}>
                                            {user.result?.name + " (Admin)"}
                                        </Typography>}
                                    </Box>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/servicesAdmin" onClick={() => setOpenDrawer(false)} sx={{ "&:hover": { backgroundColor: "#E8B4C1", color: "text.primary" } }}>
                                        <ManageSearch sx={{ mr: 2 }} />
                                        <ListItemText primary="MANAGE SERVICES" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/galleryAdmin" onClick={() => setOpenDrawer(false)} sx={{ "&:hover": { backgroundColor: "#E8B4C1", color: "text.primary" } }}>
                                        <ManageSearch sx={{ mr: 2 }} />
                                        <ListItemText primary="MANAGE GALLERY" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => {
                                        setOpenDrawer(false);
                                        if (user) {
                                            logout();
                                        } else {
                                            navigate('/adminAuth');
                                        }
                                    }} sx={{ "&:hover": { backgroundColor: "#E8B4C1", color: "text.primary" } }} >
                                        {user ? <>
                                            <LogoutRounded alt="Log Out" sx={{ mr: 2 }} />
                                            <ListItemText primary="LOG OUT" />
                                        </>
                                            : <>
                                                <LoginRounded alt="Log In" sx={{ mr: 2 }} />
                                                <ListItemText primary="LOGIN" />
                                            </>}
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Drawer>
                    </>
                )}

            </Toolbar>
        </AppBar>
    );
};

export default Header;
