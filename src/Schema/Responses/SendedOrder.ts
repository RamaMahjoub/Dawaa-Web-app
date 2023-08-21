export interface SendedOrder {
  id: number;
  orderDate: Date;
  status: string;
  supplierName: string;
  totalPrice: number;
}

export interface MedicineInSendedOrder {
  imageUrl: string | null;
  name: string;
  price: number;
  quantity: number;
}

export interface SupplierInSendedOrder {
  name: string;
  location: string;
  email: string;
  phoneNumber: string;
}
export interface SendedOrderDetails {
  id: number;
  medicines: MedicineInSendedOrder[];
  supplier: SupplierInSendedOrder;
}
