import { Router } from 'express';
import { createProductCategoryFactory } from '../modules/product-category/create';

const route = Router();

route.post('/', (req, res) => {
  return createProductCategoryFactory().controller.handle(req, res);
});

export { route as productCategoryRoutes };
