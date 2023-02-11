import { Router } from 'express';
import { listShoppingCartByUserIdFactory } from '../modules/shopping-cart/listByUserId';
import { listShoppingCartProductFactory } from '../modules/shopping-cart/listShoppingCartProduct';

const route = Router();

route.get('/', (req, res) => {
  return listShoppingCartByUserIdFactory().controller.handle(req, res);
});

route.get('/:productId', (req, res) => {
  return listShoppingCartProductFactory().controller.handle(req, res);
});

export { route as shoppingCartRoutes };
