export interface AdminData {
  userId: string;
  username: string;
  productCount: number;
  latestProductAddedDate?: Date;
  latestProductUpdatedDate?: Date;
  isConnectedToTelegram: boolean;
}
