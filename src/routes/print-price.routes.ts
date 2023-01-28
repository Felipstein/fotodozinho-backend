import { Router } from 'express';

import { createPrintPriceFactory } from '../modules/print-price/create';
import { listPrintPricesFactory } from '../modules/print-price/listAll';
import { listPrintPriceByLengthFactory } from '../modules/print-price/listByLength';

const route = Router();

route.get('/', (req, res) => {
  return listPrintPricesFactory().controller.handle(req, res);
});

route.get('/:length', (req, res) => {
  return listPrintPriceByLengthFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createPrintPriceFactory().controller.handle(req, res);
});

export { route as printPriceRoutes };
