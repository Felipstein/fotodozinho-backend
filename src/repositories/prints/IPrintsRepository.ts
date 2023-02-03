import { IPrint } from '../../entities/print-order/print/IPrint';

export interface IPrintsRepository {

  listPrintByImageUrl(imageUrl: string): Promise<IPrint>;

  listPrintByKey(key: string): Promise<IPrint>;

  listByPrintOrderId(printOrderId: string): Promise<IPrint[]>;

  listByColorId(colorId: string): Promise<IPrint[]>;

  listByPrintPriceId(printPriceId: string): Promise<IPrint[]>;

  deleteByPrintOrderId(printOrderId: string): Promise<void>;

  cleanRepository(): void;

}
