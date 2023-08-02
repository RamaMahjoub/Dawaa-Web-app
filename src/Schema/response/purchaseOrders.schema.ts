import { MedicineSchema, MedicinesData } from "./medicine.schema";

export interface PurchaseOrdersSchema {
  id: string;
  requestDate: Date;
  from: OrdersFrom;
  paymment: Array<Payment>;
  state: string;
  medicines: Array<MedicineOrder>;
}

export interface MedicineOrder {
  medicine: MedicineSchema;
  quantity: number;
}
export interface OrdersFrom {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface Payment {
  date: Date;
  amount: number;
}

export const PurchaseOrdersData: Array<PurchaseOrdersSchema> = [
  {
    id: "ID123120",
    requestDate: new Date(2021, 2, 12),
    from: {
      id: "01",
      name: "صيدلية القاسم",
      email: "alkasem@gmail.com",
      address: "دمشق ميدان، المجتهد جانب جامع الحسن",
      phone: "1111111",
    },
    state: "تم التوصيل",
    paymment: [
      {
        date: new Date(2021, 2, 12),
        amount: 1500,
      },
      {
        date: new Date(2021, 2, 14),
        amount: 2500,
      },
    ],
    medicines: [
      { medicine: MedicinesData[0], quantity: 5 },
      { medicine: MedicinesData[1], quantity: 2 },
    ],
  },
  {
    id: "ID123121",
    requestDate: new Date(2022, 4, 12),
    from: {
      id: "01",
      name: "صيدلية المنصور",
      email: "almansour@gmail.com",
      address: "دمشق ميدان، أبو حبل جانب جامع الأنصاري",
      phone: "2222222",
    },
    state: "مُلغى",
    paymment: [
      {
        date: new Date(2021, 4, 12),
        amount: 4725,
      },
      {
        date: new Date(2021, 4, 14),
        amount: 4725,
      },
      {
        date: new Date(2021, 5, 12),
        amount: 4725,
      },
      {
        date: new Date(2021, 5, 14),
        amount: 4725,
      },
    ],
    medicines: [
      { medicine: MedicinesData[0], quantity: 5 },
      { medicine: MedicinesData[2], quantity: 2 },
    ],
  },
];

export const data = Array.from({ length: 115 }, (_, index) => {
    const randomSelection =
    PurchaseOrdersData[Math.floor(Math.random() * 2)];
    return randomSelection;
})


export const findOrder: (id: string) => PurchaseOrdersSchema = (id: string) => {
    const index = PurchaseOrdersData.findIndex((row) => row.id === id);
    return PurchaseOrdersData[index];
  };
  