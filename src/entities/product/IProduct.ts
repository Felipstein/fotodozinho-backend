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

  const storageTypeFormatted = storageType.toUpperCase().replace(' ', '_');

  // @ts-ignore
  return storageTypeFormatted;
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
