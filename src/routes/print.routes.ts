import { NextFunction, Request, Response, Router } from 'express';
import { createFailedImageUploadedFactory } from '../modules/failed-images-uploaded/create';
import { createPrintFactory } from '../modules/print/create';
import { uploadProvider } from '../providers/Upload';
import { EnvProvider } from '../services/env-provider';
import { ImageStoragedService } from '../services/image-storaged-type';

const route = Router();

route.post('/', uploadProvider.uploadSingleFile('fileImage'), (req, res) => {
  return createPrintFactory().controller.handle(req, res);
}, (error: any, req: Request, res: Response, next: NextFunction) => {
  if(req.file) {
    const { filename: keyLocal } = req.file;
    const { key: keyS3 } = req.file as unknown as { key: string };

    const key = keyS3 || keyLocal;

    if(key) {
      createFailedImageUploadedFactory().useCases.execute({ key, storagedType: ImageStoragedService.convertStorageTypeFormat(EnvProvider.storageType) });
    }
  }

  throw error;
});

export { route as printRoutes };
