import mongoose from "mongoose";
import { definedBoards } from "../shared/constants.js";

const eventPorSchema = new mongoose.Schema(definedBoards.map((board) => {
    return {
        [`${board}`]: {
            'admins' : {
                type: [String],
            },
            'clubs_orgs' : {
                type: [String],
            },
        }
    };
}));

const eventPorModel = mongoose.model("eventPor", eventPorSchema);

export default eventPorModel;