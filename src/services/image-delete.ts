import { s3ClientService } from '../config/multer.config';
import { EnvProvider } from './env-provider';
import { StorageType } from './image-storaged-type';
import { LocalFileManagerService } from './local-image-manager';

class ImageDeleteService {

  static async deleteImage(key: string, storageType: StorageType) {

    if(storageType === 'local') {
      await LocalFileManagerService.deleteImage(key);
      return;
    }

    if(storageType === 's3') {
      await s3ClientService.deleteFile(EnvProvider.aws.bucketName, key);
      return;
    }

    throw new Error('Invalid storage type');
  }

}

export { ImageDeleteService };
