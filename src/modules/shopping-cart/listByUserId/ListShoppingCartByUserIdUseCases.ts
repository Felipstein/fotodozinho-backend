import { IShoppingCart } from '../../../entities/shopping-cart/IShoppingCart';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class ListShoppingCartByUserIdUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async execute(userId: string): Promise<IShoppingCart> {
    if(!userId) {
      throw new RequiredFieldsError('Usuário');
    }

    const userExists = await this.usersRepository.listById(userId);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const shoppingCart = await this.shoppingCartsRepository.listByUserId(userId);

    return shoppingCart;
  }

}
