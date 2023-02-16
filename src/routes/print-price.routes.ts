import { Router } from 'express';

import { createPrintPriceFactory } from '../modules/print-price/create';
import { listPrintPricesFactory } from '../modules/print-price/listAll';
import { listPrintPriceByLengthFactory } from '../modules/print-price/listByLength';
import { deletePrintPriceFactory } from '../modules/print-price/delete';
import { updatePricePrintPriceFactory } from '../modules/print-price/updatePrice';
import { ensureAuth } from '../middlewares/ensureAuth';
import { ensureAdminUser } from '../middlewares/ensureAdminUser';

const route = Router();

route.get('/', (req, res) => {
  return listPrintPricesFactory().controller.handle(req, res);
});


route.get('/:length', (req, res) => {
  return listPrintPriceByLengthFactory().controller.handle(req, res);
});

route.use(ensureAuth);

route.post('/', ensureAdminUser, (req, res) => {
  return createPrintPriceFactory().controller.handle(req, res);
});

route.patch('/:id', ensureAdminUser, (req, res) => {
  return updatePricePrintPriceFactory().controller.handle(req, res);
});

route.delete('/:id', ensureAdminUser, (req, res) => {
  return deletePrintPriceFactory().controller.handle(req, res);
});

export { route as printPriceRoutes };
