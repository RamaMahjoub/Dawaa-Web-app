export interface Supplier {
  id: number;
  name: string;
  location: string;
  rating: number;
  phoneNumber: string;
}

export interface SupplierById {
  id: number;
  name: string;
  location: string;
  phoneNumber: string;
  userEmail: string;
  userFullName: string;
}
