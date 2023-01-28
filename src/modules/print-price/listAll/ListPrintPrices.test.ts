import { IPrintPrice } from './../../../entities/print-price/IPrintPrice';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { CreatePrintPriceUseCases } from '../create/CreatePrintPriceUseCases';
import { ListPrintPricesUseCases } from './ListPrintPricesUseCases';

describe('List all Print Prices', () => {

  const printPricesRepository = new MockPrintPricesRepository();
  const createPrintPriceUseCases = new CreatePrintPriceUseCases(printPricesRepository);
  const listPrintPricesUseCases = new ListPrintPricesUseCases(printPricesRepository);

  afterEach(() => {
    printPricesRepository.cleanRepository();
  });

  it('should list two print prices', async () => {
    await createPrintPriceUseCases.execute({
      length: '10x15',
      price: 5,
    });

    await createPrintPriceUseCases.execute({
      length: '15x21',
      price: 10,
    });

    const printPrices = await listPrintPricesUseCases.execute();

    expect(printPrices).toHaveLength(2);
  });

  it('should exactly two print prices', async () => {
    const printPrice1 = await createPrintPriceUseCases.execute({
      length: '10x15',
      price: 5,
    });
    const printPrice2 = await createPrintPriceUseCases.execute({
      length: '15x21',
      price: 10,
    });

    const printPrices = await listPrintPricesUseCases.execute();

    expect(printPrices).toContainEqual({ id: printPrice1.id, length: printPrice1.length, price: printPrice1.price });
    expect(printPrices).toContainEqual({ id: printPrice2.id, length: printPrice2.length, price: printPrice2.price });
  });

});
