import { NextFunction, Request, Response, Router } from 'express';
import { createProductFactory } from '../modules/product/create';
import { deleteProductFactory } from '../modules/product/delete';
import { listProductsFactory } from '../modules/product/listAll';
import { listProductByIdFactory } from '../modules/product/listById';
import { updateProductFactory } from '../modules/product/update';
import { uploadProvider } from '../providers/Upload';
import { createFailedImageUploadedFactory } from '../modules/failed-images-uploaded/create';
import { EnvProvider } from '../services/env-provider';
import { ImageStoragedService } from '../services/image-storaged-type';

const route = Router();

route.get('/', (req, res) => {
  return listProductsFactory().controller.handle(req, res);
});

route.get('/:id', (req, res) => {
  return listProductByIdFactory().controller.handle(req, res);
});

route.post('/', uploadProvider.uploadSingleFile('fileImage'), (req, res) => {
  return createProductFactory().controller.handle(req, res);
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

route.put('/:id', uploadProvider.uploadSingleFile('fileImage'), (req, res) => {
  return updateProductFactory().controller.handle(req, res);
});

route.delete('/:id', (req, res) => {
  return deleteProductFactory().controller.handle(req, res);
});

export { route as productRoutes };
