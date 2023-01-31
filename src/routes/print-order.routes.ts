import { Router } from 'express';
import { createPrintOrderFactory } from '../modules/print-order/create';
import { listPrintOrdersFactory } from '../modules/print-order/listAll';

const route = Router();

route.get('/', (req, res) => {
  return listPrintOrdersFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createPrintOrderFactory().controller.handle(req, res);
});

export { route as printOrderRoutes };
