const Amoxicillin = require("./../../assets/medicines/Amoxicillin.jpg");
const Paracetamol = require("./../../assets/medicines/Paracetamol.jpg");
const Atorvastatin = require("./../../assets/medicines/Atorvastatin.jpg");
const Albuterol = require("./../../assets/medicines/Albuterol.jpg");

export interface MedicineSchema {
  medicineId: string;
  name: string;
  category: string;
  supplier: string;
  batchId: Array<number>;
  purchasingPrice: number;
  sellingPrice: number;
  photo: string;
}

export const MedicinesData: Array<MedicineSchema> = [
  {
    medicineId: "1",
    name: "Amoxicillin",
    category: "Analgesic",
    supplier: "محجوب للصناعات الدوائية",
    batchId: [112, 101],
    purchasingPrice: 500,
    sellingPrice: 1500,
    photo: Amoxicillin,
  },
  {
    medicineId: "2",
    name: "Paracetamol",
    category: "Antibiotic",
    supplier: "جليلاتي للصناعات الدوائية",
    batchId: [5, 122, 12],
    purchasingPrice: 1500,
    sellingPrice: 2500,
    photo: Paracetamol,
  },
  {
    medicineId: "3",
    name: "Atorvastatin",
    category: "Statins",
    supplier: "مهايني للصناعات الدوائية",
    batchId: [3, 10, 75],
    purchasingPrice: 700,
    sellingPrice: 5700,
    photo: Atorvastatin,
  },
  {
    medicineId: "4",
    name: "Albuterol Sulfate",
    category: "Bronchodilator",
    supplier: "عواد للصناعات الدوائية",
    batchId: [1, 14],
    purchasingPrice: 890,
    sellingPrice: 9000,
    photo: Albuterol,
  },
];

export function createData(
  medicineId: string,
  name: string,
  category: string,
  supplier: string,
  batchId: Array<number>,
  purchasingPrice: number,
  sellingPrice: number,
  photo: string
): MedicineSchema {
  return {
    medicineId,
    name,
    category,
    supplier,
    batchId,
    purchasingPrice,
    sellingPrice,
    photo,
  };
}

export const medicines = Array.from({ length: 150 }, (_, index) => {
  const randomSelection =
    MedicinesData[Math.floor(Math.random() * MedicinesData.length)];

  const data: MedicineSchema = createData(
    String(index + 1),
    randomSelection.name,
    randomSelection.category,
    randomSelection.supplier,
    randomSelection.batchId,
    randomSelection.purchasingPrice,
    randomSelection.sellingPrice,
    randomSelection.photo
  );
  return {
    medicineId: data.medicineId,
    name: data.name,
    category: data.category,
    supplier: data.supplier,
    batchId: data.batchId,
    purchasingPrice: data.purchasingPrice,
    sellingPrice: data.sellingPrice,
    photo: data.photo,
  };
});

export const findMedicine: (id: string) => MedicineSchema = (id: string) => {
  const index = MedicinesData.findIndex(
    (medicine) => medicine.medicineId === id
  );
  return MedicinesData[index];
};
