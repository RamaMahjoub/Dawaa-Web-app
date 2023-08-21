import { BatchRequest } from "./Batch";

export interface TransferBetweenInventories {
  from: number;
  to: number;
  batches: BatchRequest[];
}
