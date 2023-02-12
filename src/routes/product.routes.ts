import { Router } from 'express';
import { createProductFactory } from '../modules/product/create';
import { deleteProductFactory } from '../modules/product/delete';
import { listProductsFactory } from '../modules/product/listAll';
import { listProductByIdFactory } from '../modules/product/listById';
import { updateProductFactory } from '../modules/product/update';

const route = Router();

route.get('/', (req, res) => {
  return listProductsFactory().controller.handle(req, res);
});

route.get('/:id', (req, res) => {
  return listProductByIdFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createProductFactory().controller.handle(req, res);
});

route.put('/:id', (req, res) => {
  return updateProductFactory().controller.handle(req, res);
});

route.delete('/:id', (req, res) => {
  return deleteProductFactory().controller.handle(req, res);
});

export { route as productRoutes };
