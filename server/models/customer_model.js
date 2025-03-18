import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
    },
    favorites: {
        type: [String],
        default: []
    },
    profilePicture: {
        type: String
    },
    location: {
        type: String
    }
});

const CustomerModel = mongoose.model('CustomerModel', customerSchema, "customers");

export default CustomerModel;