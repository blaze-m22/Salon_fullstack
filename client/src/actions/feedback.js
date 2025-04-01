import * as api from "../api";
import { CREATE_GALLERY_ITEM, DELETE_GALLERY_ITEM, FETCH_GALLERY } from "../constants/action_types";

export const getGallery = () => async (dispatch) => {
    try {
        const { data } = await api.fetchGallery();

        dispatch({ type: FETCH_GALLERY, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createGalleryItem = (galleryItem) => async (dispatch) => {
    try {
        const { data } = await api.createGalleryItem(galleryItem);

        dispatch({ type: CREATE_GALLERY_ITEM, payload: data });
    } catch (error) {
        console.log("Create item error: ", error);
    }
}

export const deleteGalleryItem = (id) => async (dispatch) => {
    try {
        await api.deleteGalleryItem(id);
        dispatch({ type: DELETE_GALLERY_ITEM, payload: id });
    } catch (error) {
        console.log(error);
    }
}