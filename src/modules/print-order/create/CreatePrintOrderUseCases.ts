import { PrintOrderCreateRequest } from '../../../entities/print-order/dtos/PrintOrderCreateRequest';
import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class CreatePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ userId }: Omit<PrintOrderCreateRequest, 'number'>): Promise<IPrintOrder> {
    if(!userId) {
      throw new RequiredFieldsError('Usuário');
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    const number = user.totalPrintOrders + 1;

    const printOrder = await this.printOrdersRepository.create({
      number, userId,
    });

    await this.usersRepository.update(userId, { totalPrintOrders: number }, false);

    return printOrder;
  }

}
