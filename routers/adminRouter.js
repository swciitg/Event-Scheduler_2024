import express from "express";

import { adminRouter } from "../admin_panel/admin-config.js";

const adminRouterNew = express.Router();

adminRouterNew.use(`/admin`, adminRouter);

export default adminRouterNew;