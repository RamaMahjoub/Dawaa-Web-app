export interface SupplierPayment {
  id: number;
  userId: number;
  paid: number;
  total: number;
  debt: number;
  supplier: string;
}

export interface PharmacyPayment {
  id: number;
  userId: number;
  paid: number;
  total: number;
  debt: number;
  pharmacy: string;
}
