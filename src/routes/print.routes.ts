import { Request, Response, Router } from 'express';
import { ensureAdminUser } from '../middlewares/ensureAdminUser';
import { ensureAuth } from '../middlewares/ensureAuth';
import { imageDataTransform } from '../middlewares/imageDataTransform';
import { imageUploadCaptureError } from '../middlewares/imageUploadCaptureError';
import { createPrintFactory } from '../modules/print/create';
import { listPrintsFactory } from '../modules/print/listByProperties';
import { uploadProvider } from '../providers/Upload';

const route = Router();

route.get('/', ensureAuth, ensureAdminUser, (req, res) => {
  return listPrintsFactory().controller.handle(req, res);
});

route.post('/', , uploadProvider.uploadSingleFile('fileImage'), imageDataTransform, (req: Request, res: Response) => {
  return createPrintFactory().controller.handle(req, res);
}, imageUploadCaptureError);

export { route as printRoutes };
