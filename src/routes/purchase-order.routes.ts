import { Router } from 'express';
import { listPurchaseOrdersFactory } from '../modules/purchase-order/listAll';
import { listPurchaseOrderByIdFactory } from '../modules/purchase-order/listById';
import { createPurchaseOrderFactory } from '../modules/purchase-order/create';
import { updatePurchaseOrderFactory } from '../modules/purchase-order/update';

const route = Router();

route.get('/', (req, res) => {
  return listPurchaseOrdersFactory().controller.handle(req, res);
});

route.get('/:id', (req, res) => {
  return listPurchaseOrderByIdFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createPurchaseOrderFactory().controller.handle(req, res);
});

route.put('/:id', (req, res) => {
  return updatePurchaseOrderFactory().controller.handle(req, res);
});

export { route as purchaseOrderRoutes };
