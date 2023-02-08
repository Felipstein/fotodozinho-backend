import { MockProductsRepository } from '../../../repositories/product/MockProductsRepository';
import { DeleteProductUseCases } from './DeleteProductUseCases';

describe('Delete Product', () => {

  const productsRepository = new MockProductsRepository();
  const deleteProductUseCases = new DeleteProductUseCases(productsRepository);

  afterEach(() => {
    productsRepository.cleanRepository();
  });

  it('should delete product', async () => {
    const { id } = await productsRepository.create({
      name: 'Product Name',
      description: 'A description',
      price: 50,
      categoryId: 'fake-category-id',
    });

    await deleteProductUseCases.execute(id);

    const product = await productsRepository.listById(id);

    expect(product).toBeUndefined();
  });

  it('should throw an error when delete product that does not exists', async () => {
    expect(() => deleteProductUseCases.execute('fake-product-id'));
  });

});
