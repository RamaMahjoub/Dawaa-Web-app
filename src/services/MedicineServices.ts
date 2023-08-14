import { ReturnMedicines } from "../Schema/request/returnMedicines";
import { SubRequest } from "../Schema/request/storeInInventory";
import { protectedAxios } from "./axios";

const findWarehouseOnlyMedicines = (page: string, limit: string) => {
  return protectedAxios.get<any>(
    `/medicine/warehouse/all?limit=${limit}&page=${page}`
  );
};
const findAllMedicines = (page: string, limit: string) => {
  return protectedAxios.get<any>(
    `/medicine/warehouse?limit=${limit}&page=${page}`
  );
};

const storeInInventory = (body: SubRequest[]) => {
  return protectedAxios.patch<any>(
    `/medicine/warehouse/transfer-to-inventory`,
    body
  );
};

const returnMedicines = (body: ReturnMedicines) => {
  return protectedAxios.post<any>(`/returnOrder/warehouse`, body);
};

const findAllSendedReturnMedicines = (page: string, limit: string) => {
  return protectedAxios.get<any>(
    `/returnOrder/warehouse?limit=${limit}&page=${page}`
  );
};

const MedicineService = {
  findWarehouseOnlyMedicines,
  findAllMedicines,
  storeInInventory,
  findAllSendedReturnMedicines,
  returnMedicines,
};

export default MedicineService;
