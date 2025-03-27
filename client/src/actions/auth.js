import * as api from "../api";
import { ADMIN_AUTH, AUTH_ERROR, FETCH_USER, UPDATE, UPDATE_USER, USER_AUTH } from "../constants/action_types";

export const getUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUser(id);
        dispatch({ type: FETCH_USER, payload: data });
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.message });
        console.error('Error fetching user:', error);
    }
};

export const adminSignIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.adminSignIn(formData);

        dispatch({ type: ADMIN_AUTH, data });

        navigate('/servicesAdmin');
    } catch (error) {
        const errorMessage = error.response?.data.message || "something went wrong..."

        dispatch({ type: AUTH_ERROR, payload: errorMessage });

        console.log("error : ", errorMessage);
    }
}

export const adminSignUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.adminSignUp(formData);

        dispatch({ type: ADMIN_AUTH, data });
        navigate('/servicesAdmin');
    } catch (error) {
        const errorMessage = error.response?.data.message || "something went wrong..."

        dispatch({ type: AUTH_ERROR, payload: errorMessage });

        console.log("error : ", errorMessage);
    }
}

export const userSignIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.userSignIn(formData);

        dispatch({ type: USER_AUTH, data });

        navigate('/');
    } catch (error) {
        const errorMessage = error.response?.data.message || "something went wrong..."

        dispatch({ type: AUTH_ERROR, payload: errorMessage });

        console.log("error : ", errorMessage);
    }
}

export const userSignUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.userSignUp(formData);

        dispatch({ type: USER_AUTH, data });
        navigate('/');
    } catch (error) {
        const errorMessage = error.response?.data.message || "something went wrong..."

        dispatch({ type: AUTH_ERROR, payload: errorMessage });

        console.log("error : ", errorMessage);
    }
}

export const updateUserProfile = (id, userData) => async (dispatch) => {
    try {
        const { data } = await api.updateUserProfile(id, userData);

        dispatch({ type: UPDATE, payload: data });

        const existingUser = JSON.parse(localStorage.getItem('userProfile'));
        localStorage.setItem('userProfile', JSON.stringify({ ...existingUser, result: data }));

    } catch (error) {
        const errorMessage = error.response?.data.message || "something went wrong..."

        dispatch({ type: AUTH_ERROR, payload: errorMessage });

        console.log("updateUserProfile error : ", errorMessage);
    }
}