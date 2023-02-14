import { Router } from 'express';
import { createFailedImageUploadedFactory } from '../modules/failed-images-uploaded/create';

const route = Router();

route.post('/', (req, res) => {
  return createFailedImageUploadedFactory().controller.handle(req, res);
});

export { route as failedImageUploadedRoutes };
