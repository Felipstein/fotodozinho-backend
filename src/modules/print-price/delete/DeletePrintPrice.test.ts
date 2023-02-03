import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { MockPrintsRepository } from '../../../repositories/prints/MockPrintsRepository';
import { DeletePrintPriceUseCases } from './DeletePrintPriceUseCases';

describe('Delete Print Price', () => {

  const printPricesRepository = new MockPrintPricesRepository();
  const printsRepository = new MockPrintsRepository();
  const deletePrintPriceUseCases = new DeletePrintPriceUseCases(printPricesRepository, printsRepository);

  afterEach(() => {
    printPricesRepository.cleanRepository();
  });

  it('should delete print price', async () => {
    const { id } = await printPricesRepository.create({
      length: '10x15',
      price: 5,
    });

    await deletePrintPriceUseCases.execute(id);

    const result = await printPricesRepository.listById(id);

    expect(result).toBeUndefined();
  });

  it('should throw an error when deleting a print price that does not exist', async () => {

    expect(() => deletePrintPriceUseCases.execute('unknowid')).rejects.toThrow(PrintPriceNotFound);
  });

});
