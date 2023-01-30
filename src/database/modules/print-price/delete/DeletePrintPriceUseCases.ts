import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';

export class DeletePrintPriceUseCases {

  constructor(
    private printPricesRepository: IPrintPricesRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const printPriceExists = await this.printPricesRepository.listById(id);
    if(!printPriceExists) {
      throw new PrintPriceNotFound();
    }

    await this.printPricesRepository.delete(id);
  }

}
