import { RegisterStoreSchema } from "../Schema/request/registerStore.schema";
import { protectedAxios } from "./axios";

const registerStore = (body: RegisterStoreSchema) => {
  return protectedAxios.post<any>("/auth/inventory-register", body);
};

const getAllStores = () => {
  return protectedAxios.get<any>("/warehouse/inventories");
};

const StoreService = {
  registerStore,
  getAllStores,
};

export default StoreService;
