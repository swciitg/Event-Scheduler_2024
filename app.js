import express from "express";
import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";

import eventRouter from "./routers/eventRouter.js";
import { NotFoundError } from "./errors/notFoundError.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { admin, adminRouter } from "./admin_panel/admin-config.js";

dotenv.config();

mongoose.set("strictQuery", false);

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use("/admin", adminRouter);

app.use(process.env.BASE_URL, eventRouter);

app.use("*",(req,res) => {
    throw new NotFoundError("Route not found");
});

app.use(errorHandler);

const PORT = process.env.PORT || 9010;

server.listen(PORT, () => {
    try {
        const mongoURL = process.env.MONGO_URI;
        mongoose.connect(mongoURL) 
            .then(() => {
                console.log("Connected to MongoDB");
            });
    } catch (e) {
        console.log(e);
    }
    console.log(`Server is running on port ${PORT}`);
});