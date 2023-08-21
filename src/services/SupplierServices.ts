import { protectedAxios } from "./axios";

const getAllSuppliers = (name?: string) => {
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
  const baseURL = `/warehouse/get-suppliers`;
  const finalURL = `${baseURL}?${queryString}`;
  return protectedAxios.get<any>(finalURL);
};

const getSupplierDetails = (id: string) => {
  return protectedAxios.get<any>(`/warehouse/get-suppliers/${id}`);
};

const findMedicine = (id: string) => {
  return protectedAxios.get<any>(`/medicine/warehouse/supplier/medicine/${id}`);
};

const supplierEvaluation = (id: string, body: any) => {
  return protectedAxios.post<any>(
    `/supplier/warehouse/rate-supplier/${id}`,
    body
  );
};

const getSupplierMedicines = (
  id: string,
  page: string,
  limit: string,
  category?: string,
  name?: string
) => {
  const queryParams: { [key: string]: string } = {};

  if (category) {
    queryParams.category = category;
  }

  if (name) {
    queryParams.name = name;
  }
  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    )
    .join("&");
  const baseURL = `/medicine/warehouse/supplier/${id}?limit=${limit}&page=${page}`;
  const finalURL = `${baseURL}&${queryString}`;
  return protectedAxios.get<any>(finalURL);
};

const SupplierService = {
  getAllSuppliers,
  getSupplierDetails,
  findMedicine,
  getSupplierMedicines,
  supplierEvaluation,
};

export default SupplierService;
