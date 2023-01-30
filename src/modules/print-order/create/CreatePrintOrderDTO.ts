import { IPrintCreation } from '../../../entities/print-order/print/IPrintCreation';

export interface CreatePrintOrderDTO {
  userId: string;
  prints: IPrintCreation[];
}
