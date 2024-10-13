import mongoose from "mongoose";

const porSchema = new mongoose.Schema({
    outlookEmail: { type: String, required: true },
    board: { type: String, required: true },
    position: { type: String, required: true },
});

const porModel = mongoose.model("por", porSchema);

export default porModel;