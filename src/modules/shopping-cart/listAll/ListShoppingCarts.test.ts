import { MockShoppingCartsRepository } from '../../../repositories/shopping-carts/MockShoppingCartsRepository';
import { ListShoppingCartsUseCases } from './ListShoppingCartsUseCases';

describe('List all Shopping Carts', () => {

  const shoppingCartsRepository = new MockShoppingCartsRepository();
  const listShoppingCartsUseCases = new ListShoppingCartsUseCases(shoppingCartsRepository);

  afterEach(() => {
    shoppingCartsRepository.cleanRepository();
  });

  it('should list two shopping carts', async () => {
    await shoppingCartsRepository.create('fake-user-id-1');
    await shoppingCartsRepository.create('fake-user-id-2');

    const shoppingCarts = await listShoppingCartsUseCases.execute();

    expect(shoppingCarts).toHaveLength(2);
  });

});
