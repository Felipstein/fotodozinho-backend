import { Router } from 'express';
import { listPurchaseOrdersFactory } from '../modules/purchase-order/listAll';
import { listPurchaseOrderByIdFactory } from '../modules/purchase-order/listById';

const route = Router();

route.get('/', (req, res) => {
  return listPurchaseOrdersFactory().controller.handle(req, res);
});

route.get('/:id', (req, res) => {
  return listPurchaseOrderByIdFactory().controller.handle(req, res);
});

export { route as purchaseOrderRoutes };
