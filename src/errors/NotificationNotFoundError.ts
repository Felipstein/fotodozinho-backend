import { NotFoundError } from './NotFoundError';

export class NotificationNotFoundError extends NotFoundError {

  constructor() {
    super('Notificação não encontrada');
  }

}
