import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { IPrintCreation } from '../../../entities/print-order/print/IPrintCreation';
import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { MockPrintOrdersRepository } from '../../../repositories/print-orders/MockPrintOrdersRepository';
import { MockPrintPricesRepository } from '../../../repositories/print-prices/MockPrintPricesRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { CreatePrintOrderUseCases } from './CreatePrintOrderUseCases';

describe('Create Print Order', () => {

  const printOrdersRepository = new MockPrintOrdersRepository();
  const usersRepository = new MockUserRepository();
  const printPricesRepository = new MockPrintPricesRepository();
  const colorsRepository = new MockColorsRepository();
  const createPrintOrderUseCases = new CreatePrintOrderUseCases(printOrdersRepository, usersRepository);

  afterEach(() => {
    printOrdersRepository.cleanRepository();
    usersRepository.cleanRepository();
  });

  it('should create new print order', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'User Test',
      email: 'test@test.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const printPrice = await printPricesRepository.create({ length: '10x15', price: 5 });
    const color = await colorsRepository.create({ color: 'red' });

    const prints: IPrintCreation[] = [
      {
        imageName: 'Image Name.jpeg',
        imageUrl: 'http://example.com/key-image-name.jpeg',
        key: 'key-image-name.jpeg',
        printPrice,
        printPriceId: printPrice.id,
        border: false,
        color,
        colorId: color.id,
        quantity: 1,
      },
    ];

    const printOrder = await createPrintOrderUseCases.execute({
      prints, userId,
    });

    expect(printOrder).toEqual({
      id: printOrder.id,
      prints: [
        {
          id: printOrder.prints[0].id,
          imageName: 'Image Name.jpeg',
          imageUrl: 'http://example.com/key-image-name.jpeg',
          key: 'key-image-name.jpeg',
          printPrice,
          printPriceId: printPrice.id,
          border: false,
          color,
          colorId: color.id,
          quantity: 1,
        },
      ],
      status: 'WAITING',
      userId,
      createdAt: printOrder.createdAt,
    } as IPrintOrder);
  });

});
