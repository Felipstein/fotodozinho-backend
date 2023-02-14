import { IPrintOrder, PrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';

export class ListPrintOrdersByUserIdStatusUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepositry: IUsersRepository,
  ) { }

  async execute(userId: string, status: PrintOrderStatus): Promise<IPrintOrder[]> {
    if(ValidateService.someIsNullOrUndefined(status)) {
      throw new RequiredFieldsError('Usuário', 'Status');
    }

    const userExists = await this.usersRepositry.listById(userId);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const printOrders = await this.printOrdersRepository.listByUserIdAndStatus(userId, status);

    return printOrders;
  }

}
