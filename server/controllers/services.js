import mongoose from "mongoose";
import ServiceModel from "../models/service_model.js";
import CustomerModel from '../models/customer_model.js';

export const getServices = async (req, res) => {
    try {
        const services = await ServiceModel.find();

        console.log("Response received: ", services);

        res.status(200).json(services);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getService = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await ServiceModel.findById(id);

        console.log("Response received: ", service);

        res.status(200).json(service);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createService = async (req, res) => {
    const service = req.body;

    console.log("Recieved data: ", service);

    const newService = new ServiceModel({
        ...service, createdAt: new Date().toISOString()
    });

    try {
        await newService.save();

        res.status(201).json(newService);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateService = async (req, res) => {
    const { id: _id } = req.params;
    const service = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No service with that id');

    const updatedService = await ServiceModel.findByIdAndUpdate(_id, { ...service, _id }, { new: true });

    res.json(updatedService);
}

export const deleteService = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No service with that id');

    await ServiceModel.findByIdAndDelete(id);

    res.json({ message: 'Post deleted successfully' });
}

export const addToFavorites = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No service with id ${id}`);

    console.log("userId: ", req.userId);

    try {
        const user = await CustomerModel.findById(req.userId);

        if (!user) return res.status(404).json({ message: "user not found" });

        const index = user.favorites.findIndex((favId) => favId === String(id));

        if (index === -1) {
            user.favorites.push(id);
        } else {
            user.favorites = user.favorites.filter((favId) => favId !== String(id));
        }

        await user.save();

        res.json(user.favorites);
    } catch (error) {
        console.log("error in addToFavorites: ", error);
        res.status(500).json({ message: "what went wrong: " + error.message });
    }
}