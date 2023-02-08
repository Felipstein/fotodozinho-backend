import { Router } from 'express';
import { deleteProductFactory } from '../modules/product/delete';
import { listProductsFactory } from '../modules/product/listAll';
import { listProductByIdFactory } from '../modules/product/listById';

const route = Router();

route.get('/', (req, res) => {
  return listProductsFactory().controller.handle(req, res);
});

route.get('/:id', (req, res) => {
  return listProductByIdFactory().controller.handle(req, res);
});

route.delete('/:id', (req, res) => {
  return deleteProductFactory().controller.handle(req, res);
});

export { route as productRoutes };
