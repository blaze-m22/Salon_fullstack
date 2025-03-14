import ServiceModel from "../models/service_model.js";

export const getServices = async (req, res) => {
    try {
        const serviceModels = await ServiceModel.find();
        
        res.status(200).json(serviceModels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createService = async (req, res) => {
    const service = req.body;

    console.log("Recieved data: ", service);

    const newService = new ServiceModel(service);

    try {
        await newService.save();

        res.status(201).json(newService);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}