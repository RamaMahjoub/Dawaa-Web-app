import { BatchRequest } from "./Batch";

export interface ReturnRequest {
  returnReason: string;
  batches: BatchRequest[];
}
