import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { IPrintCreation } from '../../../entities/print-order/print/IPrintCreation';
import { BadRequestError } from '../../../errors/BadRequestError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
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
  const createPrintOrderUseCases = new CreatePrintOrderUseCases(printOrdersRepository, usersRepository, printPricesRepository, colorsRepository);

  afterEach(() => {
    printOrdersRepository.cleanRepository();
    usersRepository.cleanRepository();
    printPricesRepository.cleanRepository();
    colorsRepository.cleanRepository();
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

    const { printOrder } = await createPrintOrderUseCases.execute({
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

  it('should throw an error when create print order with user that does not exists', async () => {
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

    expect(() => createPrintOrderUseCases.execute({ prints, userId: 'fake-user-id' })).rejects.toThrow(UserNotFoundError);
  });

  it('should throw an error when create print order without prints', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'User Test',
      email: 'test@test.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const createPrintOrder = () => createPrintOrderUseCases.execute({ prints: [], userId });

    expect(createPrintOrder).rejects.toThrow(BadRequestError);
    expect(createPrintOrder).rejects.toThrow('Nenhuma foto para revelação foi enviada');
  });

  it('should throw an error when create print order with all wrong prints', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'User Test',
      email: 'test@test.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const printPrice = await printPricesRepository.create({ length: '10x15', price: 5 });
    const color = await colorsRepository.create({ color: 'red' });

    const prints = [
      {
        // imageName: 'Image Name.jpeg',
        imageUrl: 'http://example.com/key-image-name.jpeg',
        // key: 'key-image-name.jpeg',
        printPrice,
        printPriceId: printPrice.id,
        border: false,
        color,
        colorId: color.id,
        quantity: 1,
      },
      {
        imageName: 'Image Name.jpeg',
        // imageUrl: 'http://example.com/key-image-name.jpeg',
        key: 'key-image-name.jpeg',
        printPrice,
        printPriceId: 'fake-print-price-id',
        border: false,
        color,
        colorId: color.id,
        quantity: 'notnumber',
      },
    ];

    // @ts-ignore
    const createPrintOrder = () => createPrintOrderUseCases.execute({ prints, userId });

    expect(createPrintOrder).rejects.toThrow(BadRequestError);
    expect(createPrintOrder).rejects.toThrow('Nenhuma foto para revelação possui seus campos corretos ou preenchidos');
  });

  it('should return one rejected print because wrong attributes and one accepted print', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'User Test',
      email: 'test@test.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const printPrice = await printPricesRepository.create({ length: '10x15', price: 5 });
    const color = await colorsRepository.create({ color: 'red' });

    const prints = [
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
      {
        imageName: 'Image Name.jpeg',
        imageUrl: 'http://example.com/key-image-name.jpeg',
        // key: 'key-image-name.jpeg',
        printPrice,
        printPriceId: 'fake-print-price-id',
        border: false,
        color,
        colorId: color.id,
        quantity: 'notnumber',
      },
    ];

    const { printOrder, rejectedPrints } = await createPrintOrderUseCases.execute({
      // @ts-ignore
      prints, userId
    });

    expect(printOrder.prints).toHaveLength(1);
    expect(rejectedPrints).toHaveLength(1);
  });

});
