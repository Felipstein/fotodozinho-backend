import { Router } from 'express';

import { userRoutes } from './user.routes';
import { printPriceRoutes } from './print-price.routes';
import { colorRoutes } from './color.routes';
import { notificationRoutes } from './notification.routes';
import { printOrderRoutes } from './print-order.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/print-prices', printPriceRoutes);
routes.use('/colors', colorRoutes);
routes.use('/notifications', notificationRoutes);
routes.use('/print-orders', printOrderRoutes);

export { routes };
