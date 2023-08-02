export interface SupplierSchema {
  id: string;
  name: string;
  address: string;
  phone: string;
  evaluation: number;
}

export const suppliersData: Array<SupplierSchema> = [
  {
    id: "01",
    name: "شركة الأمان للصناعات الدوائية",
    address: "دمشق ميدان، أبو حبل",
    phone: "11111111",
    evaluation: 1.5,
  },
  {
    id: "02",
    name: "شركة الإحسان للأدوية",
    address: "دمشق زاهرة جديدة، جانب المركز الثقافي",
    phone: "22222222",
    evaluation: 2.75,
  },
  {
    id: "03",
    name: "شركة يونيفارما لصناعة الأدوية",
    address: "دمشق باب توما، جانب مأكولات الشام",
    phone: "33333333",
    evaluation: 4.5,
  },
];

export function createData(
  id: string,
  name: string,
  address: string,
  phone: string,
  evaluation: number
): SupplierSchema {
  return {
    id,
    name,
    address,
    phone,
    evaluation,
  };
}

export const suppliers = Array.from({ length: 100 }, (_, index) => {
  const randomSelection =
    suppliersData[Math.floor(Math.random() * suppliersData.length)];

  const data: SupplierSchema = createData(
    index < 10 ? `0${String(index + 1)}` : String(index + 1),
    randomSelection.name,
    randomSelection.address,
    randomSelection.phone,
    randomSelection.evaluation
  );
  return {
    id: data.id,
    name: data.name,
    address: data.address,
    phone: data.phone,
    evaluation: data.evaluation,
  };
});

export const findSupplier: (id: string) => SupplierSchema = (id: string) => {
  const index = suppliers.findIndex((supplier) => supplier.id === id);
  return suppliers[index];
};
