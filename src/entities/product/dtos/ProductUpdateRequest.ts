import { StorageType } from '../../../services/image-storaged-type';

export interface ProductUpdateRequest {
  name?: string;
  description?: string | null;
  rated?: number;
  price?: number;
  imageName?: string;
  imageUrl?: string;
  key?: string;
  imageStoragedType?: StorageType;
  categoryId?: string;
}
