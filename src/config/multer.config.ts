import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import { BadRequestError } from '../errors/BadRequestError';
import { InternalServerError } from '../errors/InternalServerError';
import EnvProvider from '../utils/EnvProvider';

const localPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

type StorageType = 'local' | 's3';

function checkStorageType(storageType: string): StorageType {
  if(['local', 's3'].includes(storageType)) {
    //@ts-ignore
    return storageType;
  }

  return null;
}

const storageType = {
  local: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, localPath);
    },

    filename(req, file, callback) {
      crypto.randomBytes(6, (err, hash) => {
        const time = Date.now();

        const fileName = `${time}-${hash.toString('hex')}_${file.originalname}`;

        if(err) {
          callback(new InternalServerError(), fileName);
        }

        callback(null, fileName);
      });
    }
  }),

  s3: {},
};

export default {
  dest: localPath,

  storage: storageType[checkStorageType(EnvProvider.storageType) || 'local'],

  fileFilter(req, file, callback) {
    const mimeType = /image\/.+/;

    if(mimeType.test(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new BadRequestError('O arquivo enviado não é uma imagem'));
    }
  }
} as multer.Options;
