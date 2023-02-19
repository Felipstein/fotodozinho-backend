import { StorageType } from '../../../../services/image-storaged-type';

export interface PrintCreateRequest {
  imageName: string;
  imageUrl: string;
  key: string;
  imageStoragedType: StorageType;
  printPriceId: string;
  border: boolean;
  colorId: string;
  quantity: number;
}
