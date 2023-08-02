import { medicines } from "./medicine.schema";

export interface StoreReportSchema {
  id: string;
  medicineId: string;
  storeId: string;
  reportDate: Date;
  reason: string;
}

export const ReportsData: Array<StoreReportSchema> = [
  {
    id: "ID123120",
    reportDate: new Date(2021, 2, 12),
    storeId: String(Math.floor(Math.random() * 15) + 1),
    medicineId: medicines[0].medicineId,
    reason:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a congue metus. Maecenas fermentum neque non pretium tristique. Ut at dui felis. Vivamus vitae tempor risus, a maximus erat. Integer eget porttitor odio. Cras cursus neque sem, eget feugiat eros aliquet tempus. Quisque sollicitudin, lectus et imperdiet viverra, ligula tortor varius nunc, et tincidunt ipsum orci et justo. Sed laoreet consequat ex. Ut a elit congue, venenatis eros a, vestibulum sem. Integer et porttitor lacus, in porta sem. Fusce convallis interdum turpis.",
  },
  {
    id: "ID123121",
    reportDate: new Date(2022, 4, 5),
    storeId: String(Math.floor(Math.random() * 15) + 1),
    medicineId: medicines[1].medicineId,
    reason:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a congue metus. Maecenas fermentum neque non pretium tristique. Ut at dui felis. Vivamus vitae tempor risus, a maximus erat. Integer eget porttitor odio. Cras cursus neque sem, eget feugiat eros aliquet tempus. Quisque sollicitudin, lectus et imperdiet viverra, ligula tortor varius nunc, et tincidunt ipsum orci et justo. Sed laoreet consequat ex. Ut a elit congue, venenatis eros a, vestibulum sem. Integer et porttitor lacus, in porta sem. Fusce convallis interdum turpis.",
  },
];

export const data = Array.from({ length: 45 }, (_, index) => {
  const randomSelection = ReportsData[Math.floor(Math.random() * 2)];
  return randomSelection;
});
