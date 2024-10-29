import eventPorModel from "../models/eventPorModel.js";

export const getAllPORs = async (req, res) => {
    try {
        const allPORs = await eventPorModel.find();
        res.status(200).json(allPORs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};