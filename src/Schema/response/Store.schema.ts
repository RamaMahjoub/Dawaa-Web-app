export interface OStoreSchema {
  id: string;
  name: string;
  owner: string;
  location: string;
  phoneNumber: string;
}

export interface StoreSchema {
  id: string;
  name: string;
  owner: string;
  address: string;
  phone: string;
}

export const storesData: Array<StoreSchema> = [
  {
    id: "01",
    name: "مخزن الميدان",
    owner: "محمد المجذوب",
    address: "دمشق ميدان، أبو حبل",
    phone: "11111111",
  },
  {
    id: "02",
    name: "مخزن الزاهرة",
    owner: "علاء عواد",
    address: "دمشق زاهرة جديدة، جانب المركز الثقافي",
    phone: "22222222",
  },
  {
    id: "03",
    name: "مخزن باب توما",
    owner: "حسن جليلاتي",
    address: "دمشق باب توما، جانب مأكولات الشام",
    phone: "33333333",
  },
];

export function createData(
  id: string,
  name: string,
  owner: string,
  address: string,
  phone: string
): StoreSchema {
  return {
    id,
    name,
    owner,
    address,
    phone,
  };
}

export const rows = Array.from({ length: 15 }, (_, index) => {
  const randomSelection =
    storesData[Math.floor(Math.random() * storesData.length)];

  const data: StoreSchema = createData(
    String(index + 1),
    randomSelection.name,
    randomSelection.owner,
    randomSelection.address,
    randomSelection.phone
  );
  return {
    id: data.id,
    name: data.name,
    owner: data.owner,
    address: data.address,
    phone: data.phone,
  };
});

export const findStore: (id: string) => StoreSchema = (id: string) => {
  const index = rows.findIndex((row) => row.id === id);
  return rows[index];
};
