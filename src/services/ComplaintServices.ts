import {
  PharmacyComplaint,
  SupplierComplaint,
} from "../Schema/Requests/Complaint";
import { protectedAxios } from "./axios";

const supplierComplaint = (body: SupplierComplaint) => {
  return protectedAxios.post<any>("/complaint/warehouse/supplier", body);
};
const pharmacyComplaint = (body: PharmacyComplaint) => {
  return protectedAxios.post<any>("/complaint/warehouse/pharmacy", body);
};
const ComplaintService = {
  supplierComplaint,
  pharmacyComplaint,
};

export default ComplaintService;
