import { IShoppingCart } from '../../../entities/shopping-cart/IShoppingCart';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';

export class ListShoppingCartsUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
  ) { }

  async execute(): Promise<IShoppingCart[]> {
    const shoppingCarts = await this.shoppingCartsRepository.listAll();

    return shoppingCarts;
  }

}
