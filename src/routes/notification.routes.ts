import { Router } from 'express';
import { createNotificationFactory } from '../modules/notification/create';
import { listAllNotificationsFactory } from '../modules/notification/listAll';
import { listNotificationByIdFactory } from '../modules/notification/listById';
import { listNotificationsByUserIdFactory } from '../modules/notification/listByUserId';
import { updateReadNotificationFactory } from '../modules/notification/updateRead';
import { deleteNotificationFactory } from '../modules/notification/delete';
import { ensureAuth } from '../middlewares/ensureAuth';
import { ensureAdminUser } from '../middlewares/ensureAdminUser';
import { ensureSelfAction } from '../middlewares/ensureSelfAction';

const route = Router();

route.use(ensureAuth);

route.get('/', ensureAdminUser, (req, res) => {
  return listAllNotificationsFactory().controller.handle(req, res);
});

route.get('/id/:id', ensureAdminUser, (req, res) => {
  return listNotificationByIdFactory().controller.handle(req, res);
});

route.get('/user/:userId', ensureSelfAction, (req, res) => {
  return listNotificationsByUserIdFactory().controller.handle(req, res);
});

route.post('/', ensureAdminUser, (req, res) => {
  return createNotificationFactory().controller.handle(req, res);
});

route.patch('/:id', ensureSelfAction, (req, res) => {
  return updateReadNotificationFactory().controller.handle(req, res);
});

route.delete('/:id', ensureAdminUser, (req, res) => {
  return deleteNotificationFactory().controller.handle(req, res);
});

export { route as notificationRoutes };
