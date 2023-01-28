import { Router } from 'express';
import { userRoutes } from './user.routes';
import { printPriceRoutes } from './print-price.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/print-prices', printPriceRoutes);

export { routes };
