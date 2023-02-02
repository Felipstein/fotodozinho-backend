import { PrintOrderCreateRequest } from '../../entities/print-order/dtos/PrintOrderCreateRequest';
import { IPrintOrder, PrintOrderStatus } from '../../entities/print-order/IPrintOrder';

export interface IPrintOrdersRepository {

  listAll(): Promise<IPrintOrder[]>;

  listById(id: string): Promise<IPrintOrder>;

  listByUserId(userId: string): Promise<IPrintOrder[]>;

  listByUserIdAndStatus(userId: string, status: PrintOrderStatus): Promise<IPrintOrder[]>;

  create({ number, prints, userId }: PrintOrderCreateRequest): Promise<IPrintOrder>;

  updateStatus(id: string, newStatus: PrintOrderStatus): Promise<IPrintOrder>;

  delete(id: string): Promise<void>;

  deleteByUserId(userId: string): Promise<void>;

  cleanRepository(): void;

}
