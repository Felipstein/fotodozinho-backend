import { IShoppingCart } from '../../../entities/shopping-cart/IShoppingCart';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { ShoppingCartNotFoundError } from '../../../errors/ShoppingCartNotFoundError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';

export class ListShoppingCartByUserIdUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
  ) { }

  async execute(userId: string, requestingUserId: string): Promise<IShoppingCart> {
    if(!requestingUserId) {
      throw new UnauthorizedError();
    }

    if(!userId) {
      throw new RequiredFieldsError('Usuário');
    }

    if(requestingUserId !== userId) {
      throw new ForbiddenError();
    }

    const shoppingCart = await this.shoppingCartsRepository.listByUserId(userId);
    if(!shoppingCart) {
      throw new ShoppingCartNotFoundError();
    }

    return shoppingCart;
  }

}
