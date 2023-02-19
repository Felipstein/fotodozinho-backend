import { IPurchaseOrder } from '../../../entities/purchase-order/IPurchaseOrder';
import { BadRequestError } from '../../../errors/BadRequestError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { verifyUserAuth } from '../../../services/verify-user-auth';
import { getBeforeData } from '../../../utils/getBeforeDate';

export class ListPurchaseOrdersUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async execute(requestingUserId: string, userId?: string, when?: 'today' | 'lastweek' | 'lastmonth'): Promise<IPurchaseOrder[]> {
    if(userId) {
      await verifyUserAuth.ensureSelfAction({ id: requestingUserId }, userId);

      const userExists = await this.usersRepository.listById(userId);
      if(!userExists) {
        throw new UserNotFoundError();
      }

      const purchaseOrders = await this.purchaseOrdersRepository.listByUserId(userId);

      return purchaseOrders;
    }

    await verifyUserAuth.ensureAdminUser(requestingUserId);

    let before;
    if(when) {
      try {
        before = getBeforeData(when);
      } catch (err: any) {
        throw new BadRequestError(err.message);
      }
    }

    const purchaseOrders = await this.purchaseOrdersRepository.listAll({ when: before });

    return purchaseOrders;
  }

}
