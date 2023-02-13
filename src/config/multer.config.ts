import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import { BadRequestError } from '../errors/BadRequestError';
import { InternalServerError } from '../errors/InternalServerError';

const localPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  dest: localPath,

  storage: multer.diskStorage({
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

  fileFilter(req, file, callback) {
    const mimeType = /image\/.+/;

    if(mimeType.test(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new BadRequestError('O arquivo enviado não é uma imagem'));
    }
  }
} as multer.Options;
