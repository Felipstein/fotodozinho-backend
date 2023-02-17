import { Router } from 'express';
import { ensureAdminUser } from '../middlewares/ensureAdminUser';
import { ensureAuth } from '../middlewares/ensureAuth';
import { ensureSelfAction } from '../middlewares/ensureSelfAction';
import { createPrintOrderFactory } from '../modules/print-order/create';
import { deletePrintOrderFactory } from '../modules/print-order/delete';
import { listPrintOrdersFactory } from '../modules/print-order/listAll';
import { listPrintOrderByIdFactory } from '../modules/print-order/listById';
import { listPrintOrdersByUserIdFactory } from '../modules/print-order/listByUserId';
import { listPrintOrdersByUserIdStatusFactory } from '../modules/print-order/listByUserIdStatus';
import { updatePrintOrderStatusFactory } from '../modules/print-order/updateStatus';

const route = Router();

route.use(ensureAuth);

route.get('/', ensureAdminUser, (req, res) => {
  return listPrintOrdersFactory().controller.handle(req, res);
});

route.get('/id/:id', ensureAdminUser, (req, res) => {
  return listPrintOrderByIdFactory().controller.handle(req, res);
});

route.get('/user/:userId', ensureSelfAction, (req, res) => {
  return listPrintOrdersByUserIdFactory().controller.handle(req, res);
});

route.get('/user/:userId/:status', ensureSelfAction, (req, res) => {
  return listPrintOrdersByUserIdStatusFactory().controller.handle(req, res);
});

route.post('/', ensureSelfAction('body'), (req, res) => {
  return createPrintOrderFactory().controller.handle(req, res);
});

route.patch('/:id', ensureAdminUser, (req, res) => {
  return updatePrintOrderStatusFactory().controller.handle(req, res);
});

route.delete('/:id', (req, res) => {
  return deletePrintOrderFactory().controller.handle(req, res);
});

export { route as printOrderRoutes };
