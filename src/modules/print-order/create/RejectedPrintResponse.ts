import { IPrintCreation } from '../../../entities/print-order/print/IPrintCreation';

export interface RejectedPrintResponse {
  print: IPrintCreation;
  reason: string;
}
