import { RegisterStoreSchema } from "../Schema/request/registerStore.schema";
import { protectedAxios } from "./axios";

const registerStore = (body: RegisterStoreSchema) => {
  return protectedAxios.post<any>("/auth/inventory-register", body);
};

const getAllStores = (name?: string) => {
  const queryParams: { [key: string]: string } = {};
  if (name) {
    queryParams.name = name;
  }
  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    )
    .join("&");
  const baseURL = `/warehouse/inventories`;
  const finalURL = `${baseURL}?${queryString}`;
  console.log("final", finalURL);
  return protectedAxios.get<any>(finalURL);
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
