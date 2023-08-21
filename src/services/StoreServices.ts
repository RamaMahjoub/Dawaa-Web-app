import { RegisterInventory } from "../Schema/Requests/RegisterInventory";
import { TransferBetweenInventories } from "../Schema/Requests/TransferBetweenInventories";
import { protectedAxios } from "./axios";

const registerInventory = (body: RegisterInventory) => {
  return protectedAxios.post<any>("/auth/inventory-register", body);
};

const getAllInventories = (name?: string) => {
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
  return protectedAxios.get<any>(finalURL);
};

const getMedicinesInInventory = (page: string, limit: string, id: string) => {
  return protectedAxios.get<any>(
    `/medicine/warehouse/inventory/${id}?limit=${limit}&page=${page}`
  );
};

const transferBetweenInventories = (body: TransferBetweenInventories) => {
  return protectedAxios.patch<any>(
    "/medicine/warehouse/transfer-between-inventories",
    body
  );
};
const StoreService = {
  registerInventory,
  getAllInventories,
  getMedicinesInInventory,
  transferBetweenInventories,
};

export default StoreService;
