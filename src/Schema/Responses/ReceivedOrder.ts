export interface ReceivedOrder {
  date: Date;
  id: number;
  pharmacy: string;
  status: string;
  totalPrice: number;
}

export interface MedicineInReceivedOrder {
  imageUrl: string | null;
  name: string;
  price: number;
  quantity: number;
}
export interface PharmacyInReceivededOrder {
  name: string;
  location: string;
  email: string;
  phoneNumber: string;
}
export interface ReceivedOrderDetails {
  id: number;
  medicines: MedicineInReceivedOrder[];
  pharmacy: PharmacyInReceivededOrder;
  status: string;
}

export interface MedicineInReceivedReturnOrder {
  imageUrl: string | null;
  name: string;
  batchId: number;
}
export interface ReceivedReturnOrder {
  id: number;
  medicine: MedicineInReceivedReturnOrder;
  pharmacy: PharmacyInReceivededOrder;
  reason: string;
  reportDate: Date;
  status: string;
}

export interface MedicineInOverview {
  expireDate: string;
  imageUrl: string | null;
  name: string;
  quantity: number;
}
export interface OrderOverview {
  id: number;
  medicines: MedicineInOverview[];
  name: string;
}
