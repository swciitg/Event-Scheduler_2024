import express from "express";
import { EventController } from "../controllers/eventController.js";
import { getUserInfo,verifyUserInfo } from "../middlewares/getUserInfo.js";
import { validateEventPOR } from "../middlewares/validateEventPOR.js";

const eventRouter = express.Router();

eventRouter.get("/events",verifyUserInfo, EventController.getAllEvents);
eventRouter.post("/events",getUserInfo,validateEventPOR, EventController.postEvent);

eventRouter.get("/events/event",verifyUserInfo, EventController.getEvent);
eventRouter.put("/events/event",getUserInfo,validateEventPOR, EventController.editEvent);
eventRouter.delete("/events/event",getUserInfo,validateEventPOR, EventController.deleteEvent);

export default eventRouter;