import { Router } from 'express';
import { createProductCategoryFactory } from '../modules/product-category/create';
import { listProductCategoriesFactory } from '../modules/product-category/listAll';
import { listProductCategoryByIdFactory } from '../modules/product-category/listById';
import { deleteProductCategoryFactory } from '../modules/product-category/delete';
import { ensureAuth } from '../middlewares/ensureAuth';
import { ensureAdminUser } from '../middlewares/ensureAdminUser';

const route = Router();

route.use(ensureAuth);

route.get('/', (req, res) => {
  return listProductCategoriesFactory().controller.handle(req, res);
});

route.get('/:id', (req, res) => {
  return listProductCategoryByIdFactory().controller.handle(req, res);
});

route.use(ensureAdminUser);

route.post('/', (req, res) => {
  return createProductCategoryFactory().controller.handle(req, res);
});

route.delete('/:id', (req, res) => {
  return deleteProductCategoryFactory().controller.handle(req, res);
});

export { route as productCategoryRoutes };
