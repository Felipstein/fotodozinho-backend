import { Router } from 'express';
import { createPrintPriceFactory } from '../modules/print-price/create';

const route = Router();

route.post('/', (req, res) => {
  return createPrintPriceFactory().controller.handle(req, res);
});

export { route as printPriceRoutes };
