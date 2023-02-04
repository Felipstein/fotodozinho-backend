import { IProductCategory } from '../product-category/IProductCategory';

export interface IProduct {
  id: string;
  name: string;
  description: string | null;
  rated: number;
  price: number;
  category: IProductCategory;
}
