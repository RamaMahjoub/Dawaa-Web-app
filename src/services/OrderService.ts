import { TableSchema } from "../Schema/tables/SendedOrders";
import { protectedAxios } from "./axios";

const createOrder = (body: any) =>
  protectedAxios.post<any>("/order/warehouse", body);

const findSendedOrders = (page: string, limit: string) =>
  protectedAxios.get<TableSchema[]>(
    `/order/warehouse?limit=${limit}&page=${page}`
  );

const findSendedOrderDetails = (id: string) =>
  protectedAxios.get<TableSchema[]>(`/order/warehouse/${id}`);

//TODO
const findReceivedOrders = (page: string, limit: string) =>
  protectedAxios.get<TableSchema[]>(
    `/order/warehouse?limit=${limit}&page=${page}`
  );

const findReceivedOrderDetails = (id: string) =>
  protectedAxios.get<TableSchema[]>(`/order/warehouse/${id}`);

const orderOverview = (id: string) =>
  protectedAxios.get<any>(`/order/warehouse/${id}`);

const acceptOrder = (id: string) =>
  protectedAxios.patch<any>(`/order/warehouse/${id}`);

const rejectOrder = (id: string) =>
  protectedAxios.patch<any>(`/order/warehouse/${id}`);

const deliverOrder = (id: string) =>
  protectedAxios.patch<any>(`/order/warehouse/${id}`);

const OrderService = {
  createOrder,
  findSendedOrders,
  findSendedOrderDetails,
  findReceivedOrders,
  findReceivedOrderDetails,
  orderOverview,
  acceptOrder,
  rejectOrder,
  deliverOrder,
};

export default OrderService;
