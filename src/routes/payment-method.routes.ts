import { Router } from 'express';
import { listPaymentMethodsFactory } from '../modules/payment-method/listAll';

const route = Router();

route.get('/', (req, res) => {
  return listPaymentMethodsFactory().controller.handle(req, res);
});

export { route as paymentMethodRoutes };
