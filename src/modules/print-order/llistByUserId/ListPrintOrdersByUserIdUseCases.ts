import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class ListPrintOrdersByUserIdUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepositry: IUsersRepository,
  ) { }

  async execute(userId: string): Promise<IPrintOrder[]> {
    if(!userId) {
      throw new RequiredFieldsError('Usuário');
    }

    const userExists = await this.usersRepositry.listById(userId);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const printOrders = await this.printOrdersRepository.listByUserId(userId);

    return printOrders;
  }

}
