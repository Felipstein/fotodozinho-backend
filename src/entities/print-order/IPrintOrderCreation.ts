import { IPrint } from './print/IPrint';

export interface IPrintOrderCreation {
  userId: string;
  prints: IPrint[];
}
