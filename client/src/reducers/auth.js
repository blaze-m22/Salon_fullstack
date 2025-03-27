import { ADMIN_AUTH, USER_AUTH, AUTH_ERROR, ADMIN_LOGOUT, USER_LOGOUT, UPDATE_USER, FETCH_USER } from "../constants/action_types";

const authReducer = (state = { authData: null, user: null, error: null }, action) => {
    switch (action.type) {
        case ADMIN_AUTH:
            localStorage.setItem('adminProfile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };

        case USER_AUTH:
            localStorage.setItem('userProfile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data, user: action?.data?.result, error: null };

        case UPDATE_USER:
            return { ...state, user: { ...state.user, ...action?.payload } };

        case FETCH_USER:
            console.log('Fetched User:', action?.payload);
            return { ...state, user: action?.payload };

        case AUTH_ERROR:
            return { ...state, error: action?.payload };

        case ADMIN_LOGOUT:
            localStorage.removeItem('adminProfile');
            return { ...state, authData: null };

        case USER_LOGOUT:
            localStorage.removeItem('userProfile');
            return { ...state, authData: null };

        default: return state;
    }
}

export default authReducer;