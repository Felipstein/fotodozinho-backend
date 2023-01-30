import { IPrint } from '../../../entities/print-order/print/IPrint';

export interface CreatePrintOrderDTO {
  userId: string;
  prints: IPrint[];
}
