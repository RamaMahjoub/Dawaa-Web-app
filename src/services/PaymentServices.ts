import { AddPayment } from "../Schema/Requests/AddPayment";
import { protectedAxios } from "./axios";

const findAllSuppliersPayments = (page: string, limit: string) => {
  return protectedAxios.get<any>(`/payment?limit=${limit}&page=${page}`);
};

const findAllPharmaciesPayments = (page: string, limit: string) => {
  return protectedAxios.get<any>(`/payment?limit=${limit}&page=${page}`);
};

const addPayment = (id: string, body: AddPayment) => {
  return protectedAxios.post<any>(`/payment/${id}`, body);
};

const getMyPayments = (id: string, page: string, limit: string) => {
  return protectedAxios.get<any>(
    `/payment/me/${id}?limit=${limit}&page=${page}`
  );
};

const getUserPayments = (id: string, page: string, limit: string) => {
  return protectedAxios.get<any>(
    `/payment/user/${id}?limit=${limit}&page=${page}`
  );
};
const PaymentService = {
  findAllSuppliersPayments,
  findAllPharmaciesPayments,
  addPayment,
  getMyPayments,
  getUserPayments,
};

export default PaymentService;
