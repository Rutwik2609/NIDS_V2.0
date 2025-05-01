import Feature from "../models/features.model.js";

export const resultController = async (req, res) => {
    try {
        const features = await Feature.find().sort({ createdAt: -1 });
        res.status(200).json(features);
    } catch (error) {
        console.log("Error in resultController Controller", error.message);
        res.status(400).json({ message: error.message });
    }
};