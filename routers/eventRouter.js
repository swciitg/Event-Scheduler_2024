import express from "express";
import { EventController } from "../controllers/eventController.js";
import { getUserInfo, verifyUserInfo } from "../middlewares/getUserInfo.js";
import { validateEventPOR } from "../middlewares/validateEventPOR.js";
import { uploadAndParse } from "../middlewares/uploadMiddleware.js";

const eventRouter = express.Router();

// Routes
eventRouter.get("/", verifyUserInfo, EventController.getAllEvents);
eventRouter.post("/", getUserInfo, uploadAndParse, validateEventPOR, EventController.postEvent);

eventRouter.get("/categories", verifyUserInfo, EventController.getGroupedEvents);

eventRouter.get("/:id", verifyUserInfo, EventController.getEvent);
eventRouter.put("/:id", getUserInfo, uploadAndParse, EventController.editEvent);
eventRouter.delete("/:id", getUserInfo, EventController.deleteEvent);

export default eventRouter;