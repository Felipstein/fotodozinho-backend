import { IPrintOrderCreation } from '../../entities/print-order/IPrintOrderCreation';
import { IPrintOrder, PrintOrderStatus } from '../../entities/print-order/IPrintOrder';

export interface IPrintOrdersRepository {

  listAll(): Promise<IPrintOrder[]>;

  listByUserId(userId: string): Promise<IPrintOrder[]>;

  listByUserIdAndStatus(userId: string, status: PrintOrderStatus): Promise<IPrintOrder[]>;

  create({ prints, userId }: IPrintOrderCreation): Promise<IPrintOrder>;

  updateStatus(id: string, newStatus: PrintOrderStatus): Promise<IPrintOrder>;

  delete(id: string): Promise<void>;

  deleteByUserId(userId: string): Promise<void>;

  cleanRepository(): void;

}
