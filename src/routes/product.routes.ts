import { Router } from 'express';
import { listProductsFactory } from '../modules/product/listAll';
import { listProductByIdFactory } from '../modules/product/listById';

const route = Router();

route.get('/', (req, res) => {
  return listProductsFactory().controller.handle(req, res);
});

route.get('/:id', (req, res) => {
  return listProductByIdFactory().controller.handle(req, res);
});

export { route as productRoutes };
