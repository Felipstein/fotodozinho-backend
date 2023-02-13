import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { InternalServerError } from '../errors/InternalServerError';
import { s3Client } from '../config/multer.config';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import EnvProvider from './EnvProvider';

export async function deleteLocalImage(key: string) {
  const image = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', key);

  if(!fs.existsSync(image)) {
    console.warn('Imagem não encontrada para deleção');
    throw new InternalServerError();
  }

  const unlink = promisify(fs.unlink);

  await unlink(image);
}

export async function deleteS3Image(key: string) {
  await s3Client.send(new DeleteObjectCommand({
    Bucket: EnvProvider.aws.bucketName,
    Key: key,
  }));
}
