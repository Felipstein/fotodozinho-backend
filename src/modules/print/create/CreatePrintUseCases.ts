import { PrintCreateRequest } from '../../../entities/print-order/print/dtos/PrintCreateRequest';
import { IPrint } from '../../../entities/print-order/print/IPrint';
import { BadRequestError } from '../../../errors/BadRequestError';
import { ColorNotFoundError } from '../../../errors/ColorNotFoundError';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { NumberValidationError } from '../../../errors/NumberValidationError';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ImageStoragedService } from '../../../services/image-storaged-type';
import { ParseBoolean } from '../../../services/parse-boolean';
import { ValidateService } from '../../../services/validate';

export class CreatePrintUseCases {

  constructor(
    private printsRepository: IPrintsRepository,
    private printOrdersRepository: IPrintOrdersRepository,
    private colorsRepository: IColorsRepository,
    private printPricesRepository: IPrintPricesRepository,
    private usersRepository: IUsersRepository,
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
    if(!requestingUserId) {
      throw new UnauthorizedError();
    }

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

    const requestingUser = await this.usersRepository.listById(requestingUserId);
    if(!requestingUser) {
      throw new UnauthorizedError();
    }

    if(!requestingUser.admin && requestingUserId !== printOrder.userId) {
      throw new ForbiddenError();
    }

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

    if(printOrder.prints.length >= printOrder.totalPrintsExpected) {
      await this.printOrdersRepository.updateStatus(printOrder.id, 'WAITING');
    }

    return print;
  }

}
