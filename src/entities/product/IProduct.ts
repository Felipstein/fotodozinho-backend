import { StorageType } from '../../services/image-storaged-type';
import { IProductCategory } from '../product-category/IProductCategory';

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
