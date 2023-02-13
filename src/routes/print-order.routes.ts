import { Router } from 'express';
import { createPrintOrderFactory } from '../modules/print-order/create';
import { deletePrintOrderFactory } from '../modules/print-order/delete';
import { listPrintOrdersFactory } from '../modules/print-order/listAll';
import { listPrintOrderByIdFactory } from '../modules/print-order/listById';
import { listPrintOrdersByUserIdFactory } from '../modules/print-order/listByUserId';
import { listPrintOrdersByUserIdStatusFactory } from '../modules/print-order/listByUserIdStatus';
import { updatePrintOrderStatusFactory } from '../modules/print-order/updateStatus';
import { uploadProvider } from '../providers/Upload';

const route = Router();

route.get('/', (req, res) => {
  return listPrintOrdersFactory().controller.handle(req, res);
});

route.get('/id/:id', (req, res) => {
  return listPrintOrderByIdFactory().controller.handle(req, res);
});

route.get('/user/:userId', (req, res) => {
  return listPrintOrdersByUserIdFactory().controller.handle(req, res);
});

route.get('/user/:userId/:status', (req, res) => {
  return listPrintOrdersByUserIdStatusFactory().controller.handle(req, res);
});

route.post('/', uploadProvider.uploadMultiFiles('images'), (req, res) => {
  return createPrintOrderFactory().controller.handle(req, res);
});

route.patch('/:id', (req, res) => {
  return updatePrintOrderStatusFactory().controller.handle(req, res);
});

route.delete('/:id', (req, res) => {
  return deletePrintOrderFactory().controller.handle(req, res);
});

export { route as printOrderRoutes };
