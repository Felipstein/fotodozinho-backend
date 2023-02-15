import { IPrint } from '../../../entities/print-order/print/IPrint';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';
import { PrintFilterProperties } from '../../../shared/PrintFilterProperties';

export class ListPrintsUseCases {

  constructor(
    private printsRepository: IPrintsRepository,
  ) { }

  async execute(filterProperties: PrintFilterProperties): Promise<IPrint[]> {
    const prints = await this.printsRepository.listManyByProperties(filterProperties);

    return prints;
  }

}
