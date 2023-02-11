import { Router } from 'express';
import { listShoppingCartByUserIdFactory } from '../modules/shopping-cart/listByUserId';
import { listShoppingCartProductFactory } from '../modules/shopping-cart/listShoppingCartProduct';
import { addShoppingCartProductFactory } from '../modules/shopping-cart/addShoppingCartProduct';

const route = Router();

route.get('/', (req, res) => {
  return listShoppingCartByUserIdFactory().controller.handle(req, res);
});

route.get('/:productId', (req, res) => {
  return listShoppingCartProductFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return addShoppingCartProductFactory().controller.handle(req, res);
});

export { route as shoppingCartRoutes };
