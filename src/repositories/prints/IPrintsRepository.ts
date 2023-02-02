import { IPrint } from '../../entities/print-order/print/IPrint';

export interface IPrintsRepository {

  listByPrintOrderId(printOrderId: string): Promise<IPrint[]>;

  deleteByPrintOrderId(printOrderId: string): Promise<void>;

  cleanRepository(): void;

}
