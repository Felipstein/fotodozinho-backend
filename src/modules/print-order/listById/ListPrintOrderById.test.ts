import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { PrintCreateRequest } from '../../../entities/print-order/print/dtos/PrintCreateRequest';
import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { MockPrintOrdersRepository } from '../../../repositories/print-orders/MockPrintOrdersRepository';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { ListPrintOrderByIdUseCases } from './ListPrintOrderByIdUseCases';

describe('List Print Order by ID', () => {

  const usersRepository = new MockUserRepository();
  const printPricesRepository = new MockPrintPricesRepository();
  const colorsRepository = new MockColorsRepository();
  const printOrdersRepository = new MockPrintOrdersRepository();
  const listPrintOrderByIdUseCases = new ListPrintOrderByIdUseCases(printOrdersRepository);

  afterEach(() => {
    printOrdersRepository.cleanRepository();
  });

  it('should list exactly print order created', async () => {
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

    const { id, createdAt } = await printOrdersRepository.create({
      number: 1, prints, userId,
    });

    const printOrderListed = await listPrintOrderByIdUseCases.execute(id);

    expect(printOrderListed).not.toBeNull();
    expect(printOrderListed).toEqual({
      id,
      number: 1,
      prints: [
        {
          id: expect.any(String),
          imageName: prints[0].imageName,
          imageUrl: prints[0].imageUrl,
          key: prints[0].key,
          printPriceId: prints[0].printPriceId,
          border: prints[0].border,
          colorId: prints[0].colorId,
          quantity: prints[0].quantity,
        }
      ],
      status: 'WAITING',
      userId,
      createdAt,
    } as IPrintOrder);
  });

});
