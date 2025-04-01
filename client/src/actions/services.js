import * as api from "../api";
import { AUTH_ERROR, CREATE, DELETE, FETCH_ALL, FETCH_SERVICE, UPDATE, UPDATE_USER } from "../constants/action_types";

export const getServices = () => async (dispatch) => {
    try {
        const { data } = await api.fetchServices();

        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        dispatch({ type: FETCH_ALL, payload: sortedData });
    } catch (error) {
        console.log(error.message);
    }
}

export const getService = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchService(id);

        console.log("Fetched service:", data);

        dispatch({ type: FETCH_SERVICE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createService = (service) => async (dispatch) => {
    try {
        const { data } = await api.createService(service);

        dispatch({ type: CREATE, payload: data });
        // return { success: true, message: "Created Service!" };
    } catch (error) {
        console.log("Create service error: ", error);
        // return { success: false, message: "Failed to create service, Please try again later." };
    }
}

export const updateService = (id, service) => async (dispatch) => {
    try {
        const { data } = await api.updateService(id, service);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log("Update service error: ", error);
    }
}

export const deleteService = (id) => async (dispatch) => {
    try {
        await api.deleteService(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const addtoFavorites = (id) => async (dispatch) => {
    try {
        console.log("favorites action triggered with id: ", id);
        const { data } = await api.addToFavorites(id);
        dispatch({ type: UPDATE, payload: data });

        console.log("action response: ", data);
        return data;
    } catch (error) {
        const errorMessage = error.response?.data.message || "something went wrong..."

        dispatch({ type: AUTH_ERROR, payload: errorMessage });

        console.log("addtoFavorites error : ", errorMessage);

        console.log(error);
    }
}