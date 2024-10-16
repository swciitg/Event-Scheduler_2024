import express from 'express';
import swaggerUi from 'swagger-ui-express';

import apiDocs from '../docs/apiDocs.js';

const docsRouter = express.Router();

docsRouter.use(`/docs`, swaggerUi.serve, swaggerUi.setup(apiDocs));

export default docsRouter;