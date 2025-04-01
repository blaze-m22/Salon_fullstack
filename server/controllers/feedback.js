import mongoose from "mongoose";
import GalleryModel from "../models/gallery_model.js";

export const getGallery = async (req, res) => {
    try {
        const gallery = await GalleryModel.find();

        console.log("Response received: ", gallery);

        res.status(200).json(gallery);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createGalleryItem = async (req, res) => {
    const galleryItem = req.body;

    console.log("Recieved data: ", galleryItem);

    const newGalleryItem = new GalleryModel({
        ...galleryItem, createdAt: new Date().toISOString()
    });

    try {
        await newGalleryItem.save();

        res.status(201).json(newGalleryItem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteGalleryItem = async (req, res) => {
    try {
        const { id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('No item with that id');
    
        await GalleryModel.findByIdAndDelete(id);
    
        res.json({ message: 'Item deleted successfully...' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item: ', error });
    }
}