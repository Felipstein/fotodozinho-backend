import { IShoppingCart } from '../../../entities/shopping-cart/IShoppingCart';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { ShoppingCartNotFoundError } from '../../../errors/ShoppingCartNotFoundError';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class ListShoppingCartByUserIdUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
  ) { }

  async execute(userId: string, requestingUserId: string): Promise<IShoppingCart> {
    await verifyUserAuth.execute({ id: requestingUserId }, userId);

    if(!userId) {
      throw new RequiredFieldsError('Usuário');
    }

    const shoppingCart = await this.shoppingCartsRepository.listByUserId(userId);
    if(!shoppingCart) {
      throw new ShoppingCartNotFoundError();
    }

    return shoppingCart;
  }

}
