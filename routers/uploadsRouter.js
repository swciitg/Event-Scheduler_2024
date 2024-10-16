import express from 'express';
import path from 'path';

const uploadsRouter = express.Router();

uploadsRouter.use(`/uploads`, express.static(path.resolve('uploads')));

export default uploadsRouter;