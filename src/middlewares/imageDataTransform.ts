import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { EnvProvider } from '../services/env-provider';

type MulterFullFile = Express.Multer.File & Express.MulterS3.File;

interface RequestWithFullFile {
  file: MulterFullFile;
}

export function imageDataTransform(req: Request & RequestWithFullFile, res: Response, next: NextFunction) {

  if(!req.file) {
    throw new BadRequestError('A imagem é obrigatória');
  }

  const { originalname: imageName, filename: keyLocal } = req.file;
  const { key: keyS3, location: imageUrlS3 } = req.file as unknown as { key: string, location: string };

  const key = keyS3 || keyLocal;
  const imageUrl = imageUrlS3 || `${EnvProvider.host}/images/${key}`;

  req.image = {
    imageName,
    imageUrl,
    key,
  };

  next();
}
