import { Router } from 'express';
import { listPurchaseOrdersFactory } from '../modules/purchase-order/listAll';

const route = Router();

route.get('/', (req, res) => {
  return listPurchaseOrdersFactory().controller.handle(req, res);
});

export { route as purchaseOrderRoutes };
