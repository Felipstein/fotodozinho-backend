import { IPrintOrder, PrintOrderStatus, isPrintOrderStatus, convertPrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { EmailService } from '../../../providers/emails/EmailService';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { NotificationsService } from '../../../services/notifications';

export class UpdatePrintOrderStatusUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepository: IUsersRepository,
    private notificationsService: NotificationsService,
    private emailService: EmailService,
  ) { }

  async execute(id: string, newStatus: PrintOrderStatus): Promise<IPrintOrder> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!newStatus) {
      throw new RequiredFieldsError('Status');
    }

    if(!isPrintOrderStatus(newStatus)) {
      throw new BadRequestError('O campo status só pode ter três tipos de valores: "WAITING", "IN_PRODUCTION" ou "DONE".');
    }

    const printOrderExists = await this.printOrdersRepository.listById(id);
    if(!printOrderExists) {
      throw new PrintOrderNotFound();
    }

    const printOrderUpdated = await this.printOrdersRepository.updateStatus(id, convertPrintOrderStatus(newStatus));

    if(newStatus === 'IN_PRODUCTION') {
      const user = await this.usersRepository.listById(printOrderUpdated.userId);

      await this.notificationsService.createStructuredNotification('print-order-in-production', user);

      if(user.notifyServicesByEmail) {
        await this.emailService.sendPrintOrderInProductionEmail(user.email, user.name);
      }
    } else if(newStatus === 'DONE') {
      const user = await this.usersRepository.listById(printOrderUpdated.userId);

      const date = Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(printOrderUpdated.createdAt);
      const time = Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }, ).format(printOrderUpdated.createdAt);

      await this.notificationsService.createStructuredNotification('print-order-finished', user, { date, time });

      if(user.notifyServicesByEmail) {
        await this.emailService.sendPrintOrderFinishedEmail(user.email, user.name, date, time);
      }
    }

    return printOrderUpdated;
  }

}
