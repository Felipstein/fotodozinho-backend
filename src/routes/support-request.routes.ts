import { Router } from 'express';
import { supportRequestCreateFactory } from '../modules/support-request/create';
import { ensureAuth } from '../middlewares/ensureAuth';
import { ensureAdminUser } from '../middlewares/ensureAdminUser';
import { listSupportRequestsFactory } from '../modules/support-request/listAll';

const route = Router();

route.use(ensureAuth);

route.post('/request', (req, res) => {
  return supportRequestCreateFactory().controller.handle(req, res);
});

route.use(ensureAdminUser);

route.get('/', (req, res) => {
  return listSupportRequestsFactory().controller.handle(req, res);
});

export { route as supportRequestRoutes };
