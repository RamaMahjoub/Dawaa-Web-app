import { MedicineSchema, MedicinesData } from "./medicine.schema";

export interface ExpressOrdersSchema {
  id: string;
  requestDate: Date;
  from: OrdersFrom;
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

export const ExpressOrdersData: Array<ExpressOrdersSchema> = [
  {
    id: "ID123120",
    requestDate: new Date(new Date().getTime() - 5000),
    from: {
      id: "01",
      name: "صيدلية القاسم",
      email: "alkasem@gmail.com",
      address: "دمشق ميدان، المجتهد جانب جامع الحسن",
      phone: "1111111",
    },
    medicines: [
      { medicine: MedicinesData[0], quantity: 5 },
      { medicine: MedicinesData[1], quantity: 2 },
    ],
  },
  {
    id: "ID123121",
    requestDate: new Date(new Date().getTime() - 5000),
    from: {
      id: "01",
      name: "صيدلية المنصور",
      email: "almansour@gmail.com",
      address: "دمشق ميدان، أبو حبل جانب جامع الأنصاري",
      phone: "2222222",
    },
    medicines: [
      { medicine: MedicinesData[0], quantity: 5 },
      { medicine: MedicinesData[1], quantity: 5 },
      { medicine: MedicinesData[2], quantity: 2 },
      { medicine: MedicinesData[3], quantity: 2 },
    ],
  },
];

export const data = Array.from({ length: 5 }, (_, index) => {
  const randomSelection = ExpressOrdersData[Math.floor(Math.random() * 2)];
  return randomSelection;
});

export const findOrder: (id: string) => ExpressOrdersSchema = (id: string) => {
  const index = ExpressOrdersData.findIndex((row) => row.id === id);
  return ExpressOrdersData[index];
};
