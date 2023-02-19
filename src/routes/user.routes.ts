import { Router } from 'express';

import { listUsersFactory } from '../modules/user/listAll';
import { listUserByIdFactory } from '../modules/user/listById';
import { createUserFactory } from '../modules/user/create';
import { updateUserFactory } from '../modules/user/update';
import { deleteUserFactory } from '../modules/user/delete';
import { listUserByEmailFactory } from '../modules/user/listByEmail';
import { ensureAuth } from '../middlewares/ensureAuth';
import { ensureAdminUser } from '../middlewares/ensureAdminUser';
import { ensureSelfAction } from '../middlewares/ensureSelfAction';
import { listInactiveUsersFactory } from '../modules/user/listInactives';
import { listDeletedUsersFactory } from '../modules/user/listDeletedUsers';

const route = Router();

route.use(ensureAuth);

route.get('/', ensureAdminUser, (req, res) => {
  return listUsersFactory().controller.handle(req, res);
});

route.get('/inactive', ensureAdminUser, (req, res) => {
  return listInactiveUsersFactory().controller.handle(req, res);
});

route.get('/id/:id', ensureSelfAction('params', { fieldUserIdName: 'id' }), (req, res) => {
  return listUserByIdFactory().controller.handle(req, res);
});

route.get('/email/:email', (req, res) => {
  return listUserByEmailFactory().controller.handle(req, res);
});

route.get('/deleted', ensureAdminUser, (req, res) => {
  return listDeletedUsersFactory().controller.handle(req, res);
});

route.post('/', ensureAdminUser, (req, res) => {
  return createUserFactory().controller.handle(req, res);
});

route.put('/:id', ensureSelfAction('params', { fieldUserIdName: 'id' }), (req, res) => {
  return updateUserFactory().controller.handle(req, res);
});

route.delete('/:id', ensureAdminUser, (req, res) => {
  return deleteUserFactory().controller.handle(req, res);
});

export { route as userRoutes };
