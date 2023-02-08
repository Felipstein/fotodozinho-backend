import { Router } from 'express';
import { listProductsFactory } from '../modules/product';

const route = Router();

route.get('/', (req, res) => {
  return listProductsFactory().controller.handle(req, res);
});

export { route as productRoutes };
