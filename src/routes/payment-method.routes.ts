import { Router } from 'express';
import { listPaymentMethodsFactory } from '../modules/payment-method/listAll';
import { listPaymentMethodByIdFactory } from '../modules/payment-method/listById';

const route = Router();

route.get('/', (req, res) => {
  return listPaymentMethodsFactory().controller.handle(req, res);
});

route.get('/:id', (req, res) => {
  return listPaymentMethodByIdFactory().controller.handle(req, res);
});

export { route as paymentMethodRoutes };
