export interface Profile {
  id: number;
  name: string;
  location: string;
  rating: number;
  rateCount: number;
  phoneNumber: string;
  deleted_at: any;
  [key: string]: any;
}
