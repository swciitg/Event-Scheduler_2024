import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

import porModel from "../models/porModel.js"; // Your mongoose model

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_PANEL_EMAIL,
  password: process.env.ADMIN_PANEL_PASSWORD
};

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return DEFAULT_ADMIN;
  }
  return null;
};

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const adminOptions = {
  resources: [
    porModel,
  ],
  rootPath: "/admin",
};

const admin = new AdminJS(adminOptions);

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate,
  cookieName: "adminjs",
  cookiePassword: "sessionsecret",
}, null, {
  resave: false,
  saveUninitialized: true,
  secret: "sessionsecret",
});

export { admin, adminRouter };