import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

import { routes } from './routes/routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

export { app };
