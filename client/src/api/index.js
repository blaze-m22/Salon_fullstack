import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });

API.interceptors.request.use((req) => {
    const adminProfile = localStorage.getItem('adminProfile');
    const userProfile = localStorage.getItem('userProfile');

    if (adminProfile) {
        req.headers.Authorization = `Bearer ${JSON.parse(adminProfile).token}`;
    } else if (userProfile) {
        req.headers.Authorization = `Bearer ${JSON.parse(userProfile).token}`;
    }
    return req;
});

export const fetchServices = () => API.get('/services');
export const fetchService = (id) => API.get(`/services/${id}`);
export const createService = (newService) => API.post('/services', newService);
export const updateService = (id, updatedService) => API.patch(`/services/${id}`, updatedService);
export const deleteService = (id) => API.delete(`/services/${id}`);

export const adminSignIn = (formData) => API.post('/user/adminsignin', formData);
export const adminSignUp = (formData) => API.post('/user/adminsignup', formData);

export const getUser = (id) => API.get(`/user/${id}`);
export const userSignIn = (formData) => API.post('/user/usersignin', formData);
export const userSignUp = (formData) => API.post('/user/usersignup', formData);

export const updateUserProfile = (id, userData) => API.patch(`/user/${id}`, userData);
export const addToFavorites = (id) => API.patch(`/user/${id}/addToFavorites`);