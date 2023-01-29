import { IColor } from '../../colors/IColor';
import { IPrintPrice } from '../../print-price/IPrintPrice';

export interface IPrint {
  id: string;
  imageName: string;
  imageUrl: string;
  key: string;
  printPrice: IPrintPrice;
  border: boolean;
  color: IColor;
  quantity: number;
  printOrderId: string;
}
