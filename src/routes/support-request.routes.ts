import { Router } from 'express';
import { supportRequestCreateFactory } from '../modules/support-request/create';
import { ensureAuth } from '../middlewares/ensureAuth';

const route = Router();

route.use(ensureAuth);

route.post('/request', (req, res) => {
  return supportRequestCreateFactory().controller.handle(req, res);
});

export { route as supportRequestRoutes };
