import { INotification } from '../entities/notification/INotification';
import { NotificationCreateRequest } from '../entities/notification/dtos/NotificationCreateRequest';
import { IUserView } from '../entities/user/IUserView';
import { INotificationsRepository } from '../repositories/notifications/INotificationsRepository';

export type NotificationsType = 'purchase-order-released' | 'print-order-finished' | 'print-order-released' | 'print-order-in-production' | 'welcome';

const notificationsStructured: Record<NotificationsType, Omit<NotificationCreateRequest, 'userId'>> = {
  welcome: {
    title: 'Bem-vindo(a)!',
    message: 'Estamos muito felizes em te ver conosco, o que acha de revelar algumas fotos?',
  },
  'print-order-finished': {
    title: 'Suas fotos estão prontas!',
    message: 'As fotos que você pediu para revelar em %date% às %time% estão prontas! É só ir retirar na nossa loja.',
  },
  'print-order-in-production': {
    title: 'Suas fotos estão sendo relevadas!',
    message: 'As fotos que você pediu para revelar já está em revelação, só aguardar o término.',
  },
  'print-order-released': {
    title: 'Suas fotos já já serão reveladas!',
    message: 'Seu pedido para revelar suas fotos já foi enviado para nós, só aguardar o processo e lhe enviaremos assim que entrar em produção.',
  },
  'purchase-order-released': {
    title: 'Pedido de compras realizado com sucesso!',
    message: 'Agora só falta escolher o método de pagamento.',
  },
};

export class NotificationsService {

  constructor(
    private notificationsRepository: INotificationsRepository,
  ) { }

  async getAll(): Promise<INotification[]> {
    const notifications = await this.notificationsRepository.listAll();

    return notifications;
  }

  async getNotification(id: string): Promise<INotification> {
    const notification = await this.notificationsRepository.listById(id);

    return notification;
  }

  async getNotificationsByUser(user: IUserView): Promise<INotification[]> {
    const notifications = await this.notificationsRepository.listByUserId(user.id);

    return notifications;
  }

  async createNotification(title: string, message: string, user: IUserView): Promise<INotification> {
    const notification = await this.notificationsRepository.create({
      title, message, userId: user.id,
    });

    return notification;
  }

  async createStructuredNotification(notificationType: NotificationsType, user: IUserView, replaceKeys?: Record<string, string>): Promise<INotification> {
    const notificationStructured = notificationsStructured[notificationType];

    let message = notificationStructured.message;

    if(replaceKeys) {
      Object.entries(replaceKeys).forEach(([key, value]) => {
        message = message.replace(`%${key}%`, value);
      });
    }

    const notification = await this.createNotification(
      notificationStructured.title,
      message,
      user,
    );

    return notification;
  }

  async updateNotificationRead(id: string, read: boolean): Promise<INotification> {
    const notification = await this.notificationsRepository.updateRead(id, read);

    return notification;
  }

  async deleteNotification(id: string): Promise<void> {
    await this.notificationsRepository.delete(id);
  }

}
