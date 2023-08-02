import { MedicineSchema, MedicinesData } from "./medicine.schema";

export interface OutgoingOrdersSchema {
  id: string;
  requestDate: Date;
  to: OrdersTo;
  paymment: Array<Payment>;
  state: string;
  medicines: Array<MedicineOrder>;
}

export interface MedicineOrder {
  medicine: MedicineSchema;
  quantity: number;
}
export interface OrdersTo {
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

export const OutgoingOrdersData: Array<OutgoingOrdersSchema> = [
  {
    id: "ID123120",
    requestDate: new Date(2021, 2, 12),
    to: {
      id: "01",
      name: "شركة الأمان للصناعات الدوائية",
      email: "alaman@gmail.com",
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
    to: {
      id: "01",
      name: "شركة يونيفارما لصناعة الأدوية",
      email: "younifarma@gmail.com",
      address: "دمشق ميدان، أبو حبل جانب جامع الأنصاري",
      phone: "2222222",
    },
    state: "مُعلق",
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

export const data = Array.from({ length: 115 }, () => {
    const randomSelection =
    OutgoingOrdersData[Math.floor(Math.random() * 2)];
    return randomSelection;
})


export const findOrder: (id: string) => OutgoingOrdersSchema = (id: string) => {
    const index = OutgoingOrdersData.findIndex((row) => row.id === id);
    return OutgoingOrdersData[index];
  };
  