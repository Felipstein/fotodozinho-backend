import { PrintCreateRequest } from '../../entities/print-order/print/dtos/PrintCreateRequest';
import { IPrint } from '../../entities/print-order/print/IPrint';

export interface PrintsListProperties {
  printOrderId?: string;
  imageName?: string;
  imageUrl?: string;
  key?: string;
  colorId?: string;
  printPriceId?: string;
}

export interface IPrintsRepository {

  listManyByProperties({ printOrderId, imageName, imageUrl, key, colorId, printPriceId }: PrintsListProperties): Promise<IPrint[]>;

  listFirstByProperties({ printOrderId, imageName, imageUrl, key, colorId, printPriceId }: PrintsListProperties): Promise<IPrint>;

  create({ imageName, imageUrl, key, border, colorId, printPriceId, quantity, printOrderId }: PrintCreateRequest): Promise<IPrint>;

}
