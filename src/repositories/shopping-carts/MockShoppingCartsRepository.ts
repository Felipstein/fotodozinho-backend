import { IProductCategory } from '../../entities/product-category/IProductCategory';
import { IProduct } from '../../entities/product/IProduct';
import { ProductCreateRequest } from '../../entities/product/dtos/ProductCreateRequest';
import { IShoppingCartProduct } from '../../entities/shopping-cart-product/IShoppingCartProduct';
import { ShoppingCartProductUpdateRequest } from '../../entities/shopping-cart-product/dtos/ShoppingCartProductUpdateRequest';
import { IShoppingCart } from '../../entities/shopping-cart/IShoppingCart';
import { uuidProvider } from '../../providers/UUID';
import { IShoppingCartsRepository } from './IShoppingCartsRepository';

export class MockShoppingCartsRepository implements IShoppingCartsRepository {

  private shoppingCarts: IShoppingCart[] = [];
  private shoppingCartProducts: (IShoppingCartProduct & { shoppingCartId: string })[] = [];
  private products: IProduct[] = [];

  async listAll(): Promise<IShoppingCart[]> {
    return [...this.shoppingCarts];
  }

  async listByUserId(userId: string): Promise<IShoppingCart> {
    return this.shoppingCarts.find(shoppingCart => shoppingCart.userId === userId);
  }

  async listShoppingCartProduct(userId: string, productId: string): Promise<IShoppingCartProduct> {
    const { id: shoppingCartId } = this.shoppingCarts.find(shoppingCart => shoppingCart.userId === userId);

    const shoppingCartProduct = this.shoppingCartProducts.find(
      shoppingCartProduct => shoppingCartProduct.shoppingCartId === shoppingCartId && shoppingCartProduct.product.id === productId,
    );

    return shoppingCartProduct;
  }

  async create(userId: string): Promise<IShoppingCart> {
    const id = uuidProvider.generateCUID();

    const shoppingCart: IShoppingCart = {
      id, products: [], userId,
    };

    this.shoppingCarts.push(shoppingCart);

    return shoppingCart;
  }

  async addProduct(userId: string, productId: string): Promise<IShoppingCartProduct> {
    const shoppingCart = this.shoppingCarts.find(shoppingCart => shoppingCart.userId === userId);

    const product = this.products.find(product => product.id === productId);

    if(!product) {
      throw Error('Product not found');
    }

    const shoppingCartProduct: IShoppingCartProduct = {
      id: uuidProvider.generateCUID(),
      product,
      quantity: 1,
    };

    shoppingCart.products.push(shoppingCartProduct);

    return shoppingCartProduct;
  }

  async updateProduct(userId: string, productId: string, { quantity }: ShoppingCartProductUpdateRequest): Promise<IShoppingCartProduct> {
    const { id: shoppingCartId } = this.shoppingCarts.find(shoppingCart => shoppingCart.userId === userId);

    const shoppingCartProduct = this.shoppingCartProducts.find(
      shoppingCartProduct => shoppingCartProduct.shoppingCartId === shoppingCartId && shoppingCartProduct.product.id === productId,
    );

    shoppingCartProduct.quantity = quantity;

    return shoppingCartProduct;
  }

  async removeProduct(userId: string, productId: string): Promise<void> {
    const shoppingCart = this.shoppingCarts.find(shoppingCart => shoppingCart.userId === userId);

    shoppingCart.products = shoppingCart.products.filter(product => product.id !== productId);
  }

  cleanRepository(): void {}

  createFakeProduct({ name, description, price }: ProductCreateRequest): IProduct {
    const id = uuidProvider.generateCUID();
    const fakeCategory: IProductCategory = {
      id, name: 'fake-product-category',
    };

    const product: IProduct = {
      id, name, description, price, rated: 0, category: fakeCategory,
    };

    this.products.push(product);

    return product;
  }

}
