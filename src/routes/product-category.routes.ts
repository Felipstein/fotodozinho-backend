import { Router } from 'express';
import { createProductCategoryFactory } from '../modules/product-category/create';
import { listProductCategoriesFactory } from '../modules/product-category/listAll';

const route = Router();

route.get('/', (req, res) => {
  return listProductCategoriesFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createProductCategoryFactory().controller.handle(req, res);
});

export { route as productCategoryRoutes };
