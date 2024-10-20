import mongoose from "mongoose";
import { definedBoards } from "../shared/constants.js";

const porSchema = new mongoose.Schema(definedBoards.map((board) => {
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

const porModel = mongoose.model("por", porSchema);

export default porModel;