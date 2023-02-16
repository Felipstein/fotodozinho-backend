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
import { currentRevokedTokensRepository, currentShoppingCartsRepository, currentUsersRepository } from '../repositories';
import { purchaseOrderRoutes } from './purchase-order.routes';
import { failedImageUploadedRoutes } from './failed-image-uploaded.routes';
import { printRoutes } from './print.routes';
import { authRoutes } from './auth.routes';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { BadRequestError } from '../errors/BadRequestError';
import { InvalidTokenError } from '../errors/InvalidTokenError';
import { tokenProvider } from '../providers/Token';
import { RevokedTokenError } from '../errors/RevokedTokenError';

const injectUserId = ensureShoppingCartUser(currentShoppingCartsRepository, currentUsersRepository);

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/notifications', notificationRoutes);

routes.use('/auth', authRoutes);

routes.use('/print-prices', printPriceRoutes);
routes.use('/colors', colorRoutes);
routes.use('/prints', printRoutes);
routes.use('/print-orders', printOrderRoutes);

routes.use('/payment-methods', paymentMethodRoutes);

routes.use('/product-categories', productCategoryRoutes);
routes.use('/products', productRoutes);

routes.use('/users/:userId/shopping-carts', injectUserId, shoppingCartRoutes);
routes.get('/shopping-carts', (req, res) => {
  return listShoppingCartsFactory().controller.handle(req, res);
});

routes.use('/purchase-orders', purchaseOrderRoutes);

routes.use('/failed-images-uploaded', failedImageUploadedRoutes);

routes.get('/test', async (req, res) => {

  const authorization = req.headers.authorization;
  if(!authorization) {
    throw new UnauthorizedError();
  }

  if(typeof authorization !== 'string') {
    throw new UnauthorizedError();
  }

  const [bearer, token] = authorization.split(' ');

  if(bearer !== 'Bearer') {
    throw new InvalidTokenError();
  }

  await tokenProvider.verify(token);

  return res.sendStatus(200);
});

export { routes };
