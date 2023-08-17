import { ReactNode } from "react";

export interface TableSchema {
  id: string;
  orderDate: string;
  supplierName: string;
  status: ReactNode;
  totalPrice: string;
}

export interface ReceivedTableSchema {
  id: string;
  date: string;
  pharmacy: string;
  status: ReactNode;
  totalPrice: string;
}
