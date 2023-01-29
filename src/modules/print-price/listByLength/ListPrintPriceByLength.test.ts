import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { ListPrintPriceByLengthUseCases } from './ListPrintPriceByLengthUseCases';

describe('List Print Price by Length', () => {

  const printPricesRepository = new MockPrintPricesRepository();
  const listPrintPriceByLengthUseCases = new ListPrintPriceByLengthUseCases(printPricesRepository);

  afterEach(() => {
    printPricesRepository.cleanRepository();
  });

  it('should list print price with exaclty attributes created', async () => {
    await printPricesRepository.create({
      length: '10x15',
      price: 5,
    });

    const printPriceListed = await listPrintPriceByLengthUseCases.execute('10x15');

    expect(printPriceListed.length).toBe('10x15');
    expect(printPriceListed.price).toBe(5);
  });

  it('should throw an error when listing a prnit price that doesn\'t exist', async () => {

    expect(() => listPrintPriceByLengthUseCases.execute('Polaroide')).rejects.toThrow(PrintPriceNotFound);
  });

});
