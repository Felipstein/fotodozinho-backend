import { ImageStoragedType } from '@prisma/client';

class ImageStoragedService {

  static isCorrectStorageTypeFormat(value: string) {
    return value.toUpperCase() in ImageStoragedType;
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

  static convertStorageTypePrismaFormat(storageType: string): ImageStoragedType {
    if(storageType.toLowerCase() === 'local') {
      return ImageStoragedType.LOCAL;
    }

    if(storageType.toLowerCase() === 's3') {
      return ImageStoragedType.S3;
    }
  }

}

enum StorageType  {
  LOCAL = 'local',
  S3 = 's3',
}

export { ImageStoragedService, StorageType };
