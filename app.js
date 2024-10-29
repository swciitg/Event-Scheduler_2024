import express from "express";
import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import path from "path";
import cron from "node-cron";

// docs
// import swaggerUi from "swagger-ui-express";
// import apiDocs from "./docs/apiDocs.js";

import eventRouter from "./routers/eventRouter.js";
import eventPorRouter from "./routers/eventPorRouter.js";
import adminRouter from "./routers/adminRouter.js";
import docsRouter from "./routers/docsRouter.js";
import uploadsRouter from "./routers/uploadsRouter.js";

import { NotFoundError } from "./errors/notFoundError.js";
import { errorHandler } from "./middlewares/errorHandler.js";
// import { admin, adminRouter } from "./admin_panel/admin-config.js";

import { EventController } from "./controllers/eventController.js";

dotenv.config();
const __dirname = path.resolve();

mongoose.set("strictQuery", false);

const app = express();
const server = http.createServer(app);

// app.use(`${process.env.BASE_URL}/admin`, adminRouter);
app.use(process.env.BASE_URL, adminRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(process.env.BASE_URL, uploadsRouter);

// log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// app.use(`${process.env.BASE_URL}/docs`, swaggerUi.serve, swaggerUi.setup(apiDocs));
app.use(process.env.BASE_URL, docsRouter);

app.use(process.env.BASE_URL, eventPorRouter);
app.use(process.env.BASE_URL, eventRouter);

app.use("*",(req,res) => {
    throw new NotFoundError("Route not found");
});

app.use(errorHandler);

const PORT = process.env.PORT || 9010;

// run cron job to delete expired events every day at 11:59 PM IST
try {
    cron.schedule("59 23 * * *", async () => {
        console.log("Running cron job to delete expired events");
        await EventController.deleteExpiredEvents()
                .then((result) => {
                    console.log("Expired events deleted");
                })
                .catch((err) => {
                    console.log("Error deleting expired events");
                    console.log(err);
                });
    // }
    }, {
        timezone: "Asia/Kolkata"
    }
    );
}
catch (e) {
    console.log("Error running cron job");
    console.log(e);
}

server.listen(PORT, () => {
    try {
        const mongoURL = process.env.MONGO_URI;
        mongoose.connect(mongoURL) 
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((err) => {
                console.log("Error connecting to MongoDB");
                console.log(err);
            });   
    } catch (e) {
        console.log(e);
    }
    console.log(`Server is running on port ${PORT}`);
});