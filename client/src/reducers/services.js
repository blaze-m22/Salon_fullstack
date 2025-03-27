import { CREATE, DELETE, FETCH_ALL, UPDATE } from "../constants/action_types";

export default (services = [], action) => {
    switch (action.type) {
        case FETCH_ALL: return action.payload;
        case CREATE: return [...services, action.payload];
        case UPDATE:
            return services.map((service) =>
                service._id === action.payload._id ?
                    action.payload : service);
        case DELETE:
            return services.filter((service) =>
                service._id !== action.payload);
        default: return services;
    }
}