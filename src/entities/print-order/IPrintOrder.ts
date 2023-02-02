import { PrintOrderStatus as PrismaPrintOrderStatus } from '@prisma/client';
import { IPrint } from './print/IPrint';

export type PrintOrderStatus = 'WAITING' | 'IN_PRODUCTION' | 'DONE';

export function isPrintOrderStatus(value: string) {
  return value.toUpperCase() in PrismaPrintOrderStatus;
}

export function convertPrintOrderStatus(status: string): PrintOrderStatus {
  if(!isPrintOrderStatus(status)) {
    throw new TypeError();
  }

  const newStatus = status.toUpperCase().replace(' ', '_');

  // @ts-ignore
  return newStatus;
}

export interface IPrintOrder {
  id: string;
  number: number;
  status: PrintOrderStatus;
  userId: string;
  prints: IPrint[];
  createdAt: Date;
}
