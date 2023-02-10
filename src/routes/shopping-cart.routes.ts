import { Router } from 'express';
import { ListShoppingCartByUserIdFactory } from '../modules/shopping-cart/listByUserId';

const route = Router();

route.get('/', (req, res) => {
  // @ts-ignore
  req.params.userId = req.userId;

  return ListShoppingCartByUserIdFactory().controller.handle(req, res);
});

export { route as shoppingCartRoutes };
