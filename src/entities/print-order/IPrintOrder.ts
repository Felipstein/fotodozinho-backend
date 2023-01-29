import { IPrint } from './print/IPrint';

export interface IPrintOrder {
  id: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  userId: string;
  prints: IPrint[];
  createdAt: Date;
}
