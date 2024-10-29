import express from "express";
import {getAllPORs} from "../controllers/eventPorController.js";
import { verifyUserInfo } from "../middlewares/getUserInfo.js";

const eventPorRouter = express.Router();

// Routes
eventPorRouter.get("/por", verifyUserInfo, getAllPORs);

export default eventPorRouter;