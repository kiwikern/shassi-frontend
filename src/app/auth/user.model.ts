export interface User {
  username: string;
  notificationTypes: {
    telegram: boolean;
    email: boolean;
  };
  email?: string;
  telegramId?: string;
}
