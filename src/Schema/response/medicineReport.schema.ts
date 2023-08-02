import { medicines } from "./medicine.schema";

export interface MedicineReportSchema {
  id: string;
  from: ReportFrom;
  reason: string;
  reportDate: Date;
  medicineId: string;
}

export interface ReportFrom {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export const ReportsData: Array<MedicineReportSchema> = [
  {
    id: "ID123120",
    reportDate: new Date(2021, 2, 12),
    from: {
      id: "01",
      name: "صيدلية القاسم",
      email: "alkasem@gmail.com",
      address: "دمشق ميدان، المجتهد جانب جامع الحسن",
      phone: "1111111",
    },
    medicineId: medicines[0].medicineId,
    reason:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a congue metus. Maecenas fermentum neque non pretium tristique. Ut at dui felis. Vivamus vitae tempor risus, a maximus erat. Integer eget porttitor odio. Cras cursus neque sem, eget feugiat eros aliquet tempus. Quisque sollicitudin, lectus et imperdiet viverra, ligula tortor varius nunc, et tincidunt ipsum orci et justo. Sed laoreet consequat ex. Ut a elit congue, venenatis eros a, vestibulum sem. Integer et porttitor lacus, in porta sem. Fusce convallis interdum turpis.",
  },
  {
    id: "ID123121",
    reportDate: new Date(2022, 4, 5),
    from: {
      id: "01",
      name: "صيدلية القاسم",
      email: "alkasem@gmail.com",
      address: "دمشق ميدان، المجتهد جانب جامع الحسن",
      phone: "1111111",
    },
    medicineId: medicines[1].medicineId,
    reason:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a congue metus. Maecenas fermentum neque non pretium tristique. Ut at dui felis. Vivamus vitae tempor risus, a maximus erat. Integer eget porttitor odio. Cras cursus neque sem, eget feugiat eros aliquet tempus. Quisque sollicitudin, lectus et imperdiet viverra, ligula tortor varius nunc, et tincidunt ipsum orci et justo. Sed laoreet consequat ex. Ut a elit congue, venenatis eros a, vestibulum sem. Integer et porttitor lacus, in porta sem. Fusce convallis interdum turpis.",
  },
];

export const data = Array.from({ length: 45 }, (_, index) => {
  const randomSelection = ReportsData[Math.floor(Math.random() * 2)];
  return randomSelection;
});

export const findReport: (id: string) => MedicineReportSchema = (
  id: string
) => {
  const index = ReportsData.findIndex((row) => row.id === id);
  return ReportsData[index];
};
