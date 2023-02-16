import { Router } from 'express';
import { ensureAdminUser } from '../middlewares/ensureAdminUser';
import { ensureAuth } from '../middlewares/ensureAuth';
import { createPaymentMethodFactory } from '../modules/payment-method/create';
import { deletePaymentMethodFactory } from '../modules/payment-method/delete';
import { listPaymentMethodsFactory } from '../modules/payment-method/listAll';
import { listPaymentMethodByIdFactory } from '../modules/payment-method/listById';

const route = Router();

route.use(ensureAuth);

route.get('/', (req, res) => {
  return listPaymentMethodsFactory().controller.handle(req, res);
});

route.get('/:id', (req, res) => {
  return listPaymentMethodByIdFactory().controller.handle(req, res);
});

route.use(ensureAdminUser);

route.post('/', (req, res) => {
  return createPaymentMethodFactory().controller.handle(req, res);
});

route.delete('/:id', (req, res) => {
  return deletePaymentMethodFactory().controller.handle(req, res);
});

export { route as paymentMethodRoutes };
