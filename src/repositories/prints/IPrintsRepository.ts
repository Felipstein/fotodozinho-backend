import { PrintCreateRequest } from '../../entities/print-order/print/dtos/PrintCreateRequest';
import { IPrint } from '../../entities/print-order/print/IPrint';
import { PrintFilter } from '../../shared/filters/PrintFilter';
export interface IPrintsRepository {

  listManyByProperties({ printOrderId, colorId, key }: PrintFilter): Promise<IPrint[]>;

  listFirstByProperties({ printOrderId, colorId, key }: PrintFilter): Promise<IPrint>;

  create({ imageName, imageUrl, key, imageStoragedType, border, colorId, printPriceId, quantity, printOrderId }: PrintCreateRequest): Promise<IPrint>;

}
