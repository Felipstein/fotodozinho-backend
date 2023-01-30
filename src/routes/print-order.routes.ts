import { Router } from 'express';
import { createPrintOrderFactory } from '../modules/print-order/create';

const route = Router();

route.post('/', (req, res) => {
  return createPrintOrderFactory().controller.handle(req, res);
});

export { route as printOrderRoutes };
