import { Batch } from "./Batch";

export interface InventoryMedicine {
  id: number;
  name: string;
  imageUrl: string | null;
  batches: Batch[];
}
