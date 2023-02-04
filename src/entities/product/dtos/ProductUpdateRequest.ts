export interface ProductUpdateRequest {
  name?: string;
  description?: string | null;
  rated?: number;
  price?: number;
  categoryId?: string;
}
