export interface AdminOverview {
  userId: string;
  username: string;
  productCount: number;
  latestProductAddedDate?: Date;
  latestProductUpdatedDate?: Date;
  isConnectedToTelegram: boolean;
}
