import mongoose from "mongoose";

import { definedCategories } from "../shared/constants.js";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageURL: { type: String },
    compressedImageURL: { type: String },
    description: { type: String },
    club_org: { type: String, required: true },
    board: { type: String, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    venue: { type: String },
    contactNumber: { type: String },
    // categories should be array of categories from shared/constants.js
    categories: { type: [String], required: true },

});

const eventModel = mongoose.model("event", eventSchema);

export default eventModel;