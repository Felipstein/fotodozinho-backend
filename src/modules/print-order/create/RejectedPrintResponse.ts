import { PrintCreateRequest } from '../../../entities/print-order/print/dtos/PrintCreateRequest';

export interface RejectedPrintResponse {
  print: PrintCreateRequest;
  reason: string;
}
