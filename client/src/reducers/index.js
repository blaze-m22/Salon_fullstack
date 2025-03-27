import { combineReducers } from "redux";
import services from './services';
import authReducer from "./auth";

export default combineReducers({
    services, authReducer
});