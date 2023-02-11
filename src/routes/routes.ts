import { Router } from 'express';

import { userRoutes } from './user.routes';
import { printPriceRoutes } from './print-price.routes';
import { colorRoutes } from './color.routes';
import { notificationRoutes } from './notification.routes';
import { printOrderRoutes } from './print-order.routes';
import { productCategoryRoutes } from './product-category.routes';
import { paymentMethodRoutes } from './payment-method.routes';
import { productRoutes } from './product.routes';
import { shoppingCartRoutes } from './shopping-cart.routes';
import { listShoppingCartsFactory } from '../modules/shopping-cart/listAll';
import { ensureShoppingCartUser } from '../middlewares/ensureShoppingCartUser';
import { currentShoppingCartsRepository, currentUsersRepository } from '../repositories';

const injectShoppingCart = ensureShoppingCartUser(currentShoppingCartsRepository, currentUsersRepository);

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/notifications', notificationRoutes);

routes.use('/print-prices', printPriceRoutes);
routes.use('/colors', colorRoutes);
routes.use('/print-orders', printOrderRoutes);

routes.use('/payment-methods', paymentMethodRoutes);

routes.use('/product-categories', productCategoryRoutes);
routes.use('/products', productRoutes);

routes.use('/users/:userId/shopping-carts', injectShoppingCart, shoppingCartRoutes);
routes.get('/shopping-carts', (req, res) => {
  return listShoppingCartsFactory().controller.handle(req, res);
});

export { routes };
