import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageURL: { type: String },
    compressedImageURL: { type: String },
    description: { type: String },
    club_org: { type: String, required: true },
    dateTime: { type: Date, required: true },
    venue: { type: String },
    contactNumber: { type: String },
});

const eventModel = mongoose.model("event", eventSchema);

export default eventModel;