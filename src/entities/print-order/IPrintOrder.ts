import { IPrint } from './print/IPrint';

export type PrintOrderStatus = 'WAITING' | 'IN_PRODUCTION' | 'DONE';

export interface IPrintOrder {
  id: string;
  number: number;
  status: PrintOrderStatus;
  userId: string;
  prints: IPrint[];
  createdAt: Date;
}
