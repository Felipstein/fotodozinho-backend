export interface ProductCreateRequest {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
}
