import { Router } from 'express';
import { createFailedImageUploadedFactory } from '../modules/failed-images-uploaded/create';
import { listFailedImagesUploadedFactory } from '../modules/failed-images-uploaded/listAll';
import { listFailedImageUploadedByKeyFactory } from '../modules/failed-images-uploaded/listByKey';

const route = Router();

route.get('/', (req, res) => {
  return listFailedImagesUploadedFactory().controller.handle(req, res);
});

route.get('/:key', (req, res) => {
  return listFailedImageUploadedByKeyFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createFailedImageUploadedFactory().controller.handle(req, res);
});

export { route as failedImageUploadedRoutes };
