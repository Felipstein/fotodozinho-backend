import { BadRequestError } from '../../../errors/BadRequestError';
import { FieldsMustBeNumericError } from '../../../errors/FieldsMustBeNumericError';
import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { CreatePrintPriceUseCases } from '../create/CreatePrintPriceUseCases';
import { UpdatePricePrintPriceUseCases } from './UpdatePricePrintPriceUseCases';

describe('Update Price of Print Price', () => {

  const printPricesRepository = new MockPrintPricesRepository();
  const createPrintPriceUseCases = new CreatePrintPriceUseCases(printPricesRepository);
  const updatePricePrintPriceUseCases = new UpdatePricePrintPriceUseCases(printPricesRepository);

  afterEach(() => {
    printPricesRepository.cleanRepository();
  });

  it('should update the price of print price', async () => {
    const { id } = await createPrintPriceUseCases.execute({
      length: '15x21',
      price: 5,
    });

    const printPriceUpdated = await updatePricePrintPriceUseCases.execute(id, { price: 10 });

    expect(printPriceUpdated.price).toBe(10);
  });

  it('should throw an error when not passing the price which should be updated', async () => {
    const { id } = await createPrintPriceUseCases.execute({
      length: '10x15',
      price: 5,
    });

    // @ts-ignore
    expect(updatePricePrintPriceUseCases.execute(id, {})).rejects.toThrow(RequiredFieldsError);
  });

  it('should throw an error when update the price of print price that does not exists', async () => {

    expect(updatePricePrintPriceUseCases.execute('unknowid', { price: 5 })).rejects.toThrow(PrintPriceNotFound);
  });

  it('should throw an error when updating the price with a non-numeric value', async () => {
    const { id } = await createPrintPriceUseCases.execute({
      length: '10x15',
      price: 5,
    });

    // @ts-ignore
    expect(updatePricePrintPriceUseCases.execute(id, { price: 'hello' })).rejects.toThrow(FieldsMustBeNumericError);
  });

});
