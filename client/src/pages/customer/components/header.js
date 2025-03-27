import { AppBar, Avatar, Box, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AccountCircleRounded, DesignServices, HomeRounded, LoginRounded, LogoutRounded, SupervisedUserCircle } from '@mui/icons-material';
import { ADMIN_LOGOUT, USER_LOGOUT } from '../../../constants/action_types';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { deepPurple } from '@mui/material/colors';

const Header = ({ pageTitle }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openDrawer, setOpenDrawer] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile')));

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
                window.location.reload();
            };
        }

        const storedUser = JSON.parse(localStorage.getItem('userProfile'));
        if (storedUser?.token !== user?.token) {
            setUser(storedUser);
        }

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location]);

    const logout = () => {
        dispatch({ type: USER_LOGOUT });
        navigate('/');
        setUser(null);
    }

    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: "#F8C8DC", height: 40 }}>
                <Container sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton sx={{ color: "text.primary", p: 0 }}>
                            <PhoneIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: "text.primary" }}>
                            +1 234 567 890
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton sx={{ color: "text.primary", p: 0 }}>
                            <EmailIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: "text.primary" }}>
                            contact@salon.com
                        </Typography>
                    </Box>
                </Container>
            </AppBar>

            <AppBar
                position="fixed"
                sx={{ transition: "background-color 0.4s ease-in-out", color: scrolling ? 'text.primary' : 'primary.main', backgroundColor: scrolling ? "primary.main" : "transparent", boxShadow: "none", top: scrolling ? 0 : 40 }}
            >
                <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", my: "6px", background: 'transparent' }}>
                        <img src="/images/app_logo.png" alt="Salon Logo" style={{ height: 70 }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                ml: 2,
                                color: "text.primary",
                                textTransform: "uppercase",
                                letterSpacing: 1.5
                            }}
                        >
                            {pageTitle}
                        </Typography>
                    </Box>

                    {!isMobile && (
                        <Box sx={{ display: "flex", alignItems: "center", ml: "auto", letterSpacing: 1 }}>
                            <MenuItem component={Link} sx={{ fontWeight: 'bold' }} to="/">HOME</MenuItem>
                            <MenuItem component={Link} sx={{ fontWeight: 'bold' }} to="/services">SERVICES</MenuItem>
                            {user
                                ? <>
                                    <MenuItem onClick={() => navigate('/userProfile')}>
                                        <Avatar src={user?.result?.profilePicture} sx={{ bgcolor: deepPurple[500], width: 35, height: 35, fontSize: '3rem' }} />
                                        <Typography variant="body1" sx={{ mx: 2, fontWeight: "bold" }}>
                                            {user.result?.name}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <LogoutRounded alt="Log Out" onClick={logout} />
                                    </MenuItem>
                                </>
                                : <MenuItem>
                                    <LoginRounded alt="Log In" onClick={() => navigate('/userAuth')} />
                                </MenuItem>}
                        </Box>
                    )}

                    {isMobile && (
                        <>
                            <Box sx={{ flexDirection: 'row', display: 'flex' }}>
                                <MenuItem>
                                    {user ? <Avatar src={user?.result?.profilePicture} onClick={() => navigate('/userProfile')} sx={{ bgcolor: deepPurple[500], width: 35, height: 35, fontSize: '3rem' }} />
                                        : <LoginRounded alt="Log In" onClick={() => navigate('/userAuth')} />}
                                </MenuItem>
                                <MenuItem onClick={() => setOpenDrawer(true)}>
                                    <MenuIcon />
                                </MenuItem>
                            </Box>



                            <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{ "& .MuiDrawer-paper": { backgroundColor: '#5A3E55', color: "#F8E8EE" } }}>
                                <List sx={{ width: 250 }}>
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/" onClick={() => setOpenDrawer(false)}>
                                            <HomeRounded sx={{ mr: 2 }} />
                                            <ListItemText primary="HOME" />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/services" onClick={() => setOpenDrawer(false)} sx={{ "&:hover": { backgroundColor: "#E8B4C1" } }}>
                                            <DesignServices sx={{ mr: 2 }} />
                                            <ListItemText primary="SERVICES" />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/" onClick={() => setOpenDrawer(false)}>
                                            <AccountCircleRounded sx={{ mr: 2 }} />
                                            <ListItemText primary="PROFILE" />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => {
                                            setOpenDrawer(false);
                                            if (user) {
                                                logout();
                                            } else {
                                                navigate('/userAuth');
                                            }
                                        }}>
                                            {user ? <>
                                                <LogoutRounded alt="Log Out" sx={{ mr: 2 }} />
                                                <ListItemText primary="LOGOUT" />
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

                </Container>
            </AppBar>
        </Box>
    )
}

export default Header;
