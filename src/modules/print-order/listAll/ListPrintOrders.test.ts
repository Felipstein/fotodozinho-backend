import { IPrint } from '../../../entities/print-order/print/IPrint';
import { IPrintCreation } from '../../../entities/print-order/print/IPrintCreation';
import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { MockPrintOrdersRepository } from '../../../repositories/print-orders/MockPrintOrdersRepository';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { ListPrintOrdersUseCases } from './ListPrintOrdersUseCases';

describe('List all Print Orders', () => {

  const usersRepository = new MockUserRepository();
  const printPricesRepository = new MockPrintPricesRepository();
  const colorsRepository = new MockColorsRepository();
  const printOrdersRepository = new MockPrintOrdersRepository();
  const listPrintOrdersUseCases = new ListPrintOrdersUseCases(printOrdersRepository);

  afterEach(() => {
    usersRepository.cleanRepository();
    printPricesRepository.cleanRepository();
    colorsRepository.cleanRepository();
    printOrdersRepository.cleanRepository();
  });

  it('should list two print orders', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'User Test',
      email: 'test@test.com',
      phone: '99999999999',
      password: '123456',
      admin: false,
    });

    const printPrice = await printPricesRepository.create({ length: '10x15', price: 5 });
    const color = await colorsRepository.create({ color: 'red' });

    const prints: IPrintCreation[] = [
      {
        imageName: 'Image Name Test.jpeg',
        imageUrl: 'http://example.com/key-image-name-test.jpeg',
        key: 'key-image-name-test.jpeg',
        printPriceId: printPrice.id,
        border: false,
        colorId: color.id,
        quantity: 1,
      },
      {
        imageName: 'Image Name Other.jpeg',
        imageUrl: 'http://example.com/key-image-name-other.jpeg',
        key: 'key-image-name-other.jpeg',
        printPriceId: printPrice.id,
        border: false,
        colorId: color.id,
        quantity: 2,
      },
    ];

    await printOrdersRepository.create({ prints, userId });
    await printOrdersRepository.create({ prints, userId });

    const printOrdersListed = await listPrintOrdersUseCases.execute();

    expect(printOrdersListed).toHaveLength(2);
  });

});
