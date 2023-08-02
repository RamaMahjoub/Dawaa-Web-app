import { ReactNode } from "react";
import TextBadge, { BadgeStatus } from "../../components/Badge/TextBadge";

export interface MedicineInStoreSchema {
  id: string;
  medicineId: string;
  storeId: string;
  quantity: number;
  state: ReactNode;
}
export const storesMedicinesData: Array<MedicineInStoreSchema> = [];

for (let i = 1; i <= 50; i++) {
  const medicineId = String(Math.floor(Math.random() * 4) + 1);
  const item = {
    id: String(i),
    medicineId,
    quantity: 0,
    state: <TextBadge title="نافذ" status={BadgeStatus.DANGER} />,
    storeId: String(Math.floor(Math.random() * 15) + 1),
  };
  storesMedicinesData.push(item);
}
for (let i = 51; i <= 100; i++) {
  const medicineId = String(Math.floor(Math.random() * 4) + 1);
  const item = {
    id: String(i),
    medicineId,
    quantity: i,
    state: <TextBadge title="على وشك النفاذ" status={BadgeStatus.WARNING} />,
    storeId: String(Math.floor(Math.random() * 15) + 1),
  };
  storesMedicinesData.push(item);
}
for (let i = 101; i <= 150; i++) {
  const medicineId = String(Math.floor(Math.random() * 4) + 1);
  const item = {
    id: String(i),
    medicineId,
    quantity: i,
    state: <TextBadge title="متوافر" status={BadgeStatus.SUCCESS} />,
    storeId: String(Math.floor(Math.random() * 15) + 1),
  };
  storesMedicinesData.push(item);
}

export const findMedicineInStores: (id: string) => Array<MedicineInStoreSchema> = (
  id: string
) => {
  const index = storesMedicinesData.filter(
    (medicine) => medicine.medicineId === id
  );
  return index;
};
