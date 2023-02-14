import { ImageStoragedType } from '@prisma/client';
import { EnvProvider } from './env-provider';

class ImageStoragedService {

  static getCurrentStorageType(): StorageType {
    const storageType = EnvProvider.storageType;

    return this.convertStorageTypeFormat(storageType);
  }

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
