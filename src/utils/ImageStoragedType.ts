import { ImageStoragedTypeProduct } from '.prisma/client';

class ImageStoragedService {

  static isCorrectStorageTypeFormat(value: string) {
    return value.toUpperCase() in ImageStoragedTypeProduct;
  }

  static convertStorageTypeFormat(storageType: string): StorageType {
    if(storageType.toLowerCase() === 'local') {
      return StorageType.LOCAL;
    }

    if(storageType.toLowerCase() === 's3') {
      return StorageType.S3;
    }

    return null;
  }

}

enum StorageType  {
  LOCAL = 'local',
  S3 = 's3',
}

export { ImageStoragedService, StorageType };
