import mongoose from "mongoose";

const gallerySchema = mongoose.Schema({
    clientName: { type: String, trim: true },
    clientImage: { type: String, default: "" },
    createdAt: { type: Date, default: new Date() }
});

const GalleryModel = mongoose.model('GalleryModel', gallerySchema, "client_images");
export default GalleryModel;