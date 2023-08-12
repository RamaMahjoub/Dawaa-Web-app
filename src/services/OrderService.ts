import { TableSchema } from "../Schema/tables/SendedOrders";
import { protectedAxios } from "./axios";

const createOrder = (body: any) => {
  return protectedAxios.post<any>("/order/warehouse", body);
};

const findSendedOrders = (page: string, limit: string) => {
  return protectedAxios.get<TableSchema[]>(
    `/order/warehouse?limit=${limit}&page=${page}`
  );
};

const findSendedOrderDetails = (id: string) => {
  return protectedAxios.get<TableSchema[]>(`/order/warehouse/${id}`);
};

const OrderService = {
  createOrder,
  findSendedOrders,
  findSendedOrderDetails,
};

export default OrderService;
