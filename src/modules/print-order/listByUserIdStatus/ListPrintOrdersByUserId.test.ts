import { PrintCreateRequest } from '../../../entities/print-order/print/dtos/PrintCreateRequest';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { MockPrintOrdersRepository } from '../../../repositories/print-orders/MockPrintOrdersRepository';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { ListPrintOrdersByUserIdStatusUseCases } from './ListPrintOrdersByUserIdUseCases';

describe('List Print Orders by User ID', () => {

  const usersRepository = new MockUserRepository();
  const printPricesRepository = new MockPrintPricesRepository();
  const colorsRepository = new MockColorsRepository();
  const printOrdersRepository = new MockPrintOrdersRepository();
  const listPrintOrdersByUserIdStatusUseCases = new ListPrintOrdersByUserIdStatusUseCases(printOrdersRepository, usersRepository);

  afterEach(() => {
    usersRepository.cleanRepository();
    printOrdersRepository.cleanRepository();
  });

  it('should list only one print orders of user', async () => {
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

    await printOrdersRepository.create({
      number: 2, prints, userId,
    });

    await printOrdersRepository.updateStatus(id, 'IN_PRODUCTION');

    const printOrdersListed = await listPrintOrdersByUserIdStatusUseCases.execute(userId, 'IN_PRODUCTION');

    expect(printOrdersListed).toHaveLength(1);
  });

  it('should list empty array of print orders of user', async () => {
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

    await printOrdersRepository.create({
      number: 1, prints, userId,
    });

    const printOrdersListed = await listPrintOrdersByUserIdStatusUseCases.execute(userId, 'IN_PRODUCTION');

    expect(printOrdersListed).toHaveLength(0);
  });

  it('should throw an error when try list print orders of user that does not exists', async () => {

    expect(() => listPrintOrdersByUserIdStatusUseCases.execute('fake-user-id', 'WAITING')).rejects.toThrow(UserNotFoundError);
  });

});
