import { StorageType } from '../../../services/image-storaged-type';
import { IColor } from '../../colors/IColor';
import { IPrintPrice } from '../../print-price/IPrintPrice';

export interface IPrint {
  id: string;
  imageName: string;
  imageUrl: string;
  key: string;
  imageStoragedType: StorageType;
  printPrice: IPrintPrice;
  printPriceId: string;
  border: boolean;
  color: IColor;
  colorId: string;
  quantity: number;
  printOrderId: string;
}
