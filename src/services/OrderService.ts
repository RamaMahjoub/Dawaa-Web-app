import {
  ReceivedTableSchema,
  TableSchema,
} from "../Schema/tables/SendedOrders";
import { protectedAxios } from "./axios";

const createOrder = (body: any) =>
  protectedAxios.post<any>("/order/warehouse", body);

const findSendedOrders = (page: string, limit: string) =>
  protectedAxios.get<TableSchema[]>(
    `/order/warehouse?limit=${limit}&page=${page}`
  );

const findSendedOrderDetails = (id: string) =>
  protectedAxios.get<TableSchema[]>(`/order/warehouse/${id}`);

const findReceivedOrders = (page: string, limit: string) =>
  protectedAxios.get<ReceivedTableSchema[]>(
    `/order/warehouse/pharmacies?limit=${limit}&page=${page}`
  );

const findReceivedOrderDetails = (id: string) =>
  protectedAxios.get<ReceivedTableSchema[]>(
    `/order/warehouse/pharmacies/${id}`
  );

const findReceivedReturnOrders = (page: string, limit: string) =>
  protectedAxios.get<any>(
    `/report-medicine/warehouse/pharmacy?limit=${limit}&page=${page}`
  );
const acceptReturnOrder = (id: string) =>
  protectedAxios.patch<any>(`/report-medicine/warehouse/accept-pharmacy/${id}`);

const rejectReturnOrder = (id: string) =>
  protectedAxios.patch<any>(`/report-medicine/warehouse/reject-pharmacy/${id}`);

const orderOverview = (id: string) =>
  protectedAxios.get<any>(`/order/warehouse/distribution/${id}`);

const acceptOrder = (id: string) =>
  protectedAxios.patch<any>(`/order/warehouse/accept/${id}`);

const rejectOrder = (id: string) =>
  protectedAxios.patch<any>(`/order/warehouse/${id}`);

const deliverOrder = (id: string) =>
  protectedAxios.patch<any>(`/order/warehouse/deliver/${id}`);

const OrderService = {
  createOrder,
  findSendedOrders,
  findSendedOrderDetails,
  findReceivedReturnOrders,
  acceptReturnOrder,
  rejectReturnOrder,
  findReceivedOrders,
  findReceivedOrderDetails,
  orderOverview,
  acceptOrder,
  rejectOrder,
  deliverOrder,
};

export default OrderService;
