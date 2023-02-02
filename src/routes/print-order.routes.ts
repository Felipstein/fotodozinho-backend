import { Router } from 'express';
import { createPrintOrderFactory } from '../modules/print-order/create';
import { listPrintOrdersFactory } from '../modules/print-order/listAll';
import { listPrintOrderByIdFactory } from '../modules/print-order/listById';

const route = Router();

route.get('/', (req, res) => {
  return listPrintOrdersFactory().controller.handle(req, res);
});

route.get('/id/:id', (req, res) => {
  return listPrintOrderByIdFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createPrintOrderFactory().controller.handle(req, res);
});

export { route as printOrderRoutes };
