import { PrintCreateRequest } from '../../../entities/print-order/print/dtos/PrintCreateRequest';
import { IPrint } from '../../../entities/print-order/print/IPrint';
import { BadRequestError } from '../../../errors/BadRequestError';
import { ColorNotFoundError } from '../../../errors/ColorNotFoundError';
import { NumberValidationError } from '../../../errors/NumberValidationError';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { EmailService } from '../../../providers/emails/EmailService';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ImageStoragedService } from '../../../services/image-storaged-type';
import { NotificationsService } from '../../../services/notifications';
import { ParseBoolean } from '../../../services/parse-boolean';
import { ValidateService } from '../../../services/validate';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class CreatePrintUseCases {

  constructor(
    private printsRepository: IPrintsRepository,
    private printOrdersRepository: IPrintOrdersRepository,
    private colorsRepository: IColorsRepository,
    private printPricesRepository: IPrintPricesRepository,
    private usersRepository: IUsersRepository,
    private notificationsService: NotificationsService,
    private emailService: EmailService,
  ) { }

  async execute(
    {
      imageName,
      imageUrl,
      key,
      border,
      colorId,
      printPriceId,
      quantity,
      printOrderId
    }: Omit<PrintCreateRequest, 'imageStoragedType'>,
    requestingUserId: string,
  ): Promise<IPrint> {
    if(ValidateService.someIsNullOrUndefined(imageName, imageUrl, key, border, colorId, printPriceId, quantity, printOrderId)) {
      throw new RequiredFieldsError('Nome da imagem', 'URL da imagem', 'Imagem', 'Borda', 'Cor/tipo', 'Preço/tamanho', 'Quantidade', 'Identificador do pedido');
    }

    if(isNaN(quantity)) {
      throw new NumberValidationError('Quantidade');
    }

    const printOrder = await this.printOrdersRepository.listById(printOrderId);
    if(!printOrder) {
      throw new PrintOrderNotFound();
    }

    await verifyUserAuth.ensureSelfAction({ id: requestingUserId }, printOrder.userId);

    if(printOrder.status !== 'UPLOADING_IMAGES') {
      throw new BadRequestError('Não é mais possível enviar novas fotos para esse pedido, pois o pedido está em andamento ou já foi finalizado');
    }

    const colorExists = await this.colorsRepository.listById(colorId);
    if(!colorExists) {
      throw new ColorNotFoundError();
    }

    const printPriceExists = await this.printPricesRepository.listById(printPriceId);
    if(!printPriceExists) {
      throw new PrintPriceNotFound();
    }

    const printExists = await this.printsRepository.listFirstByProperties({ key });
    if(printExists) {
      throw new BadRequestError('Esse pedido foto já está registrado');
    }

    const imageStoragedType = ImageStoragedService.getCurrentStorageType();

    const print = await this.printsRepository.create({
      imageName, imageUrl, key, imageStoragedType, border: ParseBoolean.parse(border), colorId, printPriceId, quantity, printOrderId,
    });

    if((printOrder.prints.length + 1) >= printOrder.totalPrintsExpected) {
      await this.printOrdersRepository.updateStatus(printOrder.id, 'WAITING');

      const user = await this.usersRepository.listById(printOrder.userId);

      await this.notificationsService.createStructuredNotification('print-order-released', user);

      if(user.notifyServicesByEmail) {
        await this.emailService.sendPrintOrderReleasedEmail(user.email, user.name);
      }
    }

    return print;
  }

}
