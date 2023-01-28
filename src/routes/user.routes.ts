import { Router } from 'express';

import { listUsersFactory } from '../modules/user/listAll';
import { listUserByIdFactory } from '../modules/user/listById';
import { createUserFactory } from '../modules/user/create';
import { updateUserFactory } from '../modules/user/update';
import { deleteUserFactory } from '../modules/user/delete';
import { listUserByEmailFactory } from '../modules/user/listByEmail';

const route = Router();

route.get('/', (req, res) => {
  return listUsersFactory().controller.handle(req, res);
});

route.get('/id/:id', (req, res) => {
  return listUserByIdFactory().controller.handle(req, res);
});

route.get('/email/:email', (req, res) => {
  return listUserByEmailFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createUserFactory().controller.handle(req, res);
});

route.put('/:id', (req, res) => {
  return updateUserFactory().controller.handle(req, res);
});

route.delete('/:id', (req, res) => {
  return deleteUserFactory().controller.handle(req, res);
});

export { route as userRoutes };
