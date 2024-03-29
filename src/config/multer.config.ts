import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import { BadRequestError } from '../errors/BadRequestError';
import { InternalServerError } from '../errors/InternalServerError';
import { S3ClientService } from '../services/s3';
import { EnvProvider } from '../services/env-provider';
import { ImageStoragedService } from '../services/image-storaged-type';

const localPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

function verifyAWSCredentials() {
  const { region, bucketName, accessKeyId, secretAccessKey } = EnvProvider.aws;

  return Boolean(region && bucketName && accessKeyId && secretAccessKey);
}

const hasAWSCredentials = verifyAWSCredentials();

export const s3ClientService = hasAWSCredentials ? new S3ClientService(
  EnvProvider.aws.region,
  EnvProvider.aws.accessKeyId,
  EnvProvider.aws.secretAccessKey,
) : null;

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

  s3: hasAWSCredentials ? multerS3({
    s3: s3ClientService.client,

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
  }) : null,
};

export default {
  dest: localPath,

  storage: storageType[ImageStoragedService.getCurrentStorageType() || 'local'],

  fileFilter(req, file, callback) {
    const mimeType = /image\/.+/;

    if(mimeType.test(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new BadRequestError('O arquivo enviado não é uma imagem'));
    }
  }
} as multer.Options;
