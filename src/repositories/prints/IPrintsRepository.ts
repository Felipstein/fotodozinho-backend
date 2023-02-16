import { PrintCreateRequest } from '../../entities/print-order/print/dtos/PrintCreateRequest';
import { IPrint } from '../../entities/print-order/print/IPrint';
import { PrintFilterProperties } from '../../shared/PrintFilterProperties';
export interface IPrintsRepository {

  listManyByProperties({ printOrderId, key }: PrintFilterProperties): Promise<IPrint[]>;

  listFirstByProperties({ printOrderId, key }: PrintFilterProperties): Promise<IPrint>;

  create({ imageName, imageUrl, key, imageStoragedType, border, colorId, printPriceId, quantity, printOrderId }: PrintCreateRequest): Promise<IPrint>;

}
