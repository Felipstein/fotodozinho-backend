import { StorageType } from '../../../config/multer.config';

export interface ProductCreateRequest {
  name: string;
  description?: string;
  price: number;
  imageName: string;
  imageUrl: string;
  key: string;
  imageStoragedType: StorageType;
  categoryId: string;
}
