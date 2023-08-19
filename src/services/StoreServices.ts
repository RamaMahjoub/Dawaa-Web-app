import { RegisterStoreSchema } from "../Schema/request/registerStore.schema";
import { protectedAxios } from "./axios";

const registerStore = (body: RegisterStoreSchema) => {
  return protectedAxios.post<any>("/auth/inventory-register", body);
};

const getAllStores = () => {
  return protectedAxios.get<any>("/warehouse/inventories");
};

const getMedicinesInStore = (page: string, limit: string, id: string) => {
  return protectedAxios.get<any>(
    `/medicine/warehouse/inventory/${id}?limit=${limit}&page=${page}`
  );
};

const transferBetweenInventories = (body: any) => {
  return protectedAxios.patch<any>(
    "/medicine/warehouse/transfer-between-inventories",
    body
  );
};
const StoreService = {
  registerStore,
  getAllStores,
  getMedicinesInStore,
  transferBetweenInventories,
};

export default StoreService;
