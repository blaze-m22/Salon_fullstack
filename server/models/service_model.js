import mongoose from "mongoose"

const serviceSchema = mongoose.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, default: "" },
    price: { type: Number, min: 0 },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    duration: { type: Number, min: 0 },
    category: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
});

const ServiceModel = mongoose.model('ServiceModel', serviceSchema, "available_services");
export default ServiceModel;