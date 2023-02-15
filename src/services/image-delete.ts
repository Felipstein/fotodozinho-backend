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

  static async deleteImages(images: ({ key: string, storagedType: StorageType })[]) {
    const getKey = (image: any) => image.key;

    const localImages = images.filter(image => image.storagedType === 'local').map(getKey);
    const s3Images = images.filter(image => image.storagedType === 's3').map(getKey);

    await LocalFileManagerService.deleteImages(localImages);
    await s3ClientService.deleteFiles(EnvProvider.aws.bucketName, s3Images);
  }

}

export { ImageDeleteService };
