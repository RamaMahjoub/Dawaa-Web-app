import { ReactNode } from "react";

export interface SendedReturnOrders {
  id: string;
  returnOrderDate: string;
  supplierName: string;
  status: ReactNode;
  totalPrice: string;
}
