import { Router } from 'express';
import { listShoppingCartByUserIdFactory } from '../modules/shopping-cart/listByUserId';
import { listShoppingCartProductFactory } from '../modules/shopping-cart/listShoppingCartProduct';
import { addShoppingCartProductFactory } from '../modules/shopping-cart/addShoppingCartProduct';
import { deleteShoppingCartProductsFactory } from '../modules/shopping-cart/deleteShoppingCartProducts';
import { ensureAuth } from '../middlewares/ensureAuth';

const route = Router();

route.use(ensureAuth);

route.get('/', (req, res) => {
  return listShoppingCartByUserIdFactory().controller.handle(req, res);
});

route.get('/:productId', (req, res) => {
  return listShoppingCartProductFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return addShoppingCartProductFactory().controller.handle(req, res);
});

route.delete('/', (req, res) => {
  return deleteShoppingCartProductsFactory().controller.handle(req, res);
});

export { route as shoppingCartRoutes };
