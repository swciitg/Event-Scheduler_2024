import porModel from "../models/porModel.js";

export const getAllPORs = async (req, res) => {
    try {
        const allPORs = await porModel.find();
        res.status(200).json(allPORs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};