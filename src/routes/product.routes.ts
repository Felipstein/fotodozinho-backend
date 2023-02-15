import { Request, Response, Router } from 'express';
import { createProductFactory } from '../modules/product/create';
import { deleteProductFactory } from '../modules/product/delete';
import { listProductsFactory } from '../modules/product/listAll';
import { listProductByIdFactory } from '../modules/product/listById';
import { updateProductFactory } from '../modules/product/update';
import { uploadProvider } from '../providers/Upload';
import { imageUploadCaptureError } from '../middlewares/imageUploadCaptureError';

const route = Router();

route.get('/', (req, res) => {
  return listProductsFactory().controller.handle(req, res);
});

route.get('/:id', (req, res) => {
  return listProductByIdFactory().controller.handle(req, res);
});

route.post('/', uploadProvider.uploadSingleFile('fileImage'), (req: Request, res: Response) => {
  return createProductFactory().controller.handle(req, res);
}, imageUploadCaptureError);

route.put('/:id', uploadProvider.uploadSingleFile('fileImage'), (req, res) => {
  return updateProductFactory().controller.handle(req, res);
});

route.delete('/:id', (req, res) => {
  return deleteProductFactory().controller.handle(req, res);
});

export { route as productRoutes };
