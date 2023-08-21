import { Batch } from "./Batch";

export interface WarehouseMedicine {
  batches: Batch[];
  id: number;
  medicineCategory: string;
  medicineSupplier: string;
  name: string;
  imageUrl?: string;
}
