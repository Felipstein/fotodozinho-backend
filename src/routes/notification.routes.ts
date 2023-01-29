import { Router } from 'express';
import { createNotificationFactory } from '../modules/notification/create';
import { listAllNotificationsFactory } from '../modules/notification/listAll';
import { listNotificationByIdFactory } from '../modules/notification/listById';
import { listNotificationsByUserIdFactory } from '../modules/notification/listByUserId';

const route = Router();

route.get('/', (req, res) => {
  return listAllNotificationsFactory().controller.handle(req, res);
});

route.get('/id/:id', (req, res) => {
  return listNotificationByIdFactory().controller.handle(req, res);
});

route.get('/user/:userId', (req, res) => {
  return listNotificationsByUserIdFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createNotificationFactory().controller.handle(req, res);
});

export { route as notificationRoutes };
