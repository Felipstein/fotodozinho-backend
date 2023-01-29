import { Router } from 'express';
import { createNotificationFactory } from '../modules/notification/create';

const route = Router();

route.post('/', (req, res) => {
  return createNotificationFactory().controller.handle(req, res);
});

export { route as notificationRoutes };
