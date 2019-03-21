import { Role } from './jwt.service';

export interface User {
  username: string;
  notificationTypes: {
    telegram: boolean;
    email: boolean;
  };
  email?: string;
  isConnectedToTelegram?: boolean;
  roles?: Role[];
}
