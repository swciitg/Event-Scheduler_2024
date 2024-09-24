import express from "express";
import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import eventRouter from "./routers/eventRouter";

mongoose.set("strictQuery", false);

const app = express();
const server = http.createServer(app);

app.use(process.env.BASE_URL, eventRouter);

app.use("*",(req,res) => {
    throw new NotFoundError("Route not found");
});

app.use(errorHandler);

const PORT = process.env.PORT || 9010;

server.listen(PORT, () => {
    try {
        mongoose.connect(process.env.DATABASE_URI + '/' + process.env.DATABASE_NAME);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.log(e);
    }
    console.log(`Server is running on port ${PORT}`);
});