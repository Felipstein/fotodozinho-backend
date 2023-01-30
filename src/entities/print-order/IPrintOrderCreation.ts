import { IPrintCreation } from './print/IPrintCreation';

export interface IPrintOrderCreation {
  userId: string;
  prints: IPrintCreation[];
}
