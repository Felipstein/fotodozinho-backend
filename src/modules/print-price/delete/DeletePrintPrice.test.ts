import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { CreatePrintPriceUseCases } from '../create/CreatePrintPriceUseCases';
import { DeletePrintPriceUseCases } from './DeletePrintPriceUseCases';

describe('Delete Print Price', () => {

  const printPricesRepository = new MockPrintPricesRepository();
  const createPrintPriceUseCases = new CreatePrintPriceUseCases(printPricesRepository);
  const deletePrintPriceUseCases = new DeletePrintPriceUseCases(printPricesRepository);

  afterEach(() => {
    printPricesRepository.cleanRepository();
  });

  it('should delete print price without errors', async () => {
    const { id } = await createPrintPriceUseCases.execute({
      length: '10x15',
      price: 5,
    });

    expect(deletePrintPriceUseCases.execute(id)).resolves.not.toThrow();
  });

  it('should throw an error when deleting a print price that does not exist', async () => {

    expect(deletePrintPriceUseCases.execute('unknowid')).rejects.toThrow(PrintPriceNotFound);
  });

});
