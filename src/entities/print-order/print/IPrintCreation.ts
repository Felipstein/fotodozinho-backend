import { IColor } from '../../colors/IColor';
import { IPrintPrice } from '../../print-price/IPrintPrice';

export interface IPrintCreation {
  imageName: string;
  imageUrl: string;
  key: string;
  printPrice: IPrintPrice;
  printPriceId: string;
  border: boolean;
  color: IColor;
  colorId: string;
  quantity: number;
}
