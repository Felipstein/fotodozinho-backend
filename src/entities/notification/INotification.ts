export interface INotification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  userId: string;
}
