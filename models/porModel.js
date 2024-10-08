import mongoose from "mongoose";

const porSchema = new mongoose.Schema({
    rollNo: { type: String, required: true },
    club_org: { type: String, required: true },
    position: { type: String, required: true },
});

const porModel = mongoose.model("por", porSchema);

export default porModel;