import express from "express";
import {getAllPORs} from "../controllers/porController.js";
import { verifyUserInfo } from "../middlewares/getUserInfo.js";

const porRouter = express.Router();

// Routes
porRouter.get("/por", verifyUserInfo, getAllPORs);

export default porRouter;