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

const MedicineService = {
  findWarehouseOnlyMedicines,
  findAllMedicines,
  storeInInventory,
};

export default MedicineService;
