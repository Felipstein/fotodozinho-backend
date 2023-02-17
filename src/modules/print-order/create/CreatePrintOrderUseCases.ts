import { PrintOrderCreateRequest } from '../../../entities/print-order/dtos/PrintOrderCreateRequest';
import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { NumberValidationError } from '../../../errors/NumberValidationError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';

export class CreatePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ totalPrintsExpected, userId }: Omit<PrintOrderCreateRequest, 'number'>): Promise<IPrintOrder> {
    if(ValidateService.someIsNullOrUndefined(totalPrintsExpected)) {
      throw new RequiredFieldsError('Total de fotos esperado', 'Usuário');
    }

    if(isNaN(totalPrintsExpected)) {
      throw new NumberValidationError('Total de fotos esperado');
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    const number = user.totalPrintOrders + 1;

    const printOrder = await this.printOrdersRepository.create({
      number, totalPrintsExpected, userId,
    });

    await this.usersRepository.update(userId, { totalPrintOrders: number }, false);

    return printOrder;
  }

}
