export interface ReturnMedicines {
  returnReason: string;
  batches: Array<{ batchId: number; quantity: number }>;
}
