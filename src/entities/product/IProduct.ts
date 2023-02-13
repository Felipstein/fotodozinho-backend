import { ImageStoragedTypeProduct } from '@prisma/client';
import { StorageType } from '../../config/multer.config';
import { IProductCategory } from '../product-category/IProductCategory';

export function isCorrectStorageTypeFormat(value: string) {
  return value.toUpperCase() in ImageStoragedTypeProduct;
}

export function convertStorageTypeFormat(storageType: string): StorageType {
  if(!isCorrectStorageTypeFormat(storageType)) {
    throw new TypeError();
  }

  const storageTypeFormatted = storageType.toLowerCase();

  // @ts-ignore
  return storageTypeFormatted;
}

export function convertStorageTypePrismaFormat(storageType: StorageType): ImageStoragedTypeProduct {
  if(storageType === 'local') {
    return 'LOCAL';
  } else {
    return 'S3';
  }
}

export interface IProduct {
  id: string;
  name: string;
  description: string | null;
  rated: number;
  price: number;
  imageName: string;
  imageUrl: string;
  key: string;
  imageStoragedType: StorageType;
  category: IProductCategory;
}
