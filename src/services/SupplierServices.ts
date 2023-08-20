import { protectedAxios } from "./axios";

const getAllSuppliers = () => {
  return protectedAxios.get<any>("/warehouse/get-suppliers");
};

const getSupplierDetails = (id: string) => {
  return protectedAxios.get<any>(`/warehouse/get-suppliers/${id}`);
};

const findMedicine = (id: string) => {
  return protectedAxios.get<any>(`/medicine/warehouse/supplier/medicine/${id}`);
};

const getSupplierMedicines = (
  id: string,
  page: string,
  limit: string,
  category?: string
) => {
  let url;
  category
    ? (url = protectedAxios.get<any>(
        `/medicine/warehouse/supplier/${id}?limit=${limit}&page=${page}&category=${category}`
      ))
    : (url = protectedAxios.get<any>(
        `/medicine/warehouse/supplier/${id}?limit=${limit}&page=${page}`
      ));
  return url;
};

const SupplierService = {
  getAllSuppliers,
  getSupplierDetails,
  findMedicine,
  getSupplierMedicines,
};

export default SupplierService;
