
export interface TableSchema {
  id: string;
  orderDate: string;
  supplierName: string;
  status: JSX.Element;
  totalPrice: string;
}

export interface ReceivedTableSchema {
  id: string;
  date: string;
  pharmacy: string;
  status: JSX.Element;
  totalPrice: string;
}
