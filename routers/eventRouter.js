import express from "express";
import { EventControllers } from "../controllers/eventControllers.js";
import { getUserInfo,verifyUserInfo } from "../middlewares/getUserInfo.js";
import { validateEventPOR } from "../middlewares/validateEventPOR.js";

const eventRouter = express.Router();

eventRouter.get("/events",verifyUserInfo, EventControllers.getEvents);

eventRouter.get("/events/:id",verifyUserInfo, EventControllers.getEventById);

eventRouter.post("/events",getUserInfo,validateEventPOR, EventControllers.postEvent);

eventRouter.put("/events/:id",getUserInfo,validateEventPOR, EventControllers.updateEvent);

eventRouter.delete("/events/:id",getUserInfo,validateEventPOR, EventControllers.deleteEvent);

export default eventRouter;