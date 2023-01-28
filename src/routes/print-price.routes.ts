import { Router } from 'express';

import { createPrintPriceFactory } from '../modules/print-price/create';
import { listPrintPricesFactory } from '../modules/print-price/listAll';

const route = Router();

route.get('/', (req, res) => {
  return listPrintPricesFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createPrintPriceFactory().controller.handle(req, res);
});

export { route as printPriceRoutes };
