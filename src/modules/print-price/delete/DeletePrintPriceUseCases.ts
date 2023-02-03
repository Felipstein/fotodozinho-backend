import { ConflictRequestError } from '../../../errors/ConflictRequestError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';

export class DeletePrintPriceUseCases {

  constructor(
    private printPricesRepository: IPrintPricesRepository,
    private printsRepository: IPrintsRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const printPrice = await this.printPricesRepository.listById(id);
    if(!printPrice) {
      throw new PrintPriceNotFound();
    }

    const prints = await this.printsRepository.listByPrintPriceId(id);
    if(prints.length > 0) {
      throw new ConflictRequestError('Não é possível deletar essa categoria de tamanho/tipo. Existe uma ou mais fotos para serem impressas que a utilizam.');
    }

    await this.printPricesRepository.delete(id);
  }

}
