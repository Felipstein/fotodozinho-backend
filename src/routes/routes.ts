import { Router } from 'express';

import { userRoutes } from './user.routes';
import { printPriceRoutes } from './print-price.routes';
import { colorRoutes } from './color.routes';
import { notificationRoutes } from './notification.routes';
import { printOrderRoutes } from './print-order.routes';
import { productCategoryRoutes } from './product-category.routes';
import { paymentMethodRoutes } from './payment-method.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/print-prices', printPriceRoutes);
routes.use('/colors', colorRoutes);
routes.use('/notifications', notificationRoutes);
routes.use('/print-orders', printOrderRoutes);
routes.use('/product-categories', productCategoryRoutes);
routes.use('/payment-methods', paymentMethodRoutes);

export { routes };
