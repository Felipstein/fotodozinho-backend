import { PrintOrderStatus } from '../entities/print-order/IPrintOrder';

export interface PrintOrderFilter {
  status?: PrintOrderStatus;
  when?: Date;
}
