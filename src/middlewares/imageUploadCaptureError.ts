import { NextFunction, Request, Response } from 'express';
import { createFailedImageUploadedFactory } from '../modules/failed-images-uploaded/create';
import { ImageStoragedService } from '../services/image-storaged-type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function imageUploadCaptureError(error: any, req: Request, res: Response, next: NextFunction) {
  if(req.file) {
    const { filename: keyLocal } = req.file;
    const { key: keyS3 } = req.file as unknown as { key: string };

    const key = keyS3 || keyLocal;

    if(key) {
      createFailedImageUploadedFactory().useCases.execute({ key, storagedType: ImageStoragedService.getCurrentStorageType() });
    }
  }

  throw error;
}
