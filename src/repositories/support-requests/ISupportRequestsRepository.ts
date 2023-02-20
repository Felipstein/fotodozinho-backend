import { ISupportRequest } from '../../entities/support-request/ISupportRequest';
import { SupportRequestCreateRequest } from '../../entities/support-request/dtos/SupportRequestCreateRequest';

export interface ISupportRequestsRepository {

  listAll(): Promise<ISupportRequest[]>;

  create(request: SupportRequestCreateRequest): Promise<ISupportRequest>;

  updateResolved(id: string, resolved: boolean): Promise<ISupportRequest>;

  delete(id: string): Promise<void>;

}
