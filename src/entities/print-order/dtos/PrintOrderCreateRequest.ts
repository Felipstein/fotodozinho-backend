import { PrintCreateRequest } from '../print/dtos/PrintCreateRequest';

export interface PrintOrderCreateRequest {
  number: number;
  prints: PrintCreateRequest[];
  userId: string;
}
