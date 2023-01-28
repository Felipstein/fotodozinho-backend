import { Router } from 'express';
import { createPrintPriceFactory } from '../modules/print-price/create';

const route = Router();

route.post('/', (req, res) => {
  createPrintPriceFactory().controller.handle(req, res);
});

export { route as printPriceRoutes };
