export interface ProductUpdateRequest {
  name: string;
  description?: string;
  rated: number;
  price: number;
  categoryId: string;
}
