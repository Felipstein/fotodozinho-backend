import { Router } from 'express';
import { createNotificationFactory } from '../modules/notification/create';
import { listAllNotificationsFactory } from '../modules/notification/listAll';

const route = Router();

route.get('/', (req, res) => {
  return listAllNotificationsFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createNotificationFactory().controller.handle(req, res);
});

export { route as notificationRoutes };
