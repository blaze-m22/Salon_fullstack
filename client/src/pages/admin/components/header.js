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

const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openDrawer, setOpenDrawer] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('adminProfile')));
    // const authData = useSelector((state) => state.authReducer?.authData);

    const logout = () => {
        dispatch({ type: ADMIN_LOGOUT });
        navigate('/servicesAdmin');
        setUser(null);
    }

    // useEffect(() => {
    //     if (!authData) {
    //         navigate('/adminAuth');
    //     }
    // }, [authData, navigate]);

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
                </Box>

                {!isMobile && (
                    <Box sx={{ display: "flex", alignItems: "center", ml: "auto", letterSpacing: 1 }}>
                        {user
                            ? <>
                                <MenuItem>
                                    <Typography variant="body1" sx={{ mx: 2, fontWeight: "bold" }}>
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
                                        <Typography variant="body1" sx={{ mx: 2, fontWeight: "bold" }}>
                                            {user.result?.name + " (Admin)"}
                                        </Typography>
                                    </MenuItem>
                                </>
                                : <MenuItem>
                                    <LoginRounded alt="Log In" onClick={() => navigate('/adminAuth')} />
                                </MenuItem>}
                            <MenuItem sx={{ pl: 0 }} onClick={() => setOpenDrawer(true)}>
                                <MenuIcon />
                            </MenuItem>
                        </Box>

                        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{ "& .MuiDrawer-paper": { backgroundColor: '#5A3E55', color: "#F8E8EE" } }}>
                            <List sx={{ width: 250 }}>

                                <ListItem>
                                    <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: 'center', width: '100%', my: "3px", background: 'transparent' }}>
                                        <img src="/images/app_logo.png" alt="Salon Logo" style={{ maxHeight: '20vw' }} />
                                        <Typography variant="body1" sx={{ m: 2, fontWeight: "bold" }}>
                                            {user.result?.name + " (Admin)"}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/servicesAdmin" onClick={() => setOpenDrawer(false)} sx={{ "&:hover": { backgroundColor: "#E8B4C1" } }}>
                                        <ManageSearch sx={{ mr: 2 }} />
                                        <ListItemText primary="MANAGE SERVICES" />
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
                                    }}>
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
