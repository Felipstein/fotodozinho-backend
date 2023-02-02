import { PrintCreateRequest } from '../../../entities/print-order/print/dtos/PrintCreateRequest';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { MockPrintOrdersRepository } from '../../../repositories/print-orders/MockPrintOrdersRepository';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { DeletePrintOrderUseCases } from './DeletePrintOrderUseCases';

describe('Delete Print Order', () => {

  const printOrdersRepository = new MockPrintOrdersRepository();
  const usersRepository = new MockUserRepository();
  const printPricesRepository = new MockPrintPricesRepository();
  const colorsRepository = new MockColorsRepository();
  const deletePrintOrderUseCases = new DeletePrintOrderUseCases(printOrdersRepository);

  afterEach(() => {
    printOrdersRepository.cleanRepository();
    usersRepository.cleanRepository();
    printPricesRepository.cleanRepository();
    colorsRepository.cleanRepository();
  });

  it('should delete the print order', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'User Test',
      email: 'test@test.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const printPrice = await printPricesRepository.create({ length: '10x15', price: 5 });
    const color = await colorsRepository.create({ color: 'red' });

    const prints: PrintCreateRequest[] = [
      {
        imageName: 'Image Name Test.jpeg',
        imageUrl: 'http://example.com/key-image-name-test.jpeg',
        key: 'key-image-name-test.jpeg',
        printPriceId: printPrice.id,
        border: false,
        colorId: color.id,
        quantity: 1,
      },
    ];

    const { id } = await printOrdersRepository.create({
      number: 1, prints, userId,
    });

    await deletePrintOrderUseCases.execute(id);

    const printOrder = await printOrdersRepository.listById(id);

    expect(printOrder).toBeUndefined();
  });

  it('should throw a error when try delete a print order that does not exists', async () => {

    expect(() => deletePrintOrderUseCases.execute('fake-print-order-id')).rejects.toThrow(PrintOrderNotFound);
  });

});
