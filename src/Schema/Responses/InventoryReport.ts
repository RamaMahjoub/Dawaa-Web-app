export interface InventoryReport {
  id: number;
  reportDate: Date;
  batchId: number;
  medicineName: string;
  inventoryName: string;
  reason: string;
}
