export interface MedicineInSupplierSchema {
  id: string;
  medicineId: string;
  supplierId: string;
}

export const suppliersMedicinesData: Array<MedicineInSupplierSchema> = [];

for (let i = 1; i <= 150; i++) {
  const medicineId = String(Math.floor(Math.random() * 4) + 1);
  const item = {
    id: String(i),
    medicineId,
    supplierId: String(Math.floor(Math.random() * 100) + 1),
  };
  suppliersMedicinesData.push(item);
}
