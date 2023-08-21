export interface Medicine {
  category: string;
  id: number;
  imageUrl?: string;
  name: string;
  price: number;
  quantity: number;
  supplier: string;
}

export interface MedicineDistribution {
  id: number;
  inventoryName: string;
  inventoryOwner: string;
  medicine: string;
  quantity: number;
}


