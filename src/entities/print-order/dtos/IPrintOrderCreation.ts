import { IPrintCreation } from './print/IPrintCreation';

export interface IPrintOrderCreation {
  number: number;
  prints: IPrintCreation[];
  userId: string;
}
