import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { BadRequestError } from '../errors/BadRequestError';
import { InternalServerError } from '../errors/InternalServerError';
import EnvProvider from '../utils/EnvProvider';
import { ImageStoragedService } from '../utils/ImageStoragedType';

const localPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export const s3Client = new S3Client({
  region: EnvProvider.aws.region,
  credentials: {
    accessKeyId: EnvProvider.aws.accessKeyId,
    secretAccessKey: EnvProvider.aws.secretAccessKey,
  },
});

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

  s3: multerS3({
    s3: s3Client,

    bucket: EnvProvider.aws.bucketName,

    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',

    key(req, file, callback) {
      crypto.randomBytes(6, (err, hash) => {
        const time = Date.now();

        const fileName = `${time}-${hash.toString('hex')}_${file.originalname}`;

        if(err) {
          callback(new InternalServerError(), fileName);
        }

        callback(null, fileName);
      });
    },
  }),
};

export default {
  dest: localPath,

  storage: storageType[ImageStoragedService.convertStorageTypeFormat(EnvProvider.storageType) || 'local'],

  fileFilter(req, file, callback) {
    const mimeType = /image\/.+/;

    if(mimeType.test(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new BadRequestError('O arquivo enviado não é uma imagem'));
    }
  }
} as multer.Options;
