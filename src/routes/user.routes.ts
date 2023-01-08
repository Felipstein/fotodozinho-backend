import { Router } from 'express';

import { listUsersFactory } from '../modules/user/listAll';

const route = Router();

route.get('/users', (req, res) => {
  return listUsersFactory().controller.handle(req, res);
});

export { route as userRoutes };
