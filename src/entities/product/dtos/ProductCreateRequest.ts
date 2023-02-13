import { StorageType } from '../../../services/image-storaged-type';

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
