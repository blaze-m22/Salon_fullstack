import { combineReducers } from "redux";
import services from './services';
import authReducer from "./auth";
import feedbackReducer from "./feedback";

export default combineReducers({
    services, authReducer, feedbackReducer
});