import { MedicineSchema, MedicinesData } from "./medicine.schema";

interface ReturnOrdersSchema {
  id: string;
  requestDate: Date;
  from: OrdersFrom;
  medicines: Array<MedicineOrder>;
  reason: string;
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

export const ReturnOrdersData: Array<ReturnOrdersSchema> = [
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
    reason:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a congue metus. Maecenas fermentum neque non pretium tristique. Ut at dui felis. Vivamus vitae tempor risus, a maximus erat. Integer eget porttitor odio. Cras cursus neque sem, eget feugiat eros aliquet tempus. Quisque sollicitudin, lectus et imperdiet viverra, ligula tortor varius nunc, et tincidunt ipsum orci et justo. Sed laoreet consequat ex. Ut a elit congue, venenatis eros a, vestibulum sem. Integer et porttitor lacus, in porta sem. Fusce convallis interdum turpis.",
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
    reason:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a congue metus. Maecenas fermentum neque non pretium tristique. Ut at dui felis. Vivamus vitae tempor risus, a maximus erat. Integer eget porttitor odio. Cras cursus neque sem, eget feugiat eros aliquet tempus. Quisque sollicitudin, lectus et imperdiet viverra, ligula tortor varius nunc, et tincidunt ipsum orci et justo. Sed laoreet consequat ex. Ut a elit congue, venenatis eros a, vestibulum sem. Integer et porttitor lacus, in porta sem. Fusce convallis interdum turpis.",
  },
];

export const data = Array.from({ length: 5 }, (_, index) => {
  const randomSelection = ReturnOrdersData[Math.floor(Math.random() * 2)];
  return randomSelection;
});

export const findOrder: (id: string) => ReturnOrdersSchema = (id: string) => {
  const index = ReturnOrdersData.findIndex((row) => row.id === id);
  return ReturnOrdersData[index];
};
