import { IProduct } from '../../../entities/product/IProduct';
import { ProductNotFoundError } from '../../../errors/ProductNotFoundError';
import { MockProductsRepository } from '../../../repositories/product/MockProductsRepository';
import { ListProductByIdUseCases } from './ListProductByIdUseCases';

describe('List Product by ID', () => {

  const productsRepository = new MockProductsRepository();
  const listProductByIdUseCases = new ListProductByIdUseCases(productsRepository);

  it('should list exactly product created', async () => {
    const productCreated = await productsRepository.create({
      name: 'Product Name',
      description: 'A description',
      price: 100,
      categoryId: 'fake-category-id',
    });

    const productListed = await listProductByIdUseCases.execute(productCreated.id);

    expect(productListed).toEqual({
      id: productCreated.id,
      name: productCreated.name,
      description: productCreated.description,
      price: productCreated.price,
      rated: productCreated.rated,
      category: productCreated.category,
    } as IProduct);
  });

  it('should throw an error when list product that does not exists', async () => {

    expect(() => listProductByIdUseCases.execute('fake-product-id')).rejects.toThrow(ProductNotFoundError);
  });

});
