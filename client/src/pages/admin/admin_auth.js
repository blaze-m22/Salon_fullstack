import React, { useEffect, useState } from "react";
import {
    Container, TextField, Button, Typography, Box,
    InputAdornment, IconButton, Paper, Alert, Snackbar
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Email, Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminSignIn, adminSignUp } from "../../actions/auth";

const AdminAuth = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [showError, setShowError] = useState(false);
    const authError = useSelector((state) => state.authReducer?.error);

    useEffect(() => {
        if (authError) {
            setShowError(true);
        }
    }, [authError]);

    const handleClose = () => setShowError(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", formData);

        if (isSignUp) {
            dispatch(adminSignUp(formData, navigate));
        } else {
            dispatch(adminSignIn(formData, navigate));
        }
    };

    const switchMode = () => {
        setIsSignUp(!isSignUp);
        setShowPassword(false);
        setFormData({ userName: "", email: "", password: "", confirmPassword: "" });
    }

    return (
        <>
            {showError && (
                <Snackbar
                    open={showError}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="error" onClose={() => setShowError(false)}>
                        {authError || "Something went wrong..."}
                    </Alert>
                </Snackbar>
            )}
            <Container maxWidth="xs">
                <Paper
                    elevation={6}
                    sx={{
                        padding: 4,
                        mt: 8,
                        borderRadius: 3,
                        textAlign: "center",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        {isSignUp ? "Sign Up" : "Login"}
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <TextField
                                fullWidth
                                label="Name"
                                name="userName"
                                type="text"
                                variant="outlined"
                                value={formData.userName}
                                onChange={handleChange}
                                margin="normal"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="primary" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {isSignUp && (
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                margin="normal"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
                        >
                            {isSignUp ? "Sign Up" : "Log In"}
                        </Button>
                    </form>

                    <Box mt={2} sx={{ cursor: "pointer" }} onClick={switchMode}>
                        <Typography variant="body2" color="text.primary">
                            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Create a new one"}
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default AdminAuth;
