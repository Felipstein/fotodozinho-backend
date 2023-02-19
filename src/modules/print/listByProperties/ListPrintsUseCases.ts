import { IPrint } from '../../../entities/print-order/print/IPrint';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';
import { PrintFilter } from '../../../shared/filters/PrintFilter';

export class ListPrintsUseCases {

  constructor(
    private printsRepository: IPrintsRepository,
  ) { }

  async execute(filterProperties: PrintFilter): Promise<IPrint[]> {
    const prints = await this.printsRepository.listManyByProperties(filterProperties);

    return prints;
  }

}
