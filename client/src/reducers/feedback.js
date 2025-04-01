import { CREATE_GALLERY_ITEM, DELETE_GALLERY_ITEM, FETCH_GALLERY } from "../constants/action_types";

export default (gallery = [], action) => {
    switch (action.type) {
        case FETCH_GALLERY: return action.payload;
        case CREATE_GALLERY_ITEM: return [...gallery, action.payload];
        case DELETE_GALLERY_ITEM:
            return gallery.filter((item) =>
                item._id !== action.payload);
        default: return gallery;
    }
}