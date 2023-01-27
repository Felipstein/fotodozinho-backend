import { APIError } from '../../../errors/APIError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { CreatePrintPriceDTO } from './CreatePrintPriceDTO';
import { CreatePrintPriceUseCases } from './CreatePrintPriceUseCases';

describe('Create Print Price', () => {

  const printPriceRepository = new MockPrintPricesRepository();
  const createPrintPriceUseCases = new CreatePrintPriceUseCases(printPriceRepository);

  afterEach(() => {
    printPriceRepository.cleanRepository();
  });

  it('should create new print price', async () => {
    const printPrice: CreatePrintPriceDTO = {
      length: '10x15',
      price: 5,
    };

    const printPriceCreated = await createPrintPriceUseCases.execute(printPrice);

    expect(printPriceCreated).not.toBeNull();
    expect(printPriceCreated).toEqual({
      id: expect.any(String),
      length: printPrice.length,
      price: printPrice.price
    });
  });

  it('should throw an error when creating a print with equal lengths', async () => {
    await createPrintPriceUseCases.execute({
      length: '10x15',
      price: 5,
    });

    const createPrintPrice = () => createPrintPriceUseCases.execute({ length: '10x15', price: 5 });

    expect(createPrintPrice).rejects.toThrow(APIError);
    expect(createPrintPrice).rejects.toThrow('Já existe esse tamanho/tipo cadastrado');
  });

  it('should throw an error when creating an impression missing attributes', async () => {

    //@ts-ignore
    expect(() => createPrintPriceUseCases.execute({ length: '10x15' })).rejects.toThrow(RequiredFieldsError);
    //@ts-ignore
    expect(() => createPrintPriceUseCases.execute({ price: 5 })).rejects.toThrow(RequiredFieldsError);
  });

});
