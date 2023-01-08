import { Router } from 'express';

import { listUsersFactory } from '../modules/user/listAll';
import { listUserByIdFactory } from '../modules/user/listById';

const route = Router();

route.get('/', (req, res) => {
  return listUsersFactory().controller.handle(req, res);
});

route.get('/id/:id', (req, res) => {
  return listUserByIdFactory().controller.handle(req, res);
});

export { route as userRoutes };
